import { useId, useRef, useState } from 'react'
import type { CoordenadasSomatocarta, Somatotipo } from '../lib/somatotipo'

// Los 4 tipos de posición ('base' | 'escolta' | 'alero' | 'pivot') representan los
// puntos de élite internacional de la Figura 1 del artículo base, con el mismo
// marcador y color que usa esa figura (círculo azul, cuadrado rojo, triángulo
// verde, aspa morada). 'media' es la media de la muestra cadete total (línea
// cian), también parte de esa misma figura. 'atleta' y 'referente' son capas
// propias de esta calculadora (el jugador evaluado y el jugador NBA de contraste).
export type TipoPunto = 'atleta' | 'base' | 'escolta' | 'alero' | 'pivot' | 'media' | 'referente'

export interface PuntoSomatocarta {
  id: string
  tipo: TipoPunto
  label: string
  somatotipo: Somatotipo
  coords: CoordenadasSomatocarta
  detalle?: string
  /** false atenúa el marcador (p. ej. posiciones de élite distintas a la seleccionada). */
  enfasis?: boolean
}

interface SomatocartaProps {
  puntos: PuntoSomatocarta[]
  /** Si se da, dibuja una línea discontinua del punto "atleta" al punto "elite" con las distancias. */
  distancias?: { sad: number; euclidiana: number } | null
}

const X_MIN = -8
const X_MAX = 8
const Y_MIN = -8
const Y_MAX = 16
// La Figura 1 del artículo no usa la misma escala en los dos ejes: el gráfico es
// mucho más ancho que alto (aprox. 2,5 veces más píxeles por unidad en X que en
// Y), no un cuadrado. Con una sola escala (1 unidad = mismo tamaño en ambos ejes)
// el heptágono sale angosto y alto, muy distinto al original.
const UNIT_X = 26
const UNIT_Y = 10
const PADDING_X = 64
const PADDING_TOP = 36
const PADDING_BOTTOM = 56

// Contorno real del somatocarta (Figura 1 del artículo base), releído con una
// foto más clara: vértice superior puntiagudo cerca del máximo del eje Y; los
// lados NO son verticales, se inclinan hacia afuera bajando desde el "hombro"
// hasta la esquina inferior (que llega hasta el borde del eje, x=±8); y la base
// no es plana, tiene un sexto vértice al centro que baja un poco más (una "v"
// poco pronunciada), por eso Endomorfia/Ectomorfia no son el punto más bajo.
const V_MESO = { x: 0, y: 15 } // vértice superior
const V_HOMBRO_D = { x: 6, y: 6 } // "hombro" superior derecho
const V_ECTO = { x: 8, y: -6 } // esquina inferior derecha (Ectomorfia)
const V_BASE = { x: 0, y: -8 } // punta de la "v" al centro de la base
const V_ENDO = { x: -8, y: -6 } // esquina inferior izquierda (Endomorfia)
const V_HOMBRO_I = { x: -6, y: 6 } // "hombro" superior izquierdo
const CONTORNO_SOMATOCARTA = [V_MESO, V_HOMBRO_D, V_ECTO, V_BASE, V_ENDO, V_HOMBRO_I]

// Líneas guía: de esquina a esquina real del contorno, cruzando por el centro —
// tal como se ve en la Figura 1 original.
const LINEAS_GUIA: [{ x: number; y: number }, { x: number; y: number }][] = [
  [V_MESO, V_BASE], // vértice superior -> punta de la base
  [V_ENDO, V_HOMBRO_D], // esquina inferior izquierda -> esquina superior derecha
  [V_ECTO, V_HOMBRO_I], // esquina inferior derecha -> esquina superior izquierda
]

const PLOT_W = (X_MAX - X_MIN) * UNIT_X
const PLOT_H = (Y_MAX - Y_MIN) * UNIT_Y
const SVG_W = PLOT_W + PADDING_X * 2
const SVG_H = PLOT_H + PADDING_TOP + PADDING_BOTTOM

