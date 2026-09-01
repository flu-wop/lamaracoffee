"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const PICKUP_SLOTS = ["As soon as possible (~15 min)", "In 30 minutes", "In 1 hour"];
const TAX_RATE = 0.1; // Orleans Parish combined rate — server recomputes this; shown here for preview only

// Minimal shape of the bits of the Square Web Payments SDK this page uses.
type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => Promise<void>;
};
type SquarePayments = {
  card: () => Promise<SquareCard>;
};
declare global {
  interface Window {
    Square?: { payments: (appId: string, locationId: string) => SquarePayments };
  }
}

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();

  const [pickup, setPickup] = useState(PICKUP_SLOTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const [sdkReady, setSdkReady] = useState(false);
  const cardRef = useRef<SquareCard | null>(null);

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // Load Square's hosted Web Payments SDK and mount the card field.
  // The card number/CVC never touch this site's server — Square's iframe
  // tokenizes it client-side, and only the resulting token is sent to us.
  const squareConfigured =
    !!process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID && !!process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  useEffect(() => {
    if (!squareConfigured) return;
    const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
    const env = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";

    const scriptSrc =
      env === "production" ? "https://web.squarecdn.com/v1/square.js" : "https://sandbox.web.squarecdn.com/v1/square.js";

    let cancelled = false;

    async function setup() {
      if (!window.Square) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = scriptSrc;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Failed to load Square payments script"));
          document.head.appendChild(s);
        });
      }
      if (cancelled || !window.Square) return;
      const payments = window.Square.payments(appId!, locationId!);
      const card = await payments.card();
      await card.attach("#square-card-container");
      if (cancelled) {
        await card.destroy();
        return;
      }
      cardRef.current = card;
      setSdkReady(true);
    }

    setup().catch((err) => {
      console.error(err);
      setError("Could not load the payment form. Please refresh and try again.");
    });

    return () => {
      cancelled = true;
      cardRef.current?.destroy().catch(() => {});
    };
  }, [squareConfigured]);

  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lines.length === 0 || placing || !cardRef.current) return;
    setError("");
    setPlacing(true);

    try {
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== "OK" || !tokenResult.token) {
        setError(tokenResult.errors?.[0]?.message || "Card could not be verified. Check the details and try again.");
        setPlacing(false);
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email || undefined,
          pickupSlot: pickup,
          sourceId: tokenResult.token,
          lines: lines.map((l) => ({
            itemId: l.itemId,
            sizeLabel: l.size,
            modifierChoiceIds: (l.modifiers ?? []).map((m) => ({ groupId: m.groupId, choiceId: m.choiceId })),
            notes: l.notes,
            qty: l.qty,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong placing your order.");
        setPlacing(false);
        return;
      }

      window.sessionStorage.setItem("lamara_last_order", JSON.stringify(data));
      clear();
      router.push("/checkout/success");
    } catch (err) {
      console.error(err);
      setError("Network error — please try again.");
      setPlacing(false);
    }
  };

  if (lines.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
        <p className="font-display text-3xl text-ink">Your cart is empty</p>
        <p className="mt-3 text-sm text-ink-soft">
          Add something from the menu before checking out.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-sage-deep">Checkout</p>
      <h1 className="font-display text-4xl font-light text-ink sm:text-5xl">Almost there.</h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
        Your card is processed securely by Square — this site never sees your card number.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handlePlaceOrder} className="space-y-10">
          <section>
            <h2 className="font-display text-2xl text-ink">Contact</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jamie Rivera"
                  className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(504) 555-0134"
                  className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Email (for your receipt)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jamie@email.com"
                  className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">Pickup time</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {PICKUP_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setPickup(slot)}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    pickup === slot
                      ? "border-sage-deep bg-sage-deep text-cream"
                      : "border-line text-ink-soft hover:border-sage-deep"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-soft">
              Pickup at {"1300 North Broad Street"} — next to Esplanade Studios.
            </p>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-ink">Payment</h2>
              <span className="rounded-full bg-sage-pale px-3 py-1 text-[0.65rem] uppercase tracking-wide text-sage-deep">
                Secured by Square
              </span>
            </div>
            <div className="mt-4">
              <div
                id="square-card-container"
                className="rounded-lg border border-line bg-paper px-4 py-3 min-h-[56px]"
              />
              {!sdkReady && !error && (
                <p className="mt-2 text-xs text-ink-soft">Loading secure payment form…</p>
              )}
            </div>
          </section>

          {error && (
            <p className="rounded-lg bg-terracotta/10 px-4 py-3 text-sm text-terracotta-deep">{error}</p>
          )}
          {!squareConfigured && (
            <p className="rounded-lg bg-terracotta/10 px-4 py-3 text-sm text-terracotta-deep">
              Payments are not configured yet — missing Square application/location ID.
            </p>
          )}

          <button
            type="submit"
            disabled={placing || !sdkReady}
            className="w-full rounded-full bg-terracotta py-4 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-70 sm:w-auto sm:px-10"
          >
            {placing ? "Placing order…" : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                  {line.image && (
                    <Image src={line.image} alt={line.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-ink">
                      {line.name} <span className="text-ink-soft">× {line.qty}</span>
                    </p>
                    <p className="text-xs text-ink-soft">{line.size}</p>
                    {line.modifiers && line.modifiers.length > 0 && (
                      <ul className="mt-0.5">
                        {line.modifiers.map((m, i) => (
                          <li key={i} className="text-xs text-ink-soft">
                            {m.label}
                            {m.price ? ` (+$${m.price.toFixed(2)})` : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                    {line.notes && (
                      <p className="text-xs italic text-ink-soft">&ldquo;{line.notes}&rdquo;</p>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-sm text-ink">
                    ${(line.price * line.qty).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-medium text-ink">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="pt-1 text-[0.7rem] text-ink-soft">
              Final total is calculated and charged server-side — this is a preview.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
