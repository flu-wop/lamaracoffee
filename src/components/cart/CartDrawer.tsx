"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { lines, isOpen, close, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl text-ink">Your Order</h2>
          <button
            aria-label="Close cart"
            onClick={close}
            className="rounded-full p-1.5 text-ink-soft hover:bg-cream-deep"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-display text-xl text-ink">Your cart is empty</p>
              <p className="max-w-xs text-sm text-ink-soft">
                Add something from the food or drink menu to see it here.
              </p>
              <Link
                href="/food-menu"
                onClick={close}
                className="mt-2 rounded-full bg-sage-deep px-5 py-2 text-xs uppercase tracking-[0.14em] text-cream"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                    {line.image ? (
                      <Image src={line.image} alt={line.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sage-deep">
                        <SproutIcon />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight text-ink">{line.name}</p>
                        <p className="text-xs uppercase tracking-wide text-ink-soft">{line.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(line.key)}
                        className="text-xs text-ink-soft hover:text-terracotta-deep"
                        aria-label={`Remove ${line.name}`}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-line px-1">
                        <button
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          className="h-6 w-6 rounded-full text-sm text-ink-soft hover:bg-cream-deep"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm text-ink">{line.qty}</span>
                        <button
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          className="h-6 w-6 rounded-full text-sm text-ink-soft hover:bg-cream-deep"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-ink">
                        ${(line.price * line.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm text-ink-soft">
              <span>Subtotal</span>
              <span className="text-base text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="block w-full rounded-full bg-terracotta py-3 text-center text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              Checkout
            </Link>
            <p className="mt-2 text-center text-xs text-ink-soft">
              Tax &amp; pickup time calculated at checkout — no account needed.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function SproutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 22V13" />
      <path d="M12 13C12 8 8 6 4 6c0 4.5 3 7 8 7Z" />
      <path d="M12 13c0-5 4-7 8-7 0 4.5-3 7-8 7Z" />
    </svg>
  );
}
