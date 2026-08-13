import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | Lamara Coffee & Kitchen",
  description:
    "Lamara Coffee & Kitchen is owned by Diane Heying and Misha Kachkachishvili, an organic plant-based cafe in Mid City New Orleans next to Esplanade Studios.",
};

const VALUES = [
  {
    title: "Organic First",
    body: "We source organic produce, dairy alternatives, and pantry staples whenever we can get them — not as a marketing line, but because it's what we'd feed our own families.",
  },
  {
    title: "Plant-Forward",
    body: "Most of the menu is plant-based by default, with thoughtful additions like pasture-raised eggs for anyone who wants them. Nothing here feels like a compromise.",
  },
  {
    title: "Made In-House",
    body: "Cashew milk, sauces, dressings, and baked goods are made from scratch in our kitchen, every morning, before the doors open.",
  },
  {
    title: "Rooted in Mid City",
    body: "We're a neighborhood spot first — for the block, for the musicians next door, for the regulars who know their order before they reach the counter.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Image
            src="/images/brand/ig-post2.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/75 to-ink/20" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-deep">
            About Lamara
          </p>
          <h1 className="font-display max-w-2xl text-balance text-4xl font-light leading-tight text-ink sm:text-5xl">
            Two owners who believe good food should be honest about what&apos;s in it.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <p className="divider-sprout text-xs uppercase tracking-[0.3em] text-sage-deep">
          Diane &amp; Misha
        </p>
        <h2 className="font-display mt-4 text-3xl font-light leading-tight text-ink sm:text-4xl">
          Lamara Coffee &amp; Kitchen is owned and run by{" "}
          <span className="text-terracotta-deep">Diane Heying</span> and{" "}
          <span className="text-terracotta-deep">Misha Kachkachishvili</span>.
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
          <p>
            What started as a small counter on North Broad Street has grown into one
            of Mid City&apos;s go-to spots for organic, plant-based food — without ever
            losing the feeling of a place two people built by hand. Diane and Misha
            still treat the menu the way they did on day one: real ingredients, made
            fresh, nothing hiding behind a label.
          </p>
          <p>
            That means house-made cashew milk instead of a syrup base, organic
            produce sourced with intention, and a kitchen that would rather 86 a dish
            than serve it any other way than it&apos;s supposed to taste.
          </p>
          <p>
            Lamara sits right next door to <strong className="text-ink">{SITE.neighbor}</strong>,
            and over the years the two businesses have grown into neighbors in every
            sense — engineers and artists grabbing a matcha before a session, a bowl
            between takes, coffee running back and forth through the block. It&apos;s
            given Lamara a rhythm that&apos;s equal parts café and creative pit stop.
          </p>
        </div>
      </section>

      <section className="bg-sage-pale/60 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display max-w-md text-3xl font-light leading-tight text-ink sm:text-4xl">
            What we stand behind
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-paper p-7">
                <h3 className="font-display text-2xl text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/brand/ig-post1.webp"
              alt="Plates of organic food at Lamara"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/brand/ig-post3.webp"
              alt="House-made ice cream sandwiches"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/brand/ig-post2.webp"
              alt="Fresh vegetable dish at Lamara"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 text-center sm:px-8">
        <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
          Come taste it for yourself.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/menu"
            className="rounded-full bg-ink px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
          >
            View Menu
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-sage-deep px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
          >
            Visit Us
          </Link>
        </div>
      </section>
    </div>
  );
}
