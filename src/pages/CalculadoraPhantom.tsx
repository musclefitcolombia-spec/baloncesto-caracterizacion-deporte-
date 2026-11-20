import { useId, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ResponsiveTable from '../components/ResponsiveTable'
import CourtDivider from '../components/CourtDivider'
import PhantomBars from '../components/PhantomBars'
import { EJEMPLO, GRUPOS, H_PH, INDICES, S_TALLA } from '../data/phantom'
import {
  analizarMatriz,
  banda,
  calcularFilas,
  parseNumero,
  pistaUnidades,
  TALLA_MAX,
  TALLA_MIN,
  TODAS_LAS_VARIABLES,
  type Banda,
  type FilaZ,
} from '../lib/phantom'

const fmt = (n: number, d = 2) => n.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d })
const signo = (n: number) => (n > 0 ? '+' : '')

const CHIP: Record<Banda['cls'], string> = {
  'b-ok': 'bg-court-100 text-ink-950',
  'b-mid': 'bg-court-200 text-ink-950',
  'b-warn': 'bg-accent-100 text-accent-700',
  'b-bad': 'bg-[#B83A1E] text-white',
}

function Chip({ cls, children }: { cls: Banda['cls']; children: ReactNode }) {
  return <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold ${CHIP[cls]}`}>{children}</span>
}

const inputCls =
  'mt-1 w-full border bg-white px-3 py-2 text-sm text-ink-950 outline-none focus:border-accent-500'

interface CampoProps {
  label: string
  unidad?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  marcado?: boolean
  zTexto?: string
}

function Campo({ label, unidad, value, onChange, placeholder, required, marcado, zTexto }: CampoProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wide text-ink-400">
        {label} {unidad && <span className="text-ink-400/70">({unidad})</span>}
        {required && <span className="text-accent-500"> *</span>}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={marcado || undefined}
        className={`${inputCls} ${marcado ? 'border-[#B83A1E] bg-accent-50' : 'border-ink-900/15'}`}
      />
      <p className="mt-1 min-h-[1.1em] text-[11px] text-ink-400">{zTexto}</p>
    </div>
  )
}

const VENTANAS = [
  {
    t: '¿Qué es el Phantom?',
    d: 'Es una persona de referencia imaginaria, unisex, construida por Ross y Wilson (1974) con medias y desviaciones estándar de decenas de medidas. No es una norma de salud ni de rendimiento: sirve como regla común para comparar proporciones.',
  },
  {
    t: '¿Por qué 170,18 cm?',
    d: 'Es la talla del Phantom. Cada medida se escala a esa talla antes de compararla, de modo que el resultado dice si una proporción es mayor o menor que la del Phantom, no si el cuerpo es grande o pequeño.',
  },
  {
    t: 'El exponente d',
    d: 'Con d = 1 se escalan las medidas lineales (cinta, calibre, pliegues). Con d = 3 se escalan el peso y las masas, porque crecen con el volumen. La talla se reporta sin escalar: Z = (h − 170,18) / 6,29.',
  },
  {
    t: 'Unidades correctas',
    d: 'Pliegues en milímetros; perímetros, diámetros, alturas y longitudes en centímetros; peso y masas en kilogramos; talla en centímetros. Un error de unidades es la causa más común de un Z desmesurado.',
  },
  {
    t: 'Perímetros corregidos',
    d: 'Un perímetro incluye grasa. Al restar π por el pliegue (en cm) se obtiene una cifra más cercana al tejido magro (Kerr, 1988). La calculadora lo hace sola cuando tienes el perímetro y su pliegue.',
  },
  {
    t: '¿Cómo leer tu perfil de barras?',
    d: 'Cada barra parte de Z = 0. Naranja: mayor que el Phantom para tu talla; gris azulado: menor; rojo: |Z| ≥ 4, conviene revisar la medida. Un Z de ±8 o más casi siempre es un error de medición.',
  },
  {
    t: '¿Cómo funciona la matriz deportiva?',
    d: 'Resume tu perfil en 8 índices y lo compara con perfiles objetivo de 25 deportes. Se necesitan al menos 4 índices y siempre se muestran mínimo 3 deportes. Los perfiles son estimaciones orientativas basadas en tendencias morfológicas (Carter y Heath, 1990; Norton y Olds, 2001), no valores medidos.',
  },
  {
    t: 'Limitaciones y advertencias',
    d: 'Es una orientación, no una selección: la técnica, la fisiología, la maduración y el entrenamiento pesan tanto o más que la forma del cuerpo. Es un modelo de los años setenta; los resultados dependen de medir con técnica ISAK, y en jugadores U14 se leen con cautela.',
  },
]

export default function CalculadoraPhantom() {
  const [nombre, setNombre] = useState('')
  const [sexo, setSexo] = useState('')
  const [edad, setEdad] = useState('')
  const [talla, setTalla] = useState('')
  const [vals, setVals] = useState<Record<string, string>>({})
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({ basicas: true, pliegues: true, perimetros: true })
  const idNombre = useId()
  const idSexo = useId()

  const h = parseNumero(talla)
  const tallaValida = Number.isFinite(h) && h >= TALLA_MIN && h <= TALLA_MAX

  const { filas, analisis } = useMemo(() => {
    if (!tallaValida) return { filas: [], analisis: null }
    const numericos: Record<string, number> = {}
    TODAS_LAS_VARIABLES.forEach((x) => (numericos[x.key] = parseNumero(vals[x.key] ?? '')))
    const f = calcularFilas(h, numericos)
    return { filas: f, analisis: analizarMatriz(f) }
  }, [h, tallaValida, vals])

  const zPorClave = useMemo(() => Object.fromEntries(filas.map((r) => [r.key, r.z])), [filas])
  const extremas = filas.filter((r) => r.key !== 'talla' && Math.abs(r.z) >= 4)

  const setVal = (k: string) => (v: string) => setVals((p) => ({ ...p, [k]: v }))

  function cargarEjemplo() {
    const nuevos: Record<string, string> = {}
    Object.entries(EJEMPLO).forEach(([k, v]) => {
      if (k !== 'talla') nuevos[k] = String(v)
    })
    setVals(nuevos)
    setTalla(String(EJEMPLO.talla))
    setNombre('Ejemplo')
    setSexo('M')
    setEdad('21')
    setAbiertos(Object.fromEntries(GRUPOS.map((g) => [g.id, true])))
  }

  function limpiar() {
    setVals({})
    setTalla('')
    setNombre('')
    setSexo('')
    setEdad('')
  }

  function descargarCsv() {
    if (!tallaValida) return
    const nom = nombre.trim() || 'evaluado'
    const lineas: (string | number)[][] = [
      ['Nombre', nom],
      ['Sexo', sexo],
      ['Edad', edad],
      ['Talla (cm)', h],
      [],
      ['Grupo', 'Variable', 'Unidad', 'Medida', 'Escalada', 'P', 's', 'd', 'Z', 'Lectura'],
    ]
    filas.forEach((f) =>
      lineas.push([f.grupo, f.label, f.unit, f.v.toFixed(2), f.esc.toFixed(2), f.P, f.s, f.d, f.z.toFixed(2), banda(f.z).txt]),
    )
    if (analisis && analisis.ranking.length) {
      lineas.push([], ['Orientación deportiva', 'Compatibilidad (%)', 'Rasgo clave'])
      analisis.ranking.forEach((d, i) => lineas.push([(i < 3 ? '★ ' : '') + d.nom, d.pct, d.rasgo]))
    }
    const txt =
      '﻿' + lineas.map((l) => l.map((x) => `"${String(x ?? '').replace(/"/g, '""')}"`).join(';')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv;charset=utf-8' }))
    a.download = `phantom_${nom.replace(/\s+/g, '_')}.csv`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const irAResultados = () => document.getElementById('zp-resultados')?.scrollIntoView({ behavior: 'smooth' })

  const btnPrimario =
    'inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-sm font-medium uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-300'
  const btnSecundario =
    'inline-flex items-center gap-2 border border-ink-900/15 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600'

  return (
    <div>
      <PageHeader
        number="12"
        kicker="Sección 12 · Calculadora Z Phantom"
        title="Calculadora Z Phantom"
        lead="Escala tus medidas a la talla del Phantom de Ross y Wilson (1974) y obtén un puntaje Z de proporcionalidad para cada variable. Ningún dato que ingreses se envía ni se guarda."
      />

      {/* Ventanas informativas */}
      <section className="section-shell py-14 sm:py-16" aria-labelledby="zp-info">
        <SectionHeader
          eyebrow="Antes de calcular"
          title="El Phantom en ocho ideas"
          lead="Cada idea explica una pieza de la calculadora. Si ya la conoces, salta directamente a ella."
        />
        <div className="mb-8 bg-ink-950 p-5 text-center font-mono text-sm text-paper sm:text-lg" aria-label="Fórmula del puntaje Z Phantom">
          <span className="whitespace-nowrap">
            Z = (1 / <span className="text-accent-500">s</span>) · [ v · (170,18 / h)
            <sup className="text-accent-500">d</sup> − <span className="text-accent-500">P</span> ]
          </span>
        </div>
        <h2 id="zp-info" className="sr-only">
          Ideas clave del Phantom
        </h2>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VENTANAS.map((v, i) => (
            <li key={v.t} className="flex gap-3 border border-ink-900/10 bg-white/60 p-5 shadow-card">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-ink-950 font-display text-accent-500">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base uppercase leading-tight tracking-tight text-ink-950">{v.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{v.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <details className="mt-8 border border-ink-900/10 bg-white/60">
          <summary className="cursor-pointer px-5 py-4 font-display text-sm uppercase tracking-wide text-ink-950">
            Ver tabla de valores Phantom (P, s y d)
          </summary>
          <div className="border-t border-ink-900/10 p-5">
            <p className="mb-4 text-sm text-ink-700">
              Valores del componente original, que cita a Ross y Wilson (1974), Ross y Marfell-Jones (1991) y la
              recopilación de Esparza (1993). P es la media del Phantom, s su desviación estándar y d el exponente de
              escalamiento.
            </p>
            {GRUPOS.map((g) => (
              <div key={g.id} className="mb-6 last:mb-0">
                <ResponsiveTable headers={['Variable', 'Unidad', 'P', 's', 'd']} caption={`Valores Phantom: ${g.titulo}`}>
                  <tr className="border-t border-ink-900/10 bg-court-100">
                    <th colSpan={5} scope="colgroup" className="px-4 py-2 text-left font-display text-sm uppercase tracking-tight text-ink-950">
                      {g.titulo}
                    </th>
                  </tr>
                  {g.vars.map(([k, label, unit, P, s, d]) => (
                    <tr key={k} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
                      <th scope="row" className="px-4 py-2 text-left font-normal text-ink-900">
                        {label}
                      </th>
                      <td className="px-4 py-2 text-ink-700">{unit}</td>
                      <td className="px-4 py-2 tabular-nums">{fmt(P)}</td>
                      <td className="px-4 py-2 tabular-nums">{fmt(s)}</td>
                      <td className="px-4 py-2">{d}</td>
                    </tr>
                  ))}
                </ResponsiveTable>
              </div>
            ))}
          </div>
        </details>

        <div className="mt-8">
          <a href="#zp-calculadora" className={btnPrimario}>
            Calcular mi Z
          </a>
        </div>
      </section>

      <CourtDivider />

      {/* Calculadora */}
      <section id="zp-calculadora" className="section-shell scroll-mt-20 py-14 sm:py-16">
        <SectionHeader
          eyebrow="Calculadora"
          title="Datos del evaluado"
          lead="La talla es obligatoria; llena solo las medidas que tengas. Puedes escribir con coma o con punto."
        />

        <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor={idNombre} className="block text-xs uppercase tracking-wide text-ink-400">
                Nombre (opcional)
              </label>
              <input
                id={idNombre}
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej.: Atleta 1"
                className={`${inputCls} border-ink-900/15`}
              />
            </div>
            <div>
              <label htmlFor={idSexo} className="block text-xs uppercase tracking-wide text-ink-400">
                Sexo
              </label>
              <select id={idSexo} value={sexo} onChange={(e) => setSexo(e.target.value)} className={`${inputCls} border-ink-900/15`}>
                <option value="">Sin especificar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <Campo label="Edad" unidad="años" value={edad} onChange={setEdad} placeholder="Ej.: 14" />
            <Campo
              label="Talla"
              unidad="cm"
              required
              value={talla}
              onChange={setTalla}
              placeholder="Ej.: 175,0"
              marcado={Number.isFinite(h) && !tallaValida}
              zTexto={tallaValida ? `Z = ${signo(zPorClave.talla)}${fmt(zPorClave.talla)}` : undefined}
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2 print:hidden">
            <button type="button" className={btnPrimario} onClick={irAResultados}>
              Calcular
            </button>
            <button type="button" className={btnSecundario} onClick={cargarEjemplo}>
              Cargar ejemplo
            </button>
            <button type="button" className={btnSecundario} onClick={descargarCsv} disabled={!tallaValida}>
              Descargar CSV
            </button>
            <button type="button" className={btnSecundario} onClick={() => window.print()}>
              Imprimir / PDF
            </button>
            <button type="button" className={btnSecundario} onClick={limpiar}>
              Limpiar
            </button>
          </div>
          <div role="status" aria-live="polite" className="mt-4 space-y-2">
            {Number.isFinite(h) && !tallaValida && (
              <p className="border-l-[3px] border-accent-500 bg-accent-50 p-3 text-sm text-ink-800">
                <b>Talla fuera de rango.</b> ¿La escribiste en metros (ej. 1,75)? Debe ir en centímetros (175) y estar entre{' '}
                {TALLA_MIN} y {TALLA_MAX}.
              </p>
            )}
            {tallaValida && filas.length === 1 && (
              <p className="border-l-[3px] border-accent-500 bg-accent-50 p-3 text-sm text-ink-800">
                Agrega al menos una medida además de la talla para ver tu perfil.
              </p>
            )}
            {extremas.map((r) => (
              <p key={r.key} className="border-l-[3px] border-accent-500 bg-accent-50 p-3 text-sm text-ink-800">
                <b>
                  {r.label}: Z = {fmt(r.z)}.
                </b>{' '}
                {Math.abs(r.z) >= 8 && 'Un Z tan extremo casi siempre es un error de medida, no un talento. '}
                {pistaUnidades(r, h, fmt)}
              </p>
            ))}
          </div>
        </div>

        {/* Grupos de medidas */}
        <div className="mt-6 space-y-3">
          {GRUPOS.map((g) => (
            <details
              key={g.id}
              open={!!abiertos[g.id]}
              onToggle={(e) => {
                const abierto = (e.currentTarget as HTMLDetailsElement).open
                setAbiertos((p) => (p[g.id] === abierto ? p : { ...p, [g.id]: abierto }))
              }}
              className="border border-ink-900/10 bg-white/60"
            >
              <summary className="flex cursor-pointer items-baseline justify-between gap-3 px-5 py-4 font-display uppercase tracking-wide text-ink-950">
                {g.titulo}
                <small className="hidden font-body text-xs normal-case tracking-normal text-ink-400 sm:inline">{g.nota}</small>
              </summary>
              <div className="grid gap-4 border-t border-ink-900/10 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {g.vars.map(([k, label, unit, P]) => (
                  <Campo
                    key={k}
                    label={label}
                    unidad={unit}
                    value={vals[k] ?? ''}
                    onChange={setVal(k)}
                    placeholder={`P = ${fmt(P)}`}
                    marcado={zPorClave[k] !== undefined && Math.abs(zPorClave[k]) >= 4}
                    zTexto={zPorClave[k] !== undefined ? `Z = ${signo(zPorClave[k])}${fmt(zPorClave[k])}` : undefined}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <CourtDivider />

      {/* Resultados */}
      <section id="zp-resultados" className="section-shell scroll-mt-20 py-14 sm:py-16">
        <SectionHeader eyebrow="Resultados" title="Perfil de proporcionalidad" />
        <div className="mb-4 flex flex-wrap gap-2" aria-label="Leyenda de las bandas de interpretación">
          <Chip cls="b-ok">|Z| &lt; 1 · Proporción común</Chip>
          <Chip cls="b-mid">1 ≤ |Z| &lt; 2 · Moderada</Chip>
          <Chip cls="b-warn">2 ≤ |Z| &lt; 4 · Poco común</Chip>
          <Chip cls="b-bad">|Z| ≥ 4 · Revisa la medida</Chip>
        </div>
        <p className="mb-4 text-xs text-ink-400">
          Barras desde Z = 0: <b className="text-accent-600">naranja</b> = mayor que el Phantom para tu talla ·{' '}
          <b className="text-[#4f6f8a]">gris azulado</b> = menor · <b className="text-[#B83A1E]">rojo</b> = |Z| ≥ 4, revisa la
          medida. El valor y la lectura también están escritos en cada fila y en la tabla.
        </p>
        <div className="border border-ink-900/10 bg-white/60 p-5">
          {tallaValida ? (
            <PhantomBars filas={filas} />
          ) : (
            <p className="py-6 text-center text-sm text-ink-700">Ingresa una talla válida (entre {TALLA_MIN} y {TALLA_MAX} cm).</p>
          )}
        </div>

        <h3 className="mb-3 mt-10 font-display text-lg uppercase tracking-tight text-ink-950">Tabla de resultados</h3>
        <ResponsiveTable
          headers={['Variable', 'Medida (v)', 'Escalada', 'P', 's', 'd', 'Z', 'Lectura']}
          caption="Resultados Z Phantom por variable"
        >
          {filas.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-sm text-ink-700">
                Ingresa la talla y al menos una medida.
              </td>
            </tr>
          )}
          {filas.map((r, i) => {
            const b = banda(r.z)
            return (
              <FilaTabla key={r.key} r={r} b={b} nuevoGrupo={i === 0 || filas[i - 1].grupo !== r.grupo} />
            )
          })}
        </ResponsiveTable>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-400">
          La talla se reporta sin escalar: Z = (h − {fmt(H_PH)}) / {fmt(S_TALLA)}. Los perímetros corregidos se calculan
          solos: perímetro − π · (pliegue en mm / 10). El modelo Phantom es asexuado: es normal que los hombres salgan
          negativos en el diámetro biiliocrestal y positivos en el biacromial.
        </p>
      </section>

      <CourtDivider />

      {/* Matriz */}
      <section id="zp-matriz" className="section-shell scroll-mt-20 py-14 sm:py-16">
        <SectionHeader
          eyebrow="Orientación"
          title="Matriz de orientación deportiva"
          lead="Tu perfil Z se resume en 8 índices y se compara con el perfil típico de 25 deportes. Entre más cerca estés del perfil de un deporte, mayor la compatibilidad."
        />
        <p className="mb-6 max-w-3xl border-l-[3px] border-accent-500 bg-white/60 p-4 text-sm leading-relaxed text-ink-700">
          Es una <b>orientación</b> para explorar, no una selección: la técnica, la fisiología, la motivación y el
          entrenamiento pesan tanto o más que la forma del cuerpo. Los perfiles de cada deporte son estimaciones
          orientativas, no mediciones de atletas; consulta también el apartado{' '}
          <Link to="/gold-standard#gs-9" className="text-accent-600 underline underline-offset-2">
            Gold standard
          </Link>{' '}
          para ver cuánto pesa la maduración en jóvenes y la{' '}
          <Link to="/calculadora-somatotipo" className="text-accent-600 underline underline-offset-2">
            calculadora de somatotipo
          </Link>{' '}
          para una lectura específica de baloncesto.
        </p>

        {!analisis || filas.length < 2 ? (
          <p className="border border-ink-900/10 bg-white/60 p-6 text-center text-sm text-ink-700">
            Completa tus medidas para ver la matriz.
          </p>
        ) : analisis.ranking.length === 0 ? (
          <p role="status" className="border-l-[3px] border-accent-500 bg-accent-50 p-4 text-sm text-ink-800">
            <b>Faltan datos para orientar.</b> Necesitas al menos 4 de los 8 índices (tienes {analisis.disponibles.length}). Te
            faltan: {analisis.faltan.join(', ')}. Lo mínimo recomendado: talla, peso, pliegues (tríceps, subescapular,
            supraespinal, abdominal, muslo, pierna), perímetros de brazo flexionado y pierna, y diámetros de húmero y fémur.
          </p>
        ) : (
          <>
            {analisis.faltan.length > 0 && (
              <p className="mb-3 text-sm text-ink-700">
                Calculado con {analisis.disponibles.length} de 8 índices. Para afinar, agrega: {analisis.faltan.join(', ')}.
              </p>
            )}
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {analisis.recomendados.map((r, i) => {
                const orden = [...r.det].sort((a, b) => Math.abs(a.dif) - Math.abs(b.dif))
                const cercanos = orden.slice(0, 2)
                const g = orden[orden.length - 1]
                return (
                  <li
                    key={r.nom}
                    className={`relative border bg-white/60 p-5 shadow-card ${i === 0 ? 'border-accent-500' : 'border-ink-900/10'}`}
                  >
                    <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-ink-950 font-display text-accent-500">
                      {i + 1}
                    </span>
                    <h4 className="pr-10 font-display text-lg uppercase tracking-tight text-ink-950">{r.nom}</h4>
                    <p className="text-xs text-ink-400">{r.rasgo}</p>
                    <p className="mt-2 font-mono text-3xl text-accent-600">{r.pct}%</p>
                    <div className="my-2 h-1.5 bg-ink-900/10">
                      <div className="h-full bg-accent-500" style={{ width: `${r.pct}%` }} />
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-ink-700">
                      {cercanos.map((d) => (
                        <li key={d.I.k}>
                          <b>{d.I.nom}</b> muy cercano al perfil (tú {fmt(d.v, 1)} · deporte {fmt(d.t, 1)})
                        </li>
                      ))}
                      {Math.abs(g.dif) < 0.75 ? (
                        <li>Sin brechas importantes frente al perfil.</li>
                      ) : (
                        <li>
                          <b>{g.I.nom}</b> {g.dif > 0 ? 'por encima' : 'por debajo'} del perfil ({fmt(g.dif, 1)}):{' '}
                          {g.I.mod ? <b>entrenable con el plan adecuado.</b> : 'rasgo estructural, poco modificable.'}
                        </li>
                      )}
                    </ul>
                  </li>
                )
              })}
            </ol>

            <details className="mt-6 border border-ink-900/10 bg-white/60">
              <summary className="cursor-pointer px-5 py-4 font-display text-sm uppercase tracking-wide text-ink-950">
                Ver la matriz completa (25 deportes) <small className="font-body text-xs normal-case tracking-normal text-ink-400">valores Z objetivo por índice</small>
              </summary>
              <div className="border-t border-ink-900/10 p-5">
                <ResponsiveTable
                  headers={['Deporte', ...INDICES.map((I) => I.nom), 'Compat.']}
                  caption="Matriz de orientación deportiva: valor Z objetivo de cada deporte por índice, con tu perfil en la primera fila"
                >
                  <tr className="border-t border-ink-900/10 bg-ink-950 font-semibold text-accent-300">
                    <th scope="row" className="px-3 py-2 text-left">
                      Tú
                    </th>
                    {INDICES.map((I) => (
                      <td key={I.k} className="px-3 py-2 text-center tabular-nums">
                        {Number.isFinite(analisis.ind[I.k]) ? `${signo(analisis.ind[I.k])}${fmt(analisis.ind[I.k], 1)}` : '—'}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center">—</td>
                  </tr>
                  {analisis.ranking.map((r) => {
                    const top = analisis.recomendados.some((x) => x.nom === r.nom)
                    return (
                      <tr key={r.nom} className="border-t border-ink-900/10">
                        <th scope="row" className={`px-3 py-2 text-left ${top ? 'font-semibold text-accent-700' : 'font-normal text-ink-900'}`}>
                          {top && <span aria-hidden="true">★ </span>}
                          {r.nom}
                          {top && <span className="sr-only"> (recomendado)</span>}
                        </th>
                        {INDICES.map((I, i) => {
                          const v = analisis.ind[I.k]
                          const t = r.obj[i]
                          const texto = `${signo(t)}${fmt(t, 1)}`
                          if (!Number.isFinite(v))
                            return (
                              <td key={I.k} className="px-3 py-2 text-center tabular-nums text-ink-400/60">
                                {texto}
                              </td>
                            )
                          const dd = Math.abs(v - t)
                          const cls = dd < 0.75 ? 'bg-court-200/70' : dd > 2 ? 'bg-accent-100' : ''
                          return (
                            <td key={I.k} className={`px-3 py-2 text-center tabular-nums ${cls}`}>
                              {texto}
                              {dd < 0.75 && <span className="sr-only"> (cerca)</span>}
                              {dd > 2 && <span className="sr-only"> (lejos)</span>}
                            </td>
                          )
                        })}
                        <td className="px-3 py-2 text-center font-semibold">{r.pct}%</td>
                      </tr>
                    )
                  })}
                </ResponsiveTable>
                <p className="mt-3 text-xs leading-relaxed text-ink-400">
                  <b>Índices:</b> Talla = Z de la talla sin escalar · Adiposidad = promedio Z de los pliegues · Muscularidad =
                  promedio Z de perímetros corregidos (o de brazo flexionado, antebrazo, muslo y pierna si no hay pliegues) ·
                  Robustez ósea = promedio Z de diámetros de húmero, fémur, muñeca y tobillo · Peso = Z del peso
                  proporcional · Envergadura = Z de envergadura / extremidad superior · Hombros = Z biacromial y transverso
                  de tórax · Tronco = Z de talla sentado (positivo = tronco largo y piernas cortas). Celdas atenuadas:
                  índice que no mediste. Celdas sombreadas: cerca (diferencia &lt; 0,75) o lejos (&gt; 2) de tu perfil.
                </p>
              </div>
            </details>
          </>
        )}

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-700">
          <b>Nota sobre la edad.</b> El Phantom es un modelo de referencia de los años setenta y sus valores no se ajustan por
          edad ni por maduración. En jugadores U14 el Z describe proporciones, no talento ni potencial; léelo siempre junto
          con la maduración biológica (ver{' '}
          <Link to="/desarrollo-juvenil" className="text-accent-600 underline underline-offset-2">
            Desarrollo juvenil
          </Link>
          ).
        </p>
      </section>
    </div>
  )
}

function FilaTabla({ r, b, nuevoGrupo }: { r: FilaZ; b: Banda; nuevoGrupo: boolean }) {
  return (
    <>
      {nuevoGrupo && (
        <tr className="border-t border-ink-900/10 bg-court-100">
          <th colSpan={8} scope="colgroup" className="px-4 py-2 text-left font-display text-sm uppercase tracking-tight text-ink-950">
            {r.grupo}
          </th>
        </tr>
      )}
      <tr className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
        <th scope="row" className="px-4 py-2 text-left font-normal text-ink-900">
          {r.label} <span className="text-xs text-ink-400">({r.unit})</span>
        </th>
        <td className="px-4 py-2 tabular-nums">{fmt(r.v)}</td>
        <td className="px-4 py-2 tabular-nums">{fmt(r.esc)}</td>
        <td className="px-4 py-2 tabular-nums">{fmt(r.P)}</td>
        <td className="px-4 py-2 tabular-nums">{fmt(r.s)}</td>
        <td className="px-4 py-2">{r.d}</td>
        <td className="px-4 py-2 font-mono font-semibold">
          {signo(r.z)}
          {fmt(r.z)}
        </td>
        <td className="px-4 py-2">
          <Chip cls={b.cls}>{b.txt}</Chip>
        </td>
      </tr>
    </>
  )
}
