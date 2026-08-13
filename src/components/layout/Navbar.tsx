"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { count, open } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setMobileOpen(false)}>
          <span className="font-display text-2xl tracking-[0.14em] text-ink">LAMARA</span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.35em] text-sage-deep">
            Coffee &amp; Kitchen
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-terracotta-deep" : "text-ink-soft hover:text-terracotta-deep"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-terracotta" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/menu"
            className="hidden rounded-full bg-sage-deep px-5 py-2 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:bg-sage sm:block"
          >
            View Menu
          </Link>
          <button
            aria-label="Open cart"
            onClick={open}
            className="relative rounded-full border border-line p-2.5 text-ink transition-colors hover:border-terracotta hover:text-terracotta-deep"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-[0.65rem] font-medium text-cream">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            className="p-2 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-line bg-cream px-5 py-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm uppercase tracking-[0.14em] text-ink-soft hover:bg-cream-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
