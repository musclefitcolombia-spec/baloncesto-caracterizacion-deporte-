import { useId, useRef, useState } from 'react'
import type { CoordenadasSomatocarta, Somatotipo } from '../lib/somatotipo'

export type TipoPunto = 'atleta' | 'elite' | 'referente' | 'media'

export interface PuntoSomatocarta {
  id: string
  tipo: TipoPunto
  label: string
  somatotipo: Somatotipo
  coords: CoordenadasSomatocarta
  detalle?: string
}

export interface ZonaIncertidumbre {
  centro: CoordenadasSomatocarta
  /** semieje X e Y de la elipse de incertidumbre, en unidades de somatotipo. */
  radioX: number
  radioY: number
}

interface SomatocartaProps {
  puntos: PuntoSomatocarta[]
  zonaIncertidumbre?: ZonaIncertidumbre
  /** Si se da, dibuja una línea discontinua del punto "atleta" al punto "elite" con las distancias. */
  distancias?: { sad: number; euclidiana: number } | null
}

const X_MIN = -8
const X_MAX = 8
const Y_MIN = -8
const Y_MAX = 16
const UNIT = 18
const PADDING_X = 64
const PADDING_TOP = 36
const PADDING_BOTTOM = 56

// Vértices del contorno del somatocarta (triángulo de Reuleaux: lados curvos, no
// rectos), estimados a partir de la Figura 1 del artículo base. Los puntos de
// control de cada curva se desplazan hacia afuera del centroide del triángulo recto
// para lograr el lado abombado característico de esta gráfica.
const V_MESO = { x: 0, y: 13 }
const V_ECTO = { x: 8, y: -7 }
const V_ENDO = { x: -8, y: -7 }
const CENTROIDE = {
  x: (V_MESO.x + V_ECTO.x + V_ENDO.x) / 3,
  y: (V_MESO.y + V_ECTO.y + V_ENDO.y) / 3,
}
function puntoControl(a: { x: number; y: number }, b: { x: number; y: number }, factor = 0.4) {
  const medio = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  return { x: medio.x + (medio.x - CENTROIDE.x) * factor, y: medio.y + (medio.y - CENTROIDE.y) * factor }
}
const C_MESO_ECTO = puntoControl(V_MESO, V_ECTO)
const C_ECTO_ENDO = puntoControl(V_ECTO, V_ENDO)
const C_ENDO_MESO = puntoControl(V_ENDO, V_MESO)

const PLOT_W = (X_MAX - X_MIN) * UNIT
const PLOT_H = (Y_MAX - Y_MIN) * UNIT
const SVG_W = PLOT_W + PADDING_X * 2
const SVG_H = PLOT_H + PADDING_TOP + PADDING_BOTTOM

function sx(x: number) {
  return PADDING_X + (x - X_MIN) * UNIT
}
function sy(y: number) {
  return PADDING_TOP + (Y_MAX - y) * UNIT
}

const COLOR: Record<TipoPunto, string> = {
  atleta: '#E8720C',
  elite: '#1C1814',
  referente: '#794C20',
  media: '#976127',
}

const ETIQUETA_TIPO: Record<TipoPunto, string> = {
  atleta: 'Atleta',
  elite: 'Élite de la posición',
  referente: 'Jugador referente actual',
  media: 'Media cadete (artículo)',
}

function Marcador({ tipo, cx, cy, focused }: { tipo: TipoPunto; cx: number; cy: number; focused: boolean }) {
  const color = COLOR[tipo]
  const r = focused ? 8 : 6.5
  const strokeW = focused ? 2.5 : 1.5
  switch (tipo) {
    case 'atleta':
      return <circle cx={cx} cy={cy} r={r} fill={color} stroke="#FAF5EC" strokeWidth={strokeW} />
    case 'elite':
      return (
        <rect
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
        />
      )
    case 'referente':
      return (
        <polygon
          points={`${cx},${cy - r - 1} ${cx - r - 1},${cy + r} ${cx + r + 1},${cy + r}`}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
        />
      )
    case 'media':
      return (
        <polygon
          points={`${cx},${cy - r - 1} ${cx + r + 1},${cy} ${cx},${cy + r + 1} ${cx - r - 1},${cy}`}
          fill={color}
          stroke="#FAF5EC"
          strokeWidth={strokeW}
        />
      )
  }
}

export default function Somatocarta({ puntos, zonaIncertidumbre, distancias }: SomatocartaProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [activo, setActivo] = useState<string | null>(null)
  const titleId = useId()
  const descId = useId()

  const atleta = puntos.find((p) => p.tipo === 'atleta')
  const elite = puntos.find((p) => p.tipo === 'elite')

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
      ctx.drawImage(img, 0, 0)
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
          width="100%"
          style={{ maxWidth: SVG_W, minWidth: 320 }}
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

          {/* Líneas guía centrales */}
          {/* Líneas guía desde el centro a cada vértice, como en la Figura 1 del artículo
              (ahí se ven como un asterisco, no como una simple cruz). */}
          <line x1={sx(0)} y1={sy(0)} x2={sx(V_MESO.x)} y2={sy(V_MESO.y)} stroke="#1C1814" strokeOpacity={0.18} strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(V_ENDO.x)} y2={sy(V_ENDO.y)} stroke="#1C1814" strokeOpacity={0.18} strokeDasharray="3 3" />
          <line x1={sx(0)} y1={sy(0)} x2={sx(V_ECTO.x)} y2={sy(V_ECTO.y)} stroke="#1C1814" strokeOpacity={0.18} strokeDasharray="3 3" />

          {/* Contorno del somatocarta clásico: un "triángulo de Reuleaux" (lados curvos,
              no rectos) — así es como se ve realmente en la Figura 1 del artículo base,
              no como un triángulo de lados rectos. Vértices aproximados a partir de esa
              figura; curvas de Bézier cuadráticas con el punto de control desplazado hacia
              afuera del centroide para lograr el abombado característico de cada lado. */}
          <path
            d={`M ${sx(V_MESO.x)} ${sy(V_MESO.y)} Q ${sx(C_MESO_ECTO.x)} ${sy(C_MESO_ECTO.y)} ${sx(V_ECTO.x)} ${sy(V_ECTO.y)} Q ${sx(C_ECTO_ENDO.x)} ${sy(C_ECTO_ENDO.y)} ${sx(V_ENDO.x)} ${sy(V_ENDO.y)} Q ${sx(C_ENDO_MESO.x)} ${sy(C_ENDO_MESO.y)} ${sx(V_MESO.x)} ${sy(V_MESO.y)} Z`}
            fill="none"
            stroke="#1C1814"
            strokeOpacity={0.35}
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

          {/* Zona de incertidumbre (modo rápido) */}
          {zonaIncertidumbre && (
            <ellipse
              cx={sx(zonaIncertidumbre.centro.x)}
              cy={sy(zonaIncertidumbre.centro.y)}
              rx={zonaIncertidumbre.radioX * UNIT}
              ry={zonaIncertidumbre.radioY * UNIT}
              fill="#E8720C"
              fillOpacity={0.12}
              stroke="#E8720C"
              strokeOpacity={0.5}
              strokeDasharray="4 3"
            />
          )}

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
                <Marcador tipo={p.tipo} cx={cx} cy={cy} focused={focused} />
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
        {(['atleta', 'elite', 'referente', 'media'] as TipoPunto[]).map(
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
        {zonaIncertidumbre && (
          <li className="flex items-center gap-1.5">
            <span className="h-3 w-5 border border-dashed border-accent-500 bg-accent-500/15" aria-hidden="true" />
            Zona de incertidumbre (modo rápido)
          </li>
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
