"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const PICKUP_SLOTS = ["As soon as possible (~15 min)", "In 30 minutes", "In 1 hour"];

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();

  const [pickup, setPickup] = useState(PICKUP_SLOTS[0]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [placing, setPlacing] = useState(false);

  const tax = useMemo(() => subtotal * 0.09, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handlePlaceOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lines.length === 0 || placing) return;
    setPlacing(true);

    const orderNumber = `LC-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = {
      orderNumber,
      pickup,
      lines,
      subtotal,
      tax,
      total,
      placedAt: new Date().toISOString(),
    };

    window.setTimeout(() => {
      window.sessionStorage.setItem("lamara_last_order", JSON.stringify(order));
      clear();
      router.push("/checkout/success");
    }, 1400);
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
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-sage-deep">
        Demo Checkout
      </p>
      <h1 className="font-display text-4xl font-light text-ink sm:text-5xl">
        Almost there.
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
        This is a preview of on-site ordering — no card is charged and no real order
        is sent to the kitchen.
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
                  placeholder="(504) 555-0134"
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
                Demo — not a real charge
              </span>
            </div>
            <div className="mt-4 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Card number
                </label>
                <input
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                    Expiry
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
                    CVC
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
                  />
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={placing}
            className="w-full rounded-full bg-terracotta py-4 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-70 sm:w-auto sm:px-10"
          >
            {placing ? "Placing order…" : `Place Order — $${total.toFixed(2)}`}
          </button>
          <p className="text-xs text-ink-soft">
            Preview only — this button does not charge a card or notify the kitchen.
          </p>
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
              <span>Tax (9%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-medium text-ink">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
