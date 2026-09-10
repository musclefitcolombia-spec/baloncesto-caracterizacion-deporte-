import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ResponsiveTable from '../components/ResponsiveTable'
import TrainabilityHeatmap from '../components/TrainabilityHeatmap'
import { capacidades, GRUPOS, type GrupoCapacidad } from '../data/fases-sensibles'

const gruposOrden: GrupoCapacidad[] = ['condicional', 'coordinativa', 'psicologico', 'teorico', 'tactico']

export default function Ventanas() {
  return (
    <div>
      <PageHeader
        number="08"
        kicker="Sección 08 · Ventanas de entrenabilidad"
        title="Ventanas de entrenabilidad (fases sensibles)"
        lead="Para cada capacidad —condicional, coordinativa, psicológica, teórica y táctica— existe un rango de edad con mayor margen de mejora, según la literatura de desarrollo motor y entrenamiento a largo plazo."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Qué son"
          title="Orientación pedagógica, no un límite rígido"
          lead='Los límites de cada ventana no son absolutos ni existe un consenso cerrado sobre su ubicación exacta. Deben interpretarse como orientación para planificar el entrenamiento a largo plazo, nunca como un límite individual estricto (Fases sensibles..., 2018; Entrenador de Básquet, 2020).'
        />

        <TrainabilityHeatmap />

        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-400">
          Los rangos de edad de este mapa son aproximaciones pedagógicas editables (ver{' '}
          <code className="rounded-none bg-ink-900/5 px-1 py-0.5">src/data/fases-sensibles.ts</code>): el documento
          fuente no traía los rangos de color rellenados de forma explícita, así que cada capacidad quedó marcada en
          el código con un comentario para ajustarla si se cuenta con la cifra exacta de la fuente original.
        </p>
      </section>

      <section className="section-shell pb-14 sm:pb-20">
        <SectionHeader eyebrow="Detalle numérico" title="Rangos de edad por capacidad" />
        <div className="space-y-10">
          {gruposOrden.map((grupo) => (
            <div key={grupo}>
              <h3 className="mb-3 flex items-center gap-2 font-display text-sm uppercase tracking-wide text-ink-950">
                <span className="h-2.5 w-2.5" style={{ backgroundColor: GRUPOS[grupo].color }} />
                {GRUPOS[grupo].label}
              </h3>
              <ResponsiveTable headers={['Capacidad', 'Rango de edad (años)']} caption={`Rangos de edad — ${GRUPOS[grupo].label}`}>
                {capacidades
                  .filter((c) => c.grupo === grupo)
                  .map((c) => (
                    <tr key={c.nombre} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
                      <td className="px-4 py-2.5 text-ink-950">{c.nombre}</td>
                      <td className="px-4 py-2.5 text-ink-700">
                        {c.rango[0]}–{c.rango[1]}
                      </td>
                    </tr>
                  ))}
              </ResponsiveTable>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
