import Link from "next/link";
import { SITE } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl tracking-[0.14em] text-ink">LAMARA</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Organic, plant-forward coffee &amp; kitchen in the heart of Mid City New
            Orleans — proudly next door to {SITE.neighbor}.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-sage-deep">
            Grown slow. Served fresh. Rooted in the neighborhood.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.22em] text-ink-soft">Visit</h3>
          <p className="text-sm leading-relaxed text-ink">
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
          </p>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="mt-2 inline-block text-sm text-ink-soft transition-colors hover:text-terracotta-deep"
          >
            {SITE.phone}
          </a>
          <ul className="mt-4 space-y-1 text-sm text-ink-soft">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.22em] text-ink-soft">Explore</h3>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link href="/food-menu" className="hover:text-terracotta-deep">Food Menu</Link></li>
            <li><Link href="/drink-menu" className="hover:text-terracotta-deep">Drink Menu</Link></li>
            <li><Link href="/about" className="hover:text-terracotta-deep">About</Link></li>
            <li><Link href="/contact" className="hover:text-terracotta-deep">Contact</Link></li>
            <li>
              <a
                href="https://www.instagram.com/lamaracoffeeandkitchen/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-terracotta-deep"
              >
                {SITE.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-5 py-5 text-center text-xs text-ink-soft sm:px-8">
        © {new Date().getFullYear()} Lamara Coffee &amp; Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
