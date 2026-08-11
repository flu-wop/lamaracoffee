"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu-data";

export default function MenuCard({ item }: { item: MenuItem }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const size = item.sizes[sizeIndex];
  const soldOut = item.availability === "out";

  const handleAdd = () => {
    if (soldOut) return;
    addItem({
      itemId: item.id,
      name: item.name,
      size: size.label,
      price: size.price,
      image: item.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-paper p-4 sm:gap-5 sm:p-5">
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-ink sm:text-xl">
            {item.name}
          </h3>
          <span className="whitespace-nowrap pt-0.5 text-sm text-terracotta-deep">
            ${size.price.toFixed(2)}
          </span>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-sage-pale px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-sage-deep"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {item.sizes.length > 1 &&
            item.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSizeIndex(i)}
                className={`rounded-full border px-2.5 py-1 text-[0.7rem] transition-colors ${
                  i === sizeIndex
                    ? "border-sage-deep bg-sage-deep text-cream"
                    : "border-line text-ink-soft hover:border-sage-deep"
                }`}
              >
                {s.label}
              </button>
            ))}
          <button
            onClick={handleAdd}
            disabled={soldOut}
            className={`ml-auto rounded-full px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
              soldOut
                ? "cursor-not-allowed bg-cream-deep text-ink-soft"
                : added
                ? "bg-sage-deep text-cream"
                : "bg-ink text-cream hover:bg-terracotta-deep"
            }`}
          >
            {soldOut ? "Sold Out" : added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>

      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-deep sm:h-28 sm:w-28">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sage-deep">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M12 22V13" />
              <path d="M12 13C12 8 8 6 4 6c0 4.5 3 7 8 7Z" />
              <path d="M12 13c0-5 4-7 8-7 0 4.5-3 7-8 7Z" />
            </svg>
          </div>
        )}
        {item.availability && (
          <span
            className={`absolute inset-x-0 bottom-0 py-0.5 text-center text-[0.55rem] uppercase tracking-wide ${
              item.availability === "out" ? "bg-ink/85 text-cream" : "bg-terracotta text-cream"
            }`}
          >
            {item.availability === "out" ? "Sold Out" : "Low Stock"}
          </span>
        )}
      </div>
    </div>
  );
}
