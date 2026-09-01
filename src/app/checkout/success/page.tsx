"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site-data";

type OrderLine = {
  itemId: string;
  name: string;
  size: string;
  unitPriceCents: number;
  qty: number;
  modifiers: { groupName: string; label: string; priceCents: number }[];
  notes?: string;
};

type Order = {
  orderNumber: string;
  pickupSlot: string;
  lines: OrderLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  placedAt: string;
};

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("lamara_last_order");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from sessionStorage after mount, SSR has no access to it
    setOrder(raw ? JSON.parse(raw) : null);
  }, []);

  if (order === undefined) return null;

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
        <p className="font-display text-3xl text-ink">No recent order found</p>
        <p className="mt-3 text-sm text-ink-soft">
          Place an order from the menu to see the confirmation screen.
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
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage-deep text-cream">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-sage-deep">Order Confirmed</p>
        <h1 className="font-display mt-3 text-4xl font-light text-ink sm:text-5xl">
          Thanks — order #{order.orderNumber.split("-")[1]}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          We&apos;ve got it — pickup: {order.pickupSlot}.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Order Number</p>
            <p className="font-display text-xl text-ink">{order.orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">Pickup</p>
            <p className="text-sm text-ink">{order.pickupSlot}</p>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {order.lines.map((line, i) => (
            <li key={i} className="flex gap-3 py-4">
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-ink">
                    {line.name} <span className="text-ink-soft">× {line.qty}</span>
                  </p>
                  <p className="text-xs text-ink-soft">{line.size}</p>
                  {line.modifiers.length > 0 && (
                    <ul className="mt-0.5">
                      {line.modifiers.map((m, j) => (
                        <li key={j} className="text-xs text-ink-soft">
                          {m.label}
                          {m.priceCents ? ` (+${money(m.priceCents)})` : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                  {line.notes && (
                    <p className="text-xs italic text-ink-soft">&ldquo;{line.notes}&rdquo;</p>
                  )}
                </div>
                <span className="whitespace-nowrap text-sm text-ink">
                  {money(line.unitPriceCents * line.qty)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-2 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{money(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Tax</span>
            <span>{money(order.taxCents)}</span>
          </div>
          <div className="flex justify-between text-base font-medium text-ink">
            <span>Total</span>
            <span>{money(order.totalCents)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-sage-pale/60 p-6 text-center">
        <p className="text-sm text-ink">
          Pick up at {SITE.address.line1}, next to {SITE.neighbor}.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
        >
          Back to Home
        </Link>
        <Link
          href="/menu"
          className="rounded-full border border-sage-deep px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
        >
          Order Again
        </Link>
      </div>
    </div>
  );
}
