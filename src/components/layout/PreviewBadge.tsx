export default function PreviewBadge() {
  return (
    <a
      href="https://in-flu-ential.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-line bg-cream/95 px-3 py-2 font-mono text-xs text-ink shadow-md backdrop-blur transition hover:opacity-90"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-terracotta-deep" />
      Designed by James Afflu &middot; IN-FLU-ENTIAL
    </a>
  );
}
