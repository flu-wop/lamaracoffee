import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Lamara Coffee & Kitchen",
  description: "How Lamara Coffee & Kitchen handles information collected through online ordering.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-sage-deep">Privacy</p>
      <h1 className="font-display text-4xl font-light text-ink sm:text-5xl">
        What we collect, and why.
      </h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display mb-2 text-xl text-ink">What&apos;s collected</h2>
          <p>
            When you place an order online, we collect your name, phone number, and — if you
            provide one — email address, along with your order details and pickup preference.
            Payment card details are entered directly into a secure form hosted by Square and
            never pass through or touch our servers.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-xl text-ink">Why</h2>
          <p>
            This information is used solely to prepare your order, contact you if there&apos;s an
            issue with it, and send you an order confirmation.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-xl text-ink">Where it lives</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Order and payment processing — Square</li>
            <li>Order records — our database (Turso)</li>
            <li>Confirmation emails — Resend</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-2 text-xl text-ink">Retention</h2>
          <p>
            Order records are kept for our own bookkeeping and customer-service purposes until
            you request deletion.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-2 text-xl text-ink">Questions or deletion requests</h2>
          <p>
            Email{" "}
            <a href="mailto:eatwell@lamaracoffeeandkitchen.com" className="text-terracotta-deep">
              eatwell@lamaracoffeeandkitchen.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
