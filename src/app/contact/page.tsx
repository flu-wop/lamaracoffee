import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | Lamara Coffee & Kitchen",
  description:
    "Visit Lamara Coffee & Kitchen at 1300 North Broad Street, New Orleans — next door to Esplanade Studios in Mid City.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sage-deep">Contact</p>
          <h1 className="font-display max-w-xl text-4xl font-light leading-tight text-ink sm:text-5xl">
            Come say <em className="text-terracotta-deep">hello</em>.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Lamara Coffee & Kitchen location map"
                src="https://www.google.com/maps?q=1300+North+Broad+Street,+New+Orleans,+LA+70119&output=embed"
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Address</h3>
                <p className="mt-2 text-base text-ink">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </p>
                <p className="mt-2 text-sm text-ink-soft">Next door to {SITE.neighbor}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Hours</h3>
                <ul className="mt-2 space-y-1">
                  {SITE.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-6 text-sm text-ink">
                      <span>{h.days}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Phone</h3>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="mt-2 block text-base text-ink transition-colors hover:text-terracotta-deep"
                >
                  {SITE.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Instagram</h3>
                <a
                  href="https://www.instagram.com/lamaracoffeeandkitchen/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm text-ink transition-colors hover:text-terracotta-deep"
                >
                  {SITE.instagram}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-sage-deep">Owners</h3>
                <p className="mt-2 text-sm text-ink">Diane Heying &amp; Misha Kachkachishvili</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">Send us a message</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
              Catering, private events, or just want to say hi — drop a note and
              we&apos;ll follow up.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
