"use client";

import { useEffect, useState } from "react";

export default function MenuJumpNav({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among those currently visible.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <div className="sticky top-[73px] z-30 -mx-5 border-b border-line bg-cream/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-2 text-center">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`text-xs uppercase tracking-[0.16em] transition-colors ${
                isActive
                  ? "text-terracotta-deep underline decoration-1 underline-offset-4"
                  : "text-ink-soft hover:text-terracotta-deep"
              }`}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
