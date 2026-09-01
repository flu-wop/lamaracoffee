import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What's In Our Food & Drink | Lamara Coffee & Kitchen",
  description:
    "A closer look at what Lamara Coffee & Kitchen actually does — water filtration, packaging, ingredient sourcing, and kitchen practices — straight from the owners.",
};

const POINTS = [
  "We had our building's water tested before opening, and because of pollutants found in the city's water, installed a filtration system that removes chemicals and pathogens from every sink. Our ice machine, espresso, coffee, and drinking water all run through a 5-step reverse osmosis system.",
  "Air filters are changed every 30 days with the highest-rated MERV filter available, for clean circulating air while you're dining inside.",
  "LED lighting throughout the whole building.",
  "Takeout containers and cups are always compostable — not petroleum-based, so they break down cleanly. They cost about 3x standard packaging, but given our volume, it's worth it. No drinks in single-use plastic. Glass gets recycled with Glass Half Full, aluminum goes to neighborhood scrappers, and everything else — including packaging customers leave behind — gets composted.",
  "House-made milks are 3 ingredients, organic, no refined sugars or gums. Our oat milk is made with olive oil, not seed oil, made fresh daily and never chilled more than 48 hours — far less processed than what most cafés use.",
  "Breads and tortillas are organic (tortillas contain sunflower oil — there's currently no organic olive or avocado oil tortilla on the market).",
  "We cook only in extra virgin olive oil from Spain.",
  "Eggs are cooked in carbon steel, free of PFAS.",
  "Burgers and burritos are grilled on cast iron.",
  "Cut vegetables are washed through our filtration system and never held more than 3 days — often much less.",
  "Eggs are organic, pasture-raised, from Pete & Gerry's — not fed a high-omega-6 diet.",
  "Tofu is organic, sprouted, and high-protein.",
  "Everything on the menu is built around fiber (eggs aside) — even our house-made burger has added psyllium and flax.",
  "All dairy is grass-fed, organic, small-farm — and the smoothies that use dairy are fermented and/or probiotic.",
  "We never use palm oil.",
  "All house-made baked goods are gluten-free, in a celiac-safe kitchen.",
  "About 90% of our produce is organic — exceptions like avocados and bananas follow the Clean Fifteen / Dirty Dozen guidance.",
  "Our coffee isn't certified organic — it's grown by small Latin American farmers who can't afford certification, but it's shade-grown and natural-washed, including the decaf.",
  "Produce isn't sourced locally year-round — we've had trouble finding growers who can supply what we need, consistently, organically. Seasonally, we do get local items in.",
  "Only Celtic sea salt in our food.",
  "Every entrée is macro-balanced across carbs, protein, fat, and fiber, and built to be nutrient-dense.",
  "We don't fry anything.",
];

export default function FoodStandardsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-sage-deep">
        A Note From Diane
      </p>
      <h1 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
        So, exactly what&apos;s in my food + drink?
      </h1>
      <p className="mt-6 text-base leading-relaxed text-ink-soft">
        A friendly PSA about what&apos;s actually in our food and drinks. Social media
        has no shortage of opinions on what to eat and avoid — but how would you
        actually know what your favorite restaurant uses, or what they do to protect
        you? Since opening in 2019, we&apos;ve stayed committed to organic ingredients
        in their most natural form. That&apos;s just the start. Here&apos;s what sets us
        apart — you have every right to ask any place you support the same
        questions.
      </p>

      <ol className="mt-10 space-y-5">
        {POINTS.map((p, i) => (
          <li key={i} className="flex gap-4 text-sm leading-relaxed text-ink-soft">
            <span className="font-display shrink-0 text-lg text-terracotta-deep">
              {i + 1}.
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-base leading-relaxed text-ink-soft">
        Thanks for taking the time to read. If you ever have questions or feedback,
        we&apos;d love to hear it.
      </p>
      <p className="font-display mt-2 text-xl text-ink">— Lamara</p>

      <div className="mt-12 flex flex-wrap gap-4">
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
          Ask Us Anything
        </Link>
      </div>
    </div>
  );
}
