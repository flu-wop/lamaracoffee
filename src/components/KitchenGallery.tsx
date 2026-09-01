"use client";

import { useState } from "react";
import Image from "next/image";
import ItemModal from "@/components/ItemModal";
import { findItem, type MenuItem } from "@/lib/menu-data";

const GALLERY_ITEM_IDS = [
  "acai-bowl",
  "lamara-burger",
  "matcha-latte",
  "berry-longevity",
  "grain-free-waffle",
  "labrea-burrito",
  "oaxaca-moca",
  "blat",
  "cortado",
  "spring-roll-bowl-custom",
  "omega-chia-parfait",
  "california-burrito",
];

export default function KitchenGallery() {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const items = GALLERY_ITEM_IDS.map((id) => findItem(id)).filter(
    (i): i is MenuItem => Boolean(i)
  );

  return (
    <>
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 lg:grid-cols-8">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-cream-deep"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 16vw, 23vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sage-deep">
                <SproutIcon />
              </div>
            )}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <span className="p-2 text-left text-[0.65rem] uppercase tracking-wide text-cream">
                {item.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      {activeItem && <ItemModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </>
  );
}

function SproutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 22V13" />
      <path d="M12 13C12 8 8 6 4 6c0 4.5 3 7 8 7Z" />
      <path d="M12 13c0-5 4-7 8-7 0 4.5-3 7-8 7Z" />
    </svg>
  );
}