function sx(x: number) {
  return PADDING_X + (x - X_MIN) * UNIT_X
}
function sy(y: number) {
  return PADDING_TOP + (Y_MAX - y) * UNIT_Y
}

const COLOR: Record<TipoPunto, string> = {
  atleta: '#E8720C',
  base: '#2563EB',
  escolta: '#DC2626',
  alero: '#16A34A',
  pivot: '#9333EA',
  media: '#0891B2',
  referente: '#794C20',
}

const ETIQUETA_TIPO: Record<TipoPunto, string> = {
  atleta: 'Atleta (tú)',
  base: 'Élite — Base',
  escolta: 'Élite — Escolta',
  alero: 'Élite — Alero',
  pivot: 'Élite — Pívot',
  media: 'Media de la muestra cadete (artículo)',
  referente: 'Jugador referente actual',
}

function Marcador({ tipo, cx, cy, focused, opacity = 1 }: { tipo: TipoPunto; cx: number; cy: number; focused: boolean; opacity?: number }) {
  const color = COLOR[tipo]
  const r = focused ? 8 : 6.5
  const strokeW = focused ? 2.5 : 1.5
  switch (tipo) {
    case 'atleta':
      return <circle cx={cx} cy={cy} r={r} fill={color} stroke="#FAF5EC" strokeWidth={strokeW} opacity={opacity} />
    case 'base':
      return <circle cx={cx} cy={cy} r={r} fill={color} stroke="#FAF5EC" strokeWidth={strokeW} opacity={opacity} />
    case 'escolta':
      return (
        <rect
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
          opacity={opacity}
        />
      )
    case 'alero':
      return (
        <polygon
          points={`${cx},${cy - r - 1} ${cx - r - 1},${cy + r} ${cx + r + 1},${cy + r}`}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
          opacity={opacity}
        />
      )
    case 'pivot':
      return (
        <g opacity={opacity}>
          <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} stroke={color} strokeWidth={strokeW + 1.5} strokeLinecap="round" />
          <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} stroke={color} strokeWidth={strokeW + 1.5} strokeLinecap="round" />
        </g>
      )
    case 'media':
      return (
        <rect
          x={cx - r - 2}
          y={cy - strokeW}
          width={(r + 2) * 2}
          height={strokeW * 2}
          fill={color}
          opacity={opacity}
        />
      )
    case 'referente':
      return (
        <polygon
          points={`${cx},${cy - r - 1} ${cx + r + 1},${cy} ${cx},${cy + r + 1} ${cx - r - 1},${cy}`}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
          opacity={opacity}
        />
      )
  }
}

