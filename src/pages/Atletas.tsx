import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import Source from '../components/Source'
import PlayerCard from '../components/PlayerCard'
import CourtDivider from '../components/CourtDivider'
import SectionPhoto from '../components/SectionPhoto'
import trophyPhoto from '../assets/images/atletas-trophy.jpg'
import { IconTrophy } from '../components/icons'
import {
  jugadoresLeyenda,
  leyendasSource,
  baloncestoColombiano,
  mejorAtletaActual,
  perfilesPorPosicion,
  notaIMC,
  notaFuentesTabla,
} from '../data/atletas'

export default function Atletas() {
  return (
    <div>
      <PageHeader
        number="07"
        kicker="Sección 07 · Atletas referentes"
        title="Atletas referentes"
        lead="De las leyendas que redefinieron el juego a los referentes físicos actuales de cada posición, en ambas ramas."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Legado" title="Jugadores leyenda" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jugadoresLeyenda.map((j, i) => (
            <li key={j.nombre} className="flex gap-4 border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <span className="font-jersey text-3xl text-ink-900/20">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-display uppercase tracking-tight text-ink-950">{j.nombre}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700/80">{j.hito}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-ink-400">Fuentes: {leyendasSource}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionPhoto
            src={trophyPhoto}
            alt="Trofeo, medalla y camiseta de baloncesto sobre fondo naranja, símbolos del legado competitivo del deporte"
            aspect="tall"
          />
          <p className="text-sm leading-relaxed text-ink-700/80">{baloncestoColombiano}</p>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Vigencia" title="El mejor atleta actual" />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-ink-900/10 bg-ink-950 p-6 text-paper shadow-card">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-accent-500">
              <IconTrophy className="h-4 w-4" /> Rama masculina
            </div>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-tight">{mejorAtletaActual.masculino.nombre}</h3>
            <p className="text-sm text-paper/50">{mejorAtletaActual.masculino.equipo}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">{mejorAtletaActual.masculino.texto}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-paper/40">
              Fuente: {mejorAtletaActual.masculino.source}
            </p>
          </div>
          <div className="border border-ink-900/10 bg-ink-950 p-6 text-paper shadow-card">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest2 text-accent-500">
              <IconTrophy className="h-4 w-4" /> Rama femenina
            </div>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-tight">{mejorAtletaActual.femenino.nombre}</h3>
            <p className="text-sm text-paper/50">{mejorAtletaActual.femenino.equipo}</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">{mejorAtletaActual.femenino.texto}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-paper/40">
              Fuente: {mejorAtletaActual.femenino.source}
            </p>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Perfil antropométrico"
          title="Perfil físico ideal por posición"
          lead="Referente actual de cada posición, rama masculina y femenina."
        />

        <div className="space-y-10">
          {perfilesPorPosicion.map((p) => (
            <div key={p.posicion}>
              <h3 className="mb-4 font-display text-lg uppercase tracking-tight text-ink-950">
                {p.posicion} <span className="text-ink-400">· {p.posicionEn}</span>
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <PlayerCard
                  nombre={p.masculino.nombre}
                  equipo={p.masculino.equipo}
                  rama="Masculino"
                  filas={[
                    { label: 'Edad', value: p.masculino.edad },
                    { label: 'Estatura', value: p.masculino.estatura },
                    { label: 'Peso', value: p.masculino.peso },
                    { label: 'IMC', value: p.masculino.imc },
                    { label: 'Envergadura', value: p.masculino.envergadura },
                    { label: '% grasa corporal', value: p.masculino.grasa },
                  ]}
                />
                <PlayerCard
                  nombre={p.femenino.nombre}
                  equipo={p.femenino.equipo}
                  rama="Femenino"
                  filas={[
                    { label: 'Edad', value: p.femenino.edad },
                    { label: 'Estatura', value: p.femenino.estatura },
                    { label: 'Peso', value: p.femenino.peso },
                    { label: 'IMC', value: p.femenino.imc },
                    { label: 'Envergadura', value: p.femenino.envergadura },
                    { label: '% grasa corporal', value: p.femenino.grasa },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <p className="text-sm leading-relaxed text-ink-800">{notaIMC}</p>
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-400">{notaFuentesTabla}</p>
        <div className="mt-2">
          <Source>Basketball-Reference.com, 2026; ESPN, 2026; DIRECTV Insider, 2026</Source>
        </div>
      </section>
    </div>
  )
}
