"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/menu-data";
import { getModifierGroups } from "@/lib/modifiers";

export default function ItemModal({
  item,
  initialSizeIndex = 0,
  onClose,
}: {
  item: MenuItem;
  initialSizeIndex?: number;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [sizeIndex, setSizeIndex] = useState(initialSizeIndex);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  // selections[groupId] = Set of choiceIds
  const [selections, setSelections] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    for (const g of getModifierGroups(item.modifierGroupIds)) {
      const defaults = g.choices.filter((c) => c.defaultSelected).map((c) => c.id);
      init[g.id] = new Set(defaults);
    }
    return init;
  });

  const groups = getModifierGroups(item.modifierGroupIds);
  const size = item.sizes[sizeIndex];
  const soldOut = item.availability === "out";

  const modifierTotal = useMemo(() => {
    let sum = 0;
    for (const g of groups) {
      const picked = selections[g.id];
      if (!picked) continue;
      for (const c of g.choices) {
        if (picked.has(c.id)) sum += c.price ?? 0;
      }
    }
    return sum;
  }, [groups, selections]);

  const unitPrice = size.price + modifierTotal;
  const total = unitPrice * qty;

  const toggleChoice = (groupId: string, choiceId: string, multiSelect: boolean) => {
    setSelections((prev) => {
      const next = { ...prev };
      const current = new Set(next[groupId] ?? []);
      if (multiSelect) {
        if (current.has(choiceId)) {
          current.delete(choiceId);
        } else {
          current.add(choiceId);
        }
      } else {
        current.clear();
        current.add(choiceId);
      }
      next[groupId] = current;
      return next;
    });
  };

  const missingRequired = groups
    .filter((g) => g.required)
    .filter((g) => !selections[g.id] || selections[g.id].size === 0);

  const handleAdd = () => {
    if (soldOut || missingRequired.length > 0) return;
    const modifiers = groups.flatMap((g) => {
      const picked = selections[g.id];
      if (!picked) return [];
      return g.choices
        .filter((c) => picked.has(c.id))
        .map((c) => ({ groupId: g.id, groupName: g.name, choiceId: c.id, label: c.label, price: c.price ?? 0 }));
    });
    addItem(
      {
        itemId: item.id,
        name: item.name,
        size: size.label,
        price: unitPrice,
        image: item.image,
        modifiers: modifiers.length ? modifiers : undefined,
        notes: notes.trim() || undefined,
      },
      qty
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div onClick={onClose} className="absolute inset-0 bg-ink/50" />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-paper sm:rounded-3xl">
        <div className="relative h-[min(12rem,28vh)] w-full shrink-0 bg-cream-deep sm:h-[min(14rem,28vh)]">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sage-deep">
              <SproutIcon />
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-paper/90 p-1.5 text-ink shadow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h2 className="font-display text-2xl text-ink">{item.name}</h2>
          <p className="mt-1 text-sm text-terracotta-deep">
            {item.sizes.length > 1
              ? `$${item.sizes[0].price.toFixed(2)} – $${item.sizes[item.sizes.length - 1].price.toFixed(2)}`
              : `$${size.price.toFixed(2)}`}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>

          {item.sizes.length > 1 && (
            <div className="mt-5">
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-ink-soft">Size</p>
              <div className="flex flex-wrap gap-2">
                {item.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSizeIndex(i)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      i === sizeIndex
                        ? "border-sage-deep bg-sage-deep text-cream"
                        : "border-line text-ink-soft hover:border-sage-deep"
                    }`}
                  >
                    {s.label} · ${s.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {groups.map((g) => (
            <div key={g.id} className="mt-6 border-t border-line pt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-ink">{g.name}</p>
                <span
                  className={`text-[0.65rem] uppercase tracking-wide ${
                    g.required ? "text-terracotta-deep" : "text-ink-soft"
                  }`}
                >
                  {g.required ? "Required" : "Optional"}
                </span>
              </div>
              <div className="space-y-2">
                {g.choices.map((c) => {
                  const checked = selections[g.id]?.has(c.id) ?? false;
                  return (
                    <label
                      key={c.id}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
                        c.soldOut
                          ? "cursor-not-allowed border-line text-ink-soft/50 line-through"
                          : checked
                          ? "border-sage-deep bg-sage-pale/40"
                          : "border-line hover:border-sage-deep"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type={g.multiSelect ? "checkbox" : "radio"}
                          name={g.id}
                          disabled={c.soldOut}
                          checked={checked}
                          onChange={() => toggleChoice(g.id, c.id, g.multiSelect)}
                          className="accent-sage-deep"
                        />
                        <span className="text-ink">
                          {c.label}
                          {c.soldOut ? " (Sold out)" : ""}
                        </span>
                      </span>
                      {!!c.price && (
                        <span className="whitespace-nowrap text-xs text-ink-soft">
                          +${c.price.toFixed(2)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-6 border-t border-line pt-5">
            <p className="mb-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
              Special instructions
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else the kitchen or barista should know?"
              rows={2}
              className="w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-sage-deep focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-line px-6 py-4">
          <div className="flex items-center gap-2 rounded-full border border-line px-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-8 w-8 rounded-full text-base text-ink-soft hover:bg-cream-deep"
            >
              −
            </button>
            <span className="w-5 text-center text-sm text-ink">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-8 w-8 rounded-full text-base text-ink-soft hover:bg-cream-deep"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={soldOut || missingRequired.length > 0}
            className={`flex-1 rounded-full py-3 text-xs uppercase tracking-[0.14em] transition-colors ${
              soldOut || missingRequired.length > 0
                ? "cursor-not-allowed bg-cream-deep text-ink-soft"
                : "bg-ink text-cream hover:bg-terracotta-deep"
            }`}
          >
            {soldOut
              ? "Sold Out"
              : missingRequired.length > 0
              ? `Select ${missingRequired[0].name}`
              : `Add to order · $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function SproutIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 22V13" />
      <path d="M12 13C12 8 8 6 4 6c0 4.5 3 7 8 7Z" />
      <path d="M12 13c0-5 4-7 8-7 0 4.5-3 7-8 7Z" />
    </svg>
  );
}
