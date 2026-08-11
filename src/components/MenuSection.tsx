import MenuCard from "@/components/MenuCard";
import type { MenuCategory } from "@/lib/menu-data";

export default function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-24 py-14">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
          {category.title}
        </h2>
        {category.blurb && (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{category.blurb}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