export default function Somatocarta({ puntos, distancias }: SomatocartaProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activo, setActivo] = useState<string | null>(null)
  const titleId = useId()
  const descId = useId()

  const POSICION_TIPOS: TipoPunto[] = ['base', 'escolta', 'alero', 'pivot']
  const atleta = puntos.find((p) => p.tipo === 'atleta')
  // El punto de élite "destacado" es el de la posición seleccionada (enfasis !== false);
  // las otras 3 posiciones de élite se grafican atenuadas, solo como referencia de la Figura 1.
  const elite = puntos.find((p) => POSICION_TIPOS.includes(p.tipo) && p.enfasis !== false)

  const ticksX = [-8, -6, -4, -2, 0, 2, 4, 6, 8]
  const ticksY = [-8, -4, 0, 4, 8, 12, 16]

  function descargarPNG() {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = SVG_W * scale
      canvas.height = SVG_H * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(scale, scale)
      ctx.fillStyle = '#FAF5EC'
      ctx.fillRect(0, 0, SVG_W, SVG_H)
      // Tamaño destino explícito: el SVG serializado por separado (fuera del DOM
      // y su contenedor) no resuelve su width="100%", así que el navegador le da
      // un tamaño intrínseco distinto al real y drawImage(img, 0, 0) lo dibujaría
      // sin escalar, recortando el gráfico (p. ej. el texto "Mesomorfia").
      ctx.drawImage(img, 0, 0, SVG_W, SVG_H)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (!blob) return
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'somatocarta.png'
        link.click()
        URL.revokeObjectURL(link.href)
      })
    }
    img.src = url
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          height={SVG_H}
          style={{ width: '100%', height: 'auto', maxWidth: SVG_W, minWidth: 320 }}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="mx-auto"
        >
          <title id={titleId}>Somatocarta: posición del atleta frente a referencias de posición</title>
          <desc id={descId}>
            Gráfico triangular con eje X (ectomorfia menos endomorfia) de {X_MIN} a {X_MAX}, y eje Y (el doble de la
            mesomorfia menos la suma de endomorfia y ectomorfia) de {Y_MIN} a {Y_MAX}.{' '}
            {puntos.map((p) => `${ETIQUETA_TIPO[p.tipo]} (${p.label}): X=${p.coords.x.toFixed(2)}, Y=${p.coords.y.toFixed(2)}.`).join(' ')}
          </desc>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="#FAF5EC" />

          {/* Cuadrícula suave */}
          {ticksX.map((t) => (
            <line key={`gx${t}`} x1={sx(t)} y1={PADDING_TOP} x2={sx(t)} y2={PADDING_TOP + PLOT_H} stroke="#1C1814" strokeOpacity={0.06} />
          ))}
          {ticksY.map((t) => (
            <line key={`gy${t}`} x1={PADDING_X} y1={sy(t)} x2={PADDING_X + PLOT_W} y2={sy(t)} stroke="#1C1814" strokeOpacity={0.06} />
          ))}

          {/* Líneas guía de esquina a esquina real del pentágono, cruzando por el
              centro — como en la Figura 1 del artículo. */}
          {LINEAS_GUIA.map(([a, b], i) => (
            <line key={i} x1={sx(a.x)} y1={sy(a.y)} x2={sx(b.x)} y2={sy(b.y)} stroke="#1C1814" strokeOpacity={0.22} strokeDasharray="3 3" />
          ))}

          {/* Contorno real del somatocarta: un pentágono de lados rectos (vértice
              puntiagudo arriba, lados verticales, base plana), como en la Figura 1
              del artículo base. */}
          <polygon
            points={CONTORNO_SOMATOCARTA.map((v) => `${sx(v.x)},${sy(v.y)}`).join(' ')}
            fill="none"
            stroke="#1C1814"
            strokeOpacity={0.4}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* Etiquetas de los vértices */}
          <text x={sx(V_MESO.x)} y={sy(V_MESO.y + 1.4)} textAnchor="middle" className="fill-ink-950" fontSize={13} fontWeight={600}>
            Mesomorfia
          </text>
          <text x={sx(V_ENDO.x) - 4} y={sy(V_ENDO.y - 1.2)} textAnchor="start" className="fill-ink-950" fontSize={13} fontWeight={600}>
            Endomorfia
          </text>
          <text x={sx(V_ECTO.x) + 4} y={sy(V_ECTO.y - 1.2)} textAnchor="end" className="fill-ink-950" fontSize={13} fontWeight={600}>
            Ectomorfia
          </text>

          {/* Ejes: ticks numéricos */}
          {ticksX.map((t) => (
            <text key={`tx${t}`} x={sx(t)} y={PADDING_TOP + PLOT_H + 16} textAnchor="middle" fontSize={9} className="fill-ink-700">
              {t}
            </text>
          ))}
          {ticksY.map((t) => (
            <text key={`ty${t}`} x={PADDING_X - 8} y={sy(t) + 3} textAnchor="end" fontSize={9} className="fill-ink-700">
              {t}
            </text>
          ))}

          {/* Línea de distancia atleta -> élite */}
          {atleta && elite && distancias && (
            <>
              <line
                x1={sx(atleta.coords.x)}
                y1={sy(atleta.coords.y)}
                x2={sx(elite.coords.x)}
                y2={sy(elite.coords.y)}
                stroke="#1C1814"
                strokeOpacity={0.4}
                strokeWidth={1.25}
                strokeDasharray="5 4"
              />
            </>
          )}

          {/* Puntos */}
          {puntos.map((p) => {
            const cx = sx(p.coords.x)
            const cy = sy(p.coords.y)
            const focused = activo === p.id
            return (
              <g
                key={p.id}
                tabIndex={0}
                role="button"
                aria-label={`${ETIQUETA_TIPO[p.tipo]}: ${p.label}. Endomorfia ${p.somatotipo.endomorfia.toFixed(2)}, mesomorfia ${p.somatotipo.mesomorfia.toFixed(2)}, ectomorfia ${p.somatotipo.ectomorfia.toFixed(2)}. Coordenadas X=${p.coords.x.toFixed(2)}, Y=${p.coords.y.toFixed(2)}.`}
                onFocus={() => setActivo(p.id)}
                onBlur={() => setActivo(null)}
                onMouseEnter={() => setActivo(p.id)}
                onMouseLeave={() => setActivo(null)}
                className="cursor-pointer outline-none"
              >
                <Marcador tipo={p.tipo} cx={cx} cy={cy} focused={focused} opacity={p.enfasis === false && !focused ? 0.4 : 1} />
                {focused && (
                  <g>
                    <rect
                      x={cx + 10}
                      y={cy - 34}
                      width={Math.max(140, p.label.length * 6.2)}
                      height={48}
                      fill="#1C1814"
                      opacity={0.95}
                    />
                    <text x={cx + 16} y={cy - 19} fontSize={11} fill="#FAF5EC" fontWeight={600}>
                      {p.label}
                    </text>
                    <text x={cx + 16} y={cy - 6} fontSize={10} fill="#FAF5EC" opacity={0.8}>
                      {`E ${p.somatotipo.endomorfia.toFixed(1)} · M ${p.somatotipo.mesomorfia.toFixed(1)} · Ec ${p.somatotipo.ectomorfia.toFixed(1)}`}
                    </text>
                    <text x={cx + 16} y={cy + 7} fontSize={10} fill="#FAF5EC" opacity={0.8}>
                      {`X ${p.coords.x.toFixed(2)} · Y ${p.coords.y.toFixed(2)}`}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {distancias && atleta && elite && (
        <p className="mx-auto mt-2 max-w-md text-center text-xs leading-relaxed text-ink-700/70">
          Distancia a la élite de la posición — SAD (distancia de actitud somatotípica, en 3D): <strong>{distancias.sad.toFixed(2)}</strong>;
          distancia en el plano X-Y: <strong>{distancias.euclidiana.toFixed(2)}</strong>. Cuanto menor el valor, más parecido es el
          somatotipo del atleta al de la referencia de élite.
        </p>
      )}

      {/* Leyenda */}
      <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-ink-700">
        {(['atleta', 'base', 'escolta', 'alero', 'pivot', 'media', 'referente'] as TipoPunto[]).map(
          (t) =>
            puntos.some((p) => p.tipo === t) && (
              <li key={t} className="flex items-center gap-1.5">
                <svg width={14} height={14} aria-hidden="true">
                  <Marcador tipo={t} cx={7} cy={7} focused={false} />
                </svg>
                {ETIQUETA_TIPO[t]}
              </li>
            ),
        )}
      </ul>

      <div className="mt-4 text-center print:hidden">
        <button
          type="button"
          onClick={descargarPNG}
          className="inline-flex items-center gap-2 border border-ink-900/15 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-wide text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600"
        >
          Descargar gráfica (PNG)
        </button>
      </div>
    </div>
  )
}
