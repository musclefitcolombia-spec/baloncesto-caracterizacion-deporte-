import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import SectionPhoto from '../components/SectionPhoto'
import teamHuddle from '../assets/images/posiciones-huddle.jpg'
import { posiciones } from '../data/posiciones'
import { perfilesPorPosicion, referentesColombianos } from '../data/atletas'
import { IconMapPin } from '../components/icons'

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

        <SectionPhoto
          src={teamHuddle}
          alt="Equipo de baloncesto reunido en un corrillo durante un partido, coordinando estrategia entre jugadores de distintas posiciones"
          caption="Cada posición aporta una función distinta al mismo objetivo colectivo."
          aspect="wide"
          className="mb-10"
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {posiciones.map((p, i) => {
            const global = perfilesPorPosicion[i]
            const colombia = referentesColombianos[i]
            return (
              <div key={p.id} className="flex flex-col border border-ink-900/10 bg-white/60 p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-jersey text-4xl text-accent-500">{p.numero}</span>
                </div>
                <h3 className="mt-3 font-display text-xl uppercase tracking-tight text-ink-950">{p.nombre}</h3>
                <p className="text-xs uppercase tracking-wide text-ink-400">{p.nombreIngles}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700/80">{p.funcion}</p>

                <div className="mt-5 space-y-3 border-t border-ink-900/10 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest2 text-ink-400">Mejor jugador actual</p>
                    <p className="mt-1 text-sm font-medium text-ink-950">{global.masculino.nombre}</p>
                    <p className="text-xs text-ink-700/60">
                      {global.masculino.estatura} · {global.masculino.equipo}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-[11px] uppercase tracking-widest2 text-accent-600">
                      <IconMapPin className="h-3 w-3" /> Referente colombiano
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink-950">{colombia.nombre}</p>
                    <p className="text-xs text-ink-700/60">
                      {colombia.estatura} · {colombia.equipo}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
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
          para el perfil físico completo de cada jugador, la contraparte femenina y las fuentes de cada dato.
        </p>
      </section>
    </div>
  )
}
