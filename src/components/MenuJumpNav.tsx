export default function MenuJumpNav({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  if (items.length < 2) return null;
  return (
    <div className="sticky top-[73px] z-30 -mx-5 border-b border-line bg-cream/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-xs uppercase tracking-[0.16em] text-ink-soft hover:text-terracotta-deep"
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
