import { NIVELES, type FuenteGS, type NivelEvidencia } from '../data/goldStandard.data'

const NIVEL_CLASE: Record<NivelEvidencia, string> = {
  fuerte: 'border-ink-950 bg-ink-950 text-paper',
  moderado: 'border-ink-950 bg-court-100 text-ink-950',
  limitado: 'border-dashed border-ink-600 bg-white text-ink-700',
}

/** El nivel se comunica con texto (y con el estilo del borde), no solo con color. */
export function NivelBadge({ nivel }: { nivel: NivelEvidencia }) {
  return (
    <span
      className={`inline-block whitespace-nowrap border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${NIVEL_CLASE[nivel]}`}
    >
      Nivel: {NIVELES[nivel].etiqueta}
    </span>
  )
}

function estadoDe(f: FuenteGS): { texto: string; clase: string } {
  if (!f.referencia_completa) {
    return {
      texto: 'Referencia en verificación',
      clase: 'border-accent-600 bg-accent-50 text-accent-700',
    }
  }
  if (f.verificado) {
    return { texto: 'Verificada', clase: 'border-ink-900/30 bg-white text-ink-800' }
  }
  return {
    texto: 'Verificada por registro (enlace sin abrir)',
    clase: 'border-dashed border-ink-600 bg-white text-ink-700',
  }
}

export function EstadoBadge({ fuente }: { fuente: FuenteGS }) {
  const e = estadoDe(fuente)
  return (
    <span className={`inline-block border px-2 py-0.5 text-[11px] font-semibold leading-snug ${e.clase}`}>
      {e.texto}
    </span>
  )
}
