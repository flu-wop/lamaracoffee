import { Resend } from "resend";
import type { PricedLine } from "@/lib/pricing";

let _resend: Resend | null = null;
function getResend() {
  if (_resend) return _resend;
  _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function linesHtml(lines: PricedLine[]) {
  return lines
    .map((l) => {
      const mods = l.modifiers.length
        ? `<div style="font-size:12px;color:#777;margin-top:2px;">${l.modifiers
            .map((m) => m.label + (m.priceCents ? ` (+${money(m.priceCents)})` : ""))
            .join(", ")}</div>`
        : "";
      const notes = l.notes
        ? `<div style="font-size:12px;color:#777;font-style:italic;margin-top:2px;">"${l.notes}"</div>`
        : "";
      return `<div style="margin-bottom:10px;">
        <strong>${l.name}</strong> — ${l.size} × ${l.qty} — ${money(l.unitPriceCents * l.qty)}
        ${mods}${notes}
      </div>`;
    })
    .join("");
}

export async function sendOrderEmails(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupSlot: string;
  lines: PricedLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const ownerEmail = process.env.RESEND_TO_EMAIL;

  const summaryHtml = `
    <h2>Order ${order.orderNumber}</h2>
    <p><strong>Pickup:</strong> ${order.pickupSlot}</p>
    ${linesHtml(order.lines)}
    <hr />
    <p>Subtotal: ${money(order.subtotalCents)}<br/>
    Tax: ${money(order.taxCents)}<br/>
    <strong>Total: ${money(order.totalCents)}</strong></p>
  `;

  const sends: Promise<unknown>[] = [];

  if (ownerEmail) {
    sends.push(
      resend.emails.send({
        from,
        to: ownerEmail,
        subject: `New order ${order.orderNumber} — pickup ${order.pickupSlot}`,
        html: `<p><strong>${order.customerName}</strong> · ${order.customerPhone}</p>${summaryHtml}`,
      })
    );
  }

  if (order.customerEmail) {
    sends.push(
      resend.emails.send({
        from,
        to: order.customerEmail,
        subject: `Lamara Coffee & Kitchen — order ${order.orderNumber} confirmed`,
        html: `<p>Thanks, ${order.customerName}! Your order is confirmed.</p>${summaryHtml}<p>1300 North Broad Street, New Orleans — next to Esplanade Studios.</p>`,
      })
    );
  }

  // Fire-and-forget individually so one failure doesn't block the other,
  // and neither ever blocks the payment response the customer sees.
  const results = await Promise.allSettled(sends);
  return results;
}
