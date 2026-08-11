"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-sage-deep/40 bg-sage-pale/60 p-8 text-center">
        <p className="font-display text-2xl text-ink">Message sent</p>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks for reaching out — someone from Lamara will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
            Name
          </label>
          <input
            required
            type="text"
            className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
            Email
          </label>
          <input
            required
            type="email"
            className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-soft">
          Message
        </label>
        <textarea
          required
          rows={5}
          className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-sage-deep"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-7 py-3 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
