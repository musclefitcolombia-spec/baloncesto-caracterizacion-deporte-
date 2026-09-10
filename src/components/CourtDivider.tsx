/** Línea de medio campo con círculo central, motivo visual propio hecho en SVG. */
export default function CourtDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`section-shell ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 24" className="h-6 w-full text-ink-900/15" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="400" y2="12" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </div>
  )
}
