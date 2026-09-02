"use client";

import { useEffect, useRef, useState } from "react";

export default function MenuJumpNav({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

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

  // Measure the bar's real rendered height (it wraps to 1-2 lines depending on
  // viewport width) so the spacer below can reserve exactly that much space.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setBarHeight(entries[0].contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (items.length < 2) return null;
  return (
    <>
      {/* Fixed, not sticky — avoids iOS WebKit jitter from two stacked sticky
          elements (this bar + the site Navbar above it). */}
      <div
        ref={barRef}
        className="fixed inset-x-0 top-[73px] z-30 border-b border-line bg-cream/98 px-5 py-3 sm:px-8"
      >
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
      {/* Spacer reserving the fixed bar's height in normal document flow */}
      <div style={{ height: barHeight || undefined }} aria-hidden />
    </>
  );
}
