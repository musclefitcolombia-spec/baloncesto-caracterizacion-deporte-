interface SourceProps {
  children: string
}

/** Cita corta en línea, tipo "(Autor, año)", usada junto a un dato para trazabilidad. */
export default function Source({ children }: SourceProps) {
  return <span className="block text-xs uppercase tracking-wide text-ink-400">Fuente: {children}</span>
}
