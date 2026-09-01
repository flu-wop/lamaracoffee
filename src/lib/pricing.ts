import { allCategories, type MenuItem } from "@/lib/menu-data";
import { getModifierGroups } from "@/lib/modifiers";

export type CartLineInput = {
  itemId: string;
  sizeLabel: string;
  modifierChoiceIds?: { groupId: string; choiceId: string }[];
  notes?: string;
  qty: number;
};

export type PricedLine = {
  itemId: string;
  name: string;
  size: string;
  unitPriceCents: number;
  qty: number;
  modifiers: { groupName: string; label: string; priceCents: number }[];
  notes?: string;
};

export class PricingError extends Error {}

function findItem(itemId: string): MenuItem {
  for (const cat of allCategories) {
    const found = cat.items.find((i) => i.id === itemId);
    if (found) return found;
  }
  throw new PricingError(`Unknown item: ${itemId}`);
}

const toCents = (n: number) => Math.round(n * 100);

// Recomputes every line entirely from server-side menu/modifier data.
// The client sends only ids + choices — never a price. This is the
// single source of truth for what a customer is actually charged.
export function priceCart(inputLines: CartLineInput[]): {
  lines: PricedLine[];
  subtotalCents: number;
} {
  if (!Array.isArray(inputLines) || inputLines.length === 0) {
    throw new PricingError("Cart is empty");
  }
  if (inputLines.length > 50) {
    throw new PricingError("Too many line items");
  }

  const lines: PricedLine[] = [];

  for (const input of inputLines) {
    const qty = Math.floor(Number(input.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > 20) {
      throw new PricingError("Invalid quantity");
    }

    const item = findItem(input.itemId);
    if (item.availability === "out") {
      throw new PricingError(`${item.name} is currently sold out`);
    }

    const size = item.sizes.find((s) => s.label === input.sizeLabel);
    if (!size) throw new PricingError(`Invalid size for ${item.name}`);

    const groups = getModifierGroups(item.modifierGroupIds);
    const requested = input.modifierChoiceIds ?? [];

    // Validate every requested choice actually belongs to this item.
    for (const r of requested) {
      const group = groups.find((g) => g.id === r.groupId);
      if (!group) throw new PricingError(`Invalid modifier group for ${item.name}`);
      const choice = group.choices.find((c) => c.id === r.choiceId);
      if (!choice) throw new PricingError(`Invalid modifier choice for ${item.name}`);
      if (choice.soldOut) throw new PricingError(`${choice.label} is sold out`);
    }

    // Validate required groups are satisfied.
    for (const g of groups) {
      if (!g.required) continue;
      const count = requested.filter((r) => r.groupId === g.id).length;
      if (count < 1) throw new PricingError(`${g.name} is required for ${item.name}`);
      if (!g.multiSelect && count > 1) {
        throw new PricingError(`${g.name} only allows one choice for ${item.name}`);
      }
    }

    let unitPriceCents = toCents(size.price);
    const modifiers: PricedLine["modifiers"] = [];
    for (const r of requested) {
      const group = groups.find((g) => g.id === r.groupId)!;
      const choice = group.choices.find((c) => c.id === r.choiceId)!;
      const priceCents = toCents(choice.price ?? 0);
      unitPriceCents += priceCents;
      modifiers.push({ groupName: group.name, label: choice.label, priceCents });
    }

    const notes = typeof input.notes === "string" ? input.notes.slice(0, 500) : undefined;

    lines.push({
      itemId: item.id,
      name: item.name,
      size: size.label,
      unitPriceCents,
      qty,
      modifiers,
      notes,
    });
  }

  const subtotalCents = lines.reduce((sum, l) => sum + l.unitPriceCents * l.qty, 0);
  return { lines, subtotalCents };
}

// Orleans Parish combined sales tax rate (5% LA state + 5% parish local,
// per the Jan 2025 state-rate increase — verified current for 2026).
// Update here if it ever changes — this is the single place tax is
// calculated, not duplicated client-side.
export const ORLEANS_PARISH_TAX_RATE = 0.10;

export const PICKUP_SLOTS = ["As soon as possible (~15 min)", "In 30 minutes", "In 1 hour"];

export function calcTaxCents(subtotalCents: number): number {
  return Math.round(subtotalCents * ORLEANS_PARISH_TAX_RATE);
}
