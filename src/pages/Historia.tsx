import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import Source from '../components/Source'
import CourtDivider from '../components/CourtDivider'
import SectionPhoto from '../components/SectionPhoto'
import woodFloorBall from '../assets/images/historia-woodfloor.jpg'
import {
  hitosMundiales,
  hitosColombia,
  datoLigaColombia,
  ecosistemaJerarquia,
  genero1910,
  seleccionFemeninaActual,
  brechaInstitucional,
  cifrasMinDeporte,
  conclusionGenero,
  type HitoHistorico,
} from '../data/historia'

function Timeline({ items }: { items: HitoHistorico[] }) {
  return (
    <ol className="relative space-y-8 border-l border-ink-900/15 pl-8">
      {items.map((h) => (
        <li key={h.title} className="relative">
          <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-accent-500 bg-paper" />
          <p className="font-jersey text-xl leading-none text-accent-600">{h.year}</p>
          <h3 className="mt-1.5 font-display text-lg uppercase tracking-tight text-ink-950">{h.title}</h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-700/80">{h.text}</p>
          <div className="mt-1.5">
            <Source>{h.source}</Source>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Historia() {
  return (
    <div>
      <PageHeader
        number="01"
        kicker="Sección 01 · Historia"
        title="Historia del baloncesto"
        lead="Del gimnasio de una YMCA en Massachusetts a un deporte olímpico global — y su llegada, hace un siglo, a las canchas colombianas."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Origen mundial" title="De Springfield a los Juegos Olímpicos" />
        <Timeline items={hitosMundiales} />

        <div className="mt-10 max-w-xl">
          <SectionPhoto
            src={woodFloorBall}
            alt="Balón de baloncesto sobre un piso de madera desgastado, típico de los gimnasios donde nació este deporte"
            caption="El piso de madera de los primeros gimnasios universitarios sigue siendo, un siglo después, la superficie de juego por excelencia."
            aspect="square"
          />
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Colombia"
          title="Baloncesto en Colombia: origen y desarrollo"
          lead="Un siglo de historia que arranca con la comunidad lasallista y que aún busca su primera clasificación olímpica."
        />
        <Timeline items={hitosColombia} />

        <div className="mt-10 max-w-2xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <p className="text-sm leading-relaxed text-ink-800">{datoLigaColombia.text}</p>
          <div className="mt-2">
            <Source>{datoLigaColombia.source}</Source>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Ecosistema deportivo, social y de género"
          title="Estructura organizativa y una historia de género"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <h3 className="font-display uppercase tracking-tight text-ink-950">Jerarquía organizativa</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{ecosistemaJerarquia.text}</p>
              <div className="mt-2">
                <Source>{ecosistemaJerarquia.source}</Source>
              </div>
            </div>

            <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <h3 className="font-display uppercase tracking-tight text-ink-950">Una ley de 1910</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{genero1910.text}</p>
              <div className="mt-2">
                <Source>{genero1910.source}</Source>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <h3 className="font-display uppercase tracking-tight text-ink-950">Selección femenina, hoy</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{seleccionFemeninaActual.text}</p>
              <div className="mt-2">
                <Source>{seleccionFemeninaActual.source}</Source>
              </div>
            </div>

            <div className="border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
              <h3 className="font-display uppercase tracking-tight text-ink-950">Una brecha institucional</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{brechaInstitucional.text}</p>
              <div className="mt-2">
                <Source>{brechaInstitucional.source}</Source>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border border-ink-900/10 bg-ink-950 p-6 text-paper sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
          <div className="flex gap-8">
            <div>
              <p className="font-jersey text-4xl text-accent-500">
                {Math.round((cifrasMinDeporte.ninas / cifrasMinDeporte.total) * 100)}%
              </p>
              <p className="mt-1 max-w-[10rem] text-xs leading-snug text-paper/60">
                de inscritos en Juegos Intercolegiados Nacionales 2024 eran niñas ({cifrasMinDeporte.ninas.toLocaleString('es-CO')} de{' '}
                {cifrasMinDeporte.total.toLocaleString('es-CO')})
              </p>
            </div>
            <div>
              <p className="font-jersey text-4xl text-accent-500">{cifrasMinDeporte.porcentajeAltoRendimiento}%</p>
              <p className="mt-1 max-w-[10rem] text-xs leading-snug text-paper/60">
                de deportistas de alto rendimiento del sistema olímpico colombiano son mujeres
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-paper/80">{conclusionGenero}</p>
            <div className="mt-2">
              <Source>{cifrasMinDeporte.source}</Source>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
