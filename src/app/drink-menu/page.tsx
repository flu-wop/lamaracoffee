import type { Metadata } from "next";
import MenuSection from "@/components/MenuSection";
import MenuJumpNav from "@/components/MenuJumpNav";
import { drinkCategories } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Drink Menu | Lamara Coffee & Kitchen",
  description:
    "Coffee bar, organic smoothies, and grab-and-go drinks from Lamara Coffee & Kitchen in Mid City New Orleans. Oat milk default.",
};

export default function DrinkMenuPage() {
  return (
    <div>
      <section className="border-b border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-deep">
            Drink Menu
          </p>
          <h1 className="font-display max-w-xl text-4xl font-light leading-tight text-ink sm:text-5xl">
            Coffee, smoothies &amp; bowls — <em className="text-terracotta-deep">oat milk</em> default.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
            Espresso is Ruby Roaster&apos;s Creamery blend. Almond, macadamia, or whole
            milk available on request at no extra charge.
          </p>
        </div>
      </section>

      <MenuJumpNav items={drinkCategories.map((c) => ({ id: c.id, title: c.title }))} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {drinkCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
