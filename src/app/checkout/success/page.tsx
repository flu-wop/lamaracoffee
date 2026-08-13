"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/cart-context";
import { SITE } from "@/lib/site-data";

type Order = {
  orderNumber: string;
  pickup: string;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
  placedAt: string;
};

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
          Place a demo order from the food or drink menu to see the confirmation
          screen.
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
        <p className="text-xs uppercase tracking-[0.3em] text-sage-deep">
          Order Confirmed — Demo
        </p>
        <h1 className="font-display mt-3 text-4xl font-light text-ink sm:text-5xl">
          Thanks — order #{order.orderNumber.split("-")[1]}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          This screen previews what a real confirmation would look like. No payment
          was processed and no order was actually sent to the kitchen.
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
            <p className="text-sm text-ink">{order.pickup}</p>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {order.lines.map((line) => (
            <li key={line.key} className="flex gap-3 py-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
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

        <div className="mt-2 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium text-ink">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
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
