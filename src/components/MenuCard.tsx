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
    <div className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-sage-pale text-sage-deep">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M12 22V13" />
              <path d="M12 13C12 8 8 6 4 6c0 4.5 3 7 8 7Z" />
              <path d="M12 13c0-5 4-7 8-7 0 4.5-3 7-8 7Z" />
            </svg>
            <span className="text-[0.65rem] uppercase tracking-[0.2em]">Seasonal Item</span>
          </div>
        )}
        {item.availability && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] ${
              item.availability === "out"
                ? "bg-ink/85 text-cream"
                : "bg-terracotta text-cream"
            }`}
          >
            {item.availability === "out" ? "Sold Out Today" : "Low Stock"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-ink">{item.name}</h3>
          <span className="whitespace-nowrap pt-1 text-sm text-terracotta-deep">
            ${size.price.toFixed(2)}
          </span>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-sage-pale px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-sage-deep"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>

        {item.sizes.length > 1 && (
          <div className="mt-4 flex gap-2">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSizeIndex(i)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  i === sizeIndex
                    ? "border-sage-deep bg-sage-deep text-cream"
                    : "border-line text-ink-soft hover:border-sage-deep"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={soldOut}
          className={`mt-4 w-full rounded-full py-2.5 text-xs uppercase tracking-[0.16em] transition-colors ${
            soldOut
              ? "cursor-not-allowed bg-cream-deep text-ink-soft"
              : added
              ? "bg-sage-deep text-cream"
              : "bg-ink text-cream hover:bg-terracotta-deep"
          }`}
        >
          {soldOut ? "Sold Out" : added ? "Added ✓" : "Add to Order"}
        </button>
      </div>
    </div>
  );
}
