import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-data";
import KitchenGallery from "@/components/KitchenGallery";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/brand/ig-post1.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/70 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-cream/10" />
        </div>

        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-40 sm:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-sage-deep">
            Mid City · New Orleans
          </p>
          <div className="mb-5 flex items-center gap-2">
            <span className="flex text-terracotta-deep" aria-hidden>
              {"★★★★★"}
            </span>
            <span className="text-sm text-ink-soft">4.4 · 100+ reviews</span>
          </div>
          <h1 className="font-display max-w-3xl text-balance text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Organic food, brewed slow, grown <em className="text-terracotta-deep">honest</em>.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
            A plant-forward coffee &amp; kitchen built on real ingredients, right next
            door to {SITE.neighbor} — where the neighborhood eats before it creates.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
            >
              View Menu
            </Link>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            No account needed — order online, pick up in the door next to the studio.
          </p>
        </div>
      </section>

      {/* Hours + Location strip */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Hours</h3>
            <ul className="mt-2 space-y-1 text-ink">
              {SITE.hours.map((h) => (
                <li key={h.days} className="flex items-baseline justify-between gap-6 text-sm">
                  <span>{h.days}</span>
                  <span className="text-ink-soft">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Location</h3>
            <p className="mt-2 text-sm text-ink">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </p>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="mt-2 inline-block text-sm text-ink-soft transition-colors hover:text-sage-deep"
            >
              {SITE.phone}
            </a>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Next Door</h3>
            <p className="mt-2 text-sm text-ink">
              Esplanade Studios — grab breakfast before a session, or a smoothie after
              one.
            </p>
          </div>
        </div>
      </section>

      {/* Dietary positioning strip */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {SITE.dietary.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-widest text-sage-deep"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <p className="mb-4 divider-sprout text-xs uppercase tracking-[0.3em] text-sage-deep">
              Our Story
            </p>
            <h2 className="font-display max-w-md text-4xl font-light leading-tight text-ink sm:text-5xl">
              Two owners, one kitchen, and a belief that real food should feel like{" "}
              <em className="text-terracotta-deep">home</em>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Lamara Coffee &amp; Kitchen is owned and run by Diane Heying and Misha
              Kachkachishvili, built on the idea that Organic and plant-based doesn&apos;t
              mean giving anything up — just cooking it with more care. Every menu item
              starts from real, whole ingredients: house-made cashew milk, Organic
              produce, and bread and pastries made in-house.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              We sit right next to {SITE.neighbor} on North Broad, which makes us the
              unofficial kitchen for half of Mid City&apos;s working musicians — coffee
              before the session, a bowl after.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block text-sm uppercase tracking-[0.16em] text-terracotta-deep underline decoration-terracotta/40 underline-offset-4 hover:decoration-terracotta"
            >
              Meet Diane &amp; Misha →
            </Link>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-cream-deep">
            <Image
              src="/images/brand/latte-art.webp"
              alt="Barista handing off a latte with heart latte art at Lamara Coffee & Kitchen"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Curated gallery */}
      <section className="bg-sage-pale/60 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-deep">
                From the Kitchen
              </p>
              <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">
                A taste of the menu
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden shrink-0 text-sm uppercase tracking-[0.16em] text-terracotta-deep underline decoration-terracotta/40 underline-offset-4 hover:decoration-terracotta sm:block"
            >
              View Full Menu →
            </Link>
          </div>

          <KitchenGallery />
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sage-deep">
          Skip the line
        </p>
        <h2 className="font-display mx-auto max-w-2xl text-balance text-4xl font-light leading-tight text-ink sm:text-5xl">
          Order ahead, and it&apos;s ready when you <em className="text-terracotta-deep">walk in</em>.
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/menu"
            className="rounded-full bg-ink px-8 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
          >
            View Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
