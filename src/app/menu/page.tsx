import type { Metadata } from "next";
import MenuSection from "@/components/MenuSection";
import MenuJumpNav from "@/components/MenuJumpNav";
import { foodCategories, drinkCategories } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu | Lamara Coffee & Kitchen",
  description:
    "Organic, plant-forward food and drinks from Lamara Coffee & Kitchen in Mid City New Orleans — burritos, burgers, waffles, tostadas, coffee, and smoothies. Oat milk default.",
};

const allCategories = [...foodCategories, ...drinkCategories];

export default function MenuPage() {
  return (
    <div>
      <section className="border-b border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-deep">
            Menu
          </p>
          <h1 className="font-display max-w-xl text-4xl font-light leading-tight text-ink sm:text-5xl">
            Made-to-order, plant-forward, always <em className="text-terracotta-deep">organic</em>.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
            Espresso is Ruby Roaster&apos;s Creamery blend. Almond, macadamia, or whole
            milk available on request at no extra charge.
          </p>
        </div>
      </section>

      <MenuJumpNav items={allCategories.map((c) => ({ id: c.id, title: c.title }))} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {allCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
