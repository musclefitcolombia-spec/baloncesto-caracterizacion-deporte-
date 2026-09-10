import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import Source from '../components/Source'
import Card from '../components/Card'
import CourtDivider from '../components/CourtDivider'
import {
  clasificacionDeporte,
  categorias,
  notaCategorias,
  datoRetencionTalento,
  competenciasSelecciones,
  competenciasClubesInternacional,
  competenciasColombia,
} from '../data/clasificacion'

function CompetenciaList({ title, items }: { title: string; items: { nombre: string; detalle: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-wide text-accent-600">{title}</h3>
      <ul className="mt-3 space-y-3 border-t border-ink-900/10 pt-3">
        {items.map((c) => (
          <li key={c.nombre}>
            <p className="text-sm font-medium text-ink-950">{c.nombre}</p>
            <p className="text-sm text-ink-700/70">{c.detalle}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Clasificacion() {
  return (
    <div>
      <PageHeader
        number="02"
        kicker="Sección 02 · Clasificación y categorías"
        title="Clasificación y categorías"
        lead="Qué tipo de deporte es el baloncesto, cómo se organiza por edades, y en qué competencias se disputa."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Tipo de deporte" title="Clasificación del baloncesto" />
        <div className="grid gap-5 sm:grid-cols-3">
          {clasificacionDeporte.map((c) => (
            <Card key={c.title} accent>
              <h3 className="font-display uppercase tracking-tight text-ink-950">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{c.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Baloncesto formativo"
          title="Categorías por edad"
          lead={notaCategorias}
        />

        <div className="grid gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 sm:grid-cols-3 lg:grid-cols-6">
          {categorias.map((c) => (
            <div key={c.nombre} className="bg-white/70 p-5">
              <p className="font-display text-base uppercase tracking-tight text-ink-950">{c.nombre}</p>
              <p className="mt-1 font-jersey text-2xl text-accent-600">{c.rango}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-700/70">{c.detalle}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <p className="text-sm leading-relaxed text-ink-800">{datoRetencionTalento.text}</p>
          <div className="mt-2">
            <Source>{datoRetencionTalento.source}</Source>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Panorama competitivo" title="Competencias" />
        <div className="grid gap-8 border border-ink-900/10 bg-white/60 p-6 shadow-card sm:grid-cols-3 sm:p-8">
          <CompetenciaList title="Selecciones nacionales" items={competenciasSelecciones} />
          <CompetenciaList title="Clubes (internacional)" items={competenciasClubesInternacional} />
          <CompetenciaList title="Colombia" items={competenciasColombia} />
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Fuentes: IDSPORTS, s.f.; About FIBA, s.f.; Ascun Deportes, s.f.
        </p>
      </section>
    </div>
  )
}
