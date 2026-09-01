import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { initDb, getDb } from "@/lib/db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getSquareClient } from "@/lib/square";
import { priceCart, calcTaxCents, PICKUP_SLOTS, PricingError, type CartLineInput } from "@/lib/pricing";
import { sendOrderEmails } from "@/lib/email";

const NAME_MAX = 100;
const PHONE_MAX = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
  await initDb();

  const ok = await rateLimit(`checkout:${clientIp(req)}`, 10, 600); // 10 per 10 min
  if (!ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    pickupSlot?: string;
    lines?: CartLineInput[];
    sourceId?: string; // Square Web Payments SDK card token
  };
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body");
  }

  const customerName = String(body.customerName ?? "").trim().slice(0, NAME_MAX);
  const customerPhone = String(body.customerPhone ?? "").trim().slice(0, PHONE_MAX);
  const customerEmail = body.customerEmail ? String(body.customerEmail).trim().slice(0, 200) : undefined;
  const pickupSlot = String(body.pickupSlot ?? "");
  const sourceId = String(body.sourceId ?? "");

  if (!customerName) return badRequest("Name is required");
  if (!customerPhone) return badRequest("Phone is required");
  if (customerEmail && !EMAIL_RE.test(customerEmail)) return badRequest("Invalid email");
  if (!PICKUP_SLOTS.includes(pickupSlot)) return badRequest("Invalid pickup slot");
  if (!sourceId) return badRequest("Missing payment token");

  // ---- Server-side pricing. Never trust anything the client sent for money. ----
  let priced;
  try {
    priced = priceCart(body.lines ?? []);
  } catch (err) {
    if (err instanceof PricingError) return badRequest(err.message);
    throw err;
  }

  const { lines, subtotalCents } = priced;
  const taxCents = calcTaxCents(subtotalCents);
  const totalCents = subtotalCents + taxCents;

  const orderNumber = `LC-${Math.floor(1000 + Math.random() * 9000)}`;
  const locationId = process.env.SQUARE_LOCATION_ID!;
  const square = getSquareClient();

  // ---- Square Order (ad-hoc line items — not mapped to catalog IDs yet) ----
  let squareOrderId: string | undefined;
  try {
    const orderResp = await square.ordersApi.createOrder({
      idempotencyKey: randomUUID(),
      order: {
        locationId,
        referenceId: orderNumber,
        lineItems: lines.map((l) => ({
          name: l.modifiers.length
            ? `${l.name} (${l.size}) — ${l.modifiers.map((m) => m.label).join(", ")}`
            : `${l.name} (${l.size})`,
          quantity: String(l.qty),
          basePriceMoney: { amount: BigInt(l.unitPriceCents), currency: "USD" },
          note: l.notes,
        })),
        taxes: [
          {
            name: "Orleans Parish Sales Tax",
            percentage: "10",
            scope: "ORDER",
          },
        ],
        fulfillments: [
          {
            type: "PICKUP",
            pickupDetails: {
              recipient: { displayName: customerName, phoneNumber: customerPhone },
              scheduleType: "ASAP",
              note: `Pickup slot requested: ${pickupSlot}`,
            },
          },
        ],
      },
    });
    squareOrderId = orderResp.result.order?.id;
  } catch (err) {
    console.error("Square createOrder failed", err);
    return NextResponse.json({ error: "Could not create order. No payment was taken." }, { status: 502 });
  }

  // ---- Take payment, tied to the order just created ----
  let squarePaymentId: string | undefined;
  try {
    const paymentResp = await square.paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: { amount: BigInt(totalCents), currency: "USD" },
      locationId,
      orderId: squareOrderId,
      autocomplete: true,
    });
    squarePaymentId = paymentResp.result.payment?.id;
  } catch (err) {
    console.error("Square createPayment failed", err);
    return NextResponse.json(
      { error: "Payment was declined or failed. No charge was made." },
      { status: 402 }
    );
  }

  // ---- Persist. Payment already succeeded at this point — a DB failure
  // here must not be silently swallowed, since it's the only record
  // outside Square+Stripe-style dashboards. ----
  try {
    await getDb().execute({
      sql: `INSERT INTO orders
        (order_number, square_order_id, square_payment_id, customer_name, customer_phone,
         customer_email, pickup_slot, lines_json, subtotal_cents, tax_cents, total_cents, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid')`,
      args: [
        orderNumber,
        squareOrderId ?? null,
        squarePaymentId ?? null,
        customerName,
        customerPhone,
        customerEmail ?? null,
        pickupSlot,
        JSON.stringify(lines),
        subtotalCents,
        taxCents,
        totalCents,
      ],
    });
  } catch (err) {
    // Payment succeeded but we failed to record it — surface loudly.
    // The order still exists in Square (source of truth for fulfillment),
    // but this needs a human to notice, not just a log line nobody reads.
    console.error(
      `CRITICAL: payment ${squarePaymentId} succeeded but DB write failed for order ${orderNumber}`,
      err
    );
  }

  await sendOrderEmails({
    orderNumber,
    customerName,
    customerPhone,
    customerEmail,
    pickupSlot,
    lines,
    subtotalCents,
    taxCents,
    totalCents,
  });

  return NextResponse.json({
    orderNumber,
    pickupSlot,
    lines,
    subtotalCents,
    taxCents,
    totalCents,
    placedAt: new Date().toISOString(),
  });
}
