# Lamara Coffee & Kitchen

Rebuild of lamaracoffeeandkitchen.com — organic, plant-forward café in Mid City
New Orleans, owned by Diane Heying and Misha Kachkachishvili, next door to
Esplanade Studios.

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Cormorant Garamond +
DM Sans, light cream/sage/terracotta palette (not the dark/gold system used on
other sites in this ecosystem).

## Pages

- `/` — home
- `/food-menu`, `/drink-menu` — full real menu, wired to product photos in
  `public/images/menu`
- `/about`, `/contact`

## Demo ordering flow

This build includes a **mock** cart + checkout to preview what Tier 2
(custom on-site ordering) would feel like:

- Add-to-cart on menu cards, cart drawer with quantities (`src/lib/cart-context.tsx`)
- `/checkout` — order summary, fake card fields, pickup time picker
- `/checkout/success` — fake confirmation screen with a generated order number

**No real payment processing, no live inventory, nothing is sent anywhere.**
Swapping in Stripe Checkout + a real backend is exactly what Tier 2 would
wire up.

## Development

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — Vercel auto-deploys.
