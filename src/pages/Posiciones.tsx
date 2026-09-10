import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import { posiciones } from '../data/posiciones'

export default function Posiciones() {
  return (
    <div>
      <PageHeader
        number="05"
        kicker="Sección 05 · Perfil por posición"
        title="Análisis funcional por posición"
        lead="Las cinco posiciones del baloncesto cumplen funciones tácticas distintas, lo que se traduce en perfiles físicos, fisiológicos y antropométricos diferenciados."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Cinco roles, una cancha" title="Funciones tácticas por posición" />

        <div className="grid gap-6 lg:grid-cols-5">
          {posiciones.map((p) => (
            <div key={p.id} className="flex flex-col border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="font-jersey text-4xl text-accent-500">{p.numero}</span>
              </div>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tight text-ink-950">{p.nombre}</h3>
              <p className="text-xs uppercase tracking-wide text-ink-400">{p.nombreIngles}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-700/80">{p.funcion}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-700/70">
          Estas funciones diferenciadas se traducen en exigencias medibles: consulta la sección{' '}
          <Link to="/demandas" className="text-accent-600 underline decoration-accent-500/40 underline-offset-2">
            Demandas físicas y fisiológicas
          </Link>{' '}
          para ver los datos de potencia de salto, VO2máx y perfil antropométrico por posición, y{' '}
          <Link to="/atletas" className="text-accent-600 underline decoration-accent-500/40 underline-offset-2">
            Atletas referentes
          </Link>{' '}
          para el perfil físico ideal de cada posición en la élite actual.
        </p>
      </section>
    </div>
  )
}
