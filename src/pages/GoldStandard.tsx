import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ResponsiveTable from '../components/ResponsiveTable'
import CourtDivider from '../components/CourtDivider'
import Card from '../components/Card'
import CmjBarChart from '../components/CmjBarChart'
import MetodosSalto from '../components/MetodosSalto'
import TablaFuentes from '../components/TablaFuentes'
import { EstadoBadge, NivelBadge } from '../components/GoldBadges'
import {
  criteriosPorVariable,
  erroresSalto,
  evidenciaU15,
  fuentesGS,
  NIVELES,
  sesgosComposicion,
  type NivelEvidencia,
} from '../data/goldStandard.data'

const INDICE = [
  'Qué es un gold standard',
  'Por qué evaluar en U14 es difícil',
  'Qué se evalúa realmente',
  'Evidencia en U15',
  '¿Por qué es difícil medir un salto?',
  'El criterio del salto y los métodos tradicionales',
  'Wearables (IMU)',
  'Gold standard por dominio',
  'Maduración y rendimiento en U14',
  'Fórmula y checklist',
  'Limitaciones y lectura crítica',
  'Referencias',
]

function Bloque({ n, id, children, alt = false }: { n: number; id: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-20 ${alt ? 'bg-court-50/60' : ''}`}>
      <div className="section-shell py-12 sm:py-16">
        <span className="sr-only" id={`${id}-h`}>
          Subsección {n}: {INDICE[n - 1]}
        </span>
        {children}
      </div>
    </section>
  )
}

function Cita({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>
}

const fmt = (n: number, d = 2) => n.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d })

const porNivel = (nivel: NivelEvidencia) => fuentesGS.filter((f) => f.nivel_de_evidencia === nivel).length

export default function GoldStandard() {
  const referenciasOrdenadas = [...fuentesGS].sort((a, b) => a.fuente.localeCompare(b.fuente, 'es'))

  return (
    <div>
      <PageHeader
        number="11"
        kicker="Sección 11 · Gold standard"
        title="Gold standard: medir bien para evaluar mejor"
        lead="Qué significa tener un criterio de referencia para cada medición, por qué importa tanto en jugadores U14 y qué dice la evidencia disponible, con sus límites."
      />

      {/* Índice */}
      <section className="section-shell pt-10 sm:pt-14" aria-labelledby="gs-indice">
        <h2 id="gs-indice" className="kicker mb-3">
          En este apartado
        </h2>
        <ol className="grid gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
          {INDICE.map((t, i) => (
            <li key={t} className="bg-paper">
              <a
                href={`#gs-${i + 1}`}
                className="flex items-baseline gap-3 px-4 py-3 text-sm text-ink-800 transition-colors hover:bg-white hover:text-accent-600"
              >
                <span className="font-jersey text-xl text-ink-900/30">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-700">
          Este apartado complementa a{' '}
          <Link to="/desarrollo-juvenil" className="text-accent-600 underline underline-offset-2">
            Desarrollo juvenil
          </Link>{' '}
          (maduración biológica) y a{' '}
          <Link to="/deteccion-talento" className="text-accent-600 underline underline-offset-2">
            Detección de talento
          </Link>{' '}
          (baterías por edad): aquí se mira con qué precisión se miden esas pruebas.
        </p>
      </section>

      {/* 1 */}
      <Bloque n={1} id="gs-1">
        <SectionHeader
          eyebrow="01 · Introducción"
          title="¿Qué es un gold standard?"
          lead="Es el criterio de referencia contra el que se valida un método práctico: se mide a las mismas personas con ambos y se revisa cuánto se aleja el método simple del de referencia."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Card accent className="min-w-0">
            <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">No existe un único gold standard</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              El título de este apartado es una convención: aquí «gold standard» significa <b>el criterio de referencia
              aceptado para esa variable en ese estudio</b>. Cambia según lo que se mida y quién lo estudie, y hasta la
              revisión sistemática más reciente en adolescentes atletas señala que los métodos de laboratorio se tratan
              como referencia aunque su precisión y relevancia en esta población son discutibles (Poureghbali et al.,
              2026).
            </p>
          </Card>
          <div className="min-w-0">
          <ResponsiveTable headers={['Variable', 'Criterio usado en las fuentes', 'Dónde']} caption="Criterio de referencia usado para cada variable en las fuentes de este apartado">
            {criteriosPorVariable.map((c) => (
              <tr key={c.variable} className="border-t border-ink-900/10 align-top odd:bg-ink-950/[0.02]">
                <th scope="row" className="px-4 py-3 text-left font-semibold text-ink-950">
                  {c.variable}
                </th>
                <td className="px-4 py-3 text-ink-700">{c.criterios}</td>
                <td className="px-4 py-3 text-xs text-ink-400">{c.fuentes}</td>
              </tr>
            ))}
          </ResponsiveTable>
          </div>
        </div>
      </Bloque>

      <CourtDivider />

      {/* 2 */}
      <Bloque n={2} id="gs-2">
        <SectionHeader
          eyebrow="02 · Contexto"
          title="Por qué evaluar en U14 es difícil: dos trampas"
          lead="En la adolescencia temprana, la edad del calendario dice poco sobre el cuerpo del jugador. Dos sesgos aparecen una y otra vez."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <p className="font-jersey text-3xl text-ink-900/20">Trampa 1</p>
            <h3 className="mt-1 font-display text-lg uppercase tracking-tight text-ink-950">Efecto de la edad relativa</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              En un mismo grupo, quienes nacieron en los primeros meses del año tienen unos meses más de crecimiento y
              práctica, y suelen estar sobrerrepresentados entre los seleccionados. Ese pequeño adelanto puede pesar más
              que el talento.
            </p>
          </Card>
          <Card>
            <p className="font-jersey text-3xl text-ink-900/20">Trampa 2</p>
            <h3 className="mt-1 font-display text-lg uppercase tracking-tight text-ink-950">Maduración biológica</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              El pico de velocidad de crecimiento (APHV) no llega a la misma edad en todos. Quien lo alcanza antes se ve
              más alto y fuerte durante un tiempo, aunque eso no garantice mejor rendimiento a largo plazo. Más detalle
              en{' '}
              <Link to="/desarrollo-juvenil" className="text-accent-600 underline underline-offset-2">
                Desarrollo juvenil
              </Link>
              .
            </p>
          </Card>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-700">
          <b>Lo que muestra la evidencia:</b> en el torneo de selección de la sub-15 alemana se confirmó un sesgo hacia
          jugadores nacidos temprano y de maduración temprana (<Cita>Leyhr et al., 2024</Cita>), y en jugadores de 13 a 14
          años el maturity offset fue el mejor predictor del rendimiento (<Cita>Torres-Unda et al., 2016</Cita>). De ahí
          la idea del PDF de apoyo: en U14, con frecuencia las decisiones reflejan quién maduró primero y no quién tiene
          más potencial. Es una advertencia razonable, pero conviene leerla como orientación, no como regla.
        </p>
      </Bloque>

      <CourtDivider />

      {/* 3 */}
      <Bloque n={3} id="gs-3">
        <SectionHeader eyebrow="03 · Qué medir" title="Los tres pilares de la evaluación" />
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'Antropometría',
              d: 'Altura, peso y envergadura. Describen el tamaño del jugador, pero también heredan el efecto de la maduración.',
            },
            {
              t: 'Maduración',
              d: 'Maturity offset (años respecto del APHV) y edad somática frente a cronológica. Se estima a partir de la altura sentado y la longitud de las piernas, con un margen de error amplio.',
            },
            {
              t: 'Rendimiento motor',
              d: 'Saltos verticales, sprint lineal de 20 m y agilidad modificada. Son las pruebas de campo más usadas en la batería de 13 a 15 años (ver Detección de talento).',
            },
          ].map((p, i) => (
            <li key={p.t} className="flex gap-4 border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink-950 font-display text-accent-500">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display uppercase tracking-tight text-ink-950">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Bloque>

      <CourtDivider />

      {/* 4 */}
      <Bloque n={4} id="gs-4">
        <SectionHeader
          eyebrow="04 · Evidencia"
          title="U15: seleccionados frente a no seleccionados"
          lead="Una comparación en jugadores de unos 14 años ayuda a ver cuánto pesan el tamaño y la maduración en las decisiones de selección."
        />
        <p className="mb-4 border-l-[3px] border-accent-500 bg-white/60 p-4 text-sm leading-relaxed text-ink-700">
          <b>Qué está verificado y qué no.</b> El estudio de Leyhr et al. (2024) evaluó a 68 varones (27 seleccionados y
          41 no seleccionados; 14,39 ± 0,28 años) en el torneo inicial de selección de la sub-15 alemana. {evidenciaU15.nota}
        </p>

        <ResponsiveTable
          headers={['Variable', 'Seleccionados', 'No seleccionados', 'Diferencia']}
          caption="Antropometría y maduración de jugadores U15 seleccionados y no seleccionados, según el PDF de apoyo"
        >
          {evidenciaU15.antropometria.map((a) => (
            <tr key={a.variable} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
              <th scope="row" className="px-4 py-3 text-left font-semibold text-ink-950">
                {a.variable} <span className="font-normal text-ink-400">({a.unidad})</span>
              </th>
              <td className="px-4 py-3 tabular-nums">{fmt(a.sel)}</td>
              <td className="px-4 py-3 tabular-nums">{fmt(a.nosel)}</td>
              <td className="px-4 py-3 font-semibold tabular-nums text-accent-700">{a.dif}</td>
            </tr>
          ))}
        </ResponsiveTable>

        <h3 className="mb-3 mt-10 font-display text-lg uppercase tracking-tight text-ink-950">Pruebas motoras</h3>
        <CmjBarChart />

        <div className="mt-6">
          <ResponsiveTable
            headers={['Prueba', 'Seleccionados', 'No seleccionados', 'Lectura']}
            caption="Tabla de datos equivalente al gráfico: resultados motores de seleccionados y no seleccionados"
          >
            {evidenciaU15.motoras.map((m) => (
              <tr key={m.id} className="border-t border-ink-900/10 align-top odd:bg-ink-950/[0.02]">
                <th scope="row" className="px-4 py-3 text-left font-semibold text-ink-950">
                  {m.variable} <span className="font-normal text-ink-400">({m.unidad})</span>
                </th>
                <td className="px-4 py-3 tabular-nums">{fmt(m.sel)}</td>
                <td className="px-4 py-3 tabular-nums">{fmt(m.nosel)}</td>
                <td className="px-4 py-3 text-ink-700">{m.lectura}</td>
              </tr>
            ))}
          </ResponsiveTable>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card accent>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Cómo leer el CMJ aquí</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              El PDF de apoyo presenta el CMJ como la prueba «definitiva». El dato disponible es más matizado: fue la
              única prueba motora que separó a los grupos (2,68 cm), pero el PDF no informa valor p, tamaño del efecto ni
              n, y en el estudio original, al controlar por edad relativa y maduración, las variables motoras ya no
              discriminaron la selección.
            </p>
          </Card>
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Sprint y agilidad: diferencias pequeñas</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Las diferencias de 0,03 s en sprint y 0,02 s en agilidad son diminutas. Otros estudios con jugadores U14
              sí encontraron que la velocidad y la agilidad distinguían a los equipos mejor clasificados (Ramos et al.,
              2020), así que ninguna prueba debería leerse sola.
            </p>
          </Card>
        </div>
      </Bloque>

      <CourtDivider />

      {/* 5 */}
      <Bloque n={5} id="gs-5">
        <SectionHeader
          eyebrow="05 · Medición"
          title="¿Por qué es difícil medir un salto?"
          lead="Hay cuatro maneras de estimar la altura. Cada una parte de una física distinta y arrastra un tipo de error distinto."
        />
        <MetodosSalto />
        <p className="mt-4 text-xs text-ink-400">
          Las ecuaciones son relaciones estándar de cinemática e impulso-momento; no se atribuyen a un estudio concreto
          (g = 9,81 m/s²; t = tiempo de vuelo; m = masa corporal; F = fuerza vertical).
        </p>
      </Bloque>

      <CourtDivider />

      {/* 6 */}
      <Bloque n={6} id="gs-6">
        <SectionHeader
          eyebrow="06 · Criterio y métodos tradicionales"
          title="El criterio del salto y el problema del palo de medición y el video"
          lead="Según el PDF de apoyo, los sistemas de tiempo de vuelo directo (barras ópticas) y las plataformas de fuerza son la referencia. Los métodos tradicionales se alejan más de ella."
        />
        <ResponsiveTable
          headers={['Sistema', 'Uso', 'Error reportado', 'Tipo de error', 'Limitación']}
          caption="Comparación de errores de medición del salto según el PDF de apoyo"
        >
          {erroresSalto.map((e) => (
            <tr key={e.sistema} className="border-t border-ink-900/10 align-top odd:bg-ink-950/[0.02]">
              <th scope="row" className="px-4 py-3 text-left font-semibold text-ink-950">
                {e.sistema}
              </th>
              <td className="px-4 py-3 text-ink-700">{e.uso}</td>
              <td className="whitespace-nowrap px-4 py-3 font-display text-accent-700">{e.error}</td>
              <td className="px-4 py-3 text-ink-700">{e.tipoError}</td>
              <td className="px-4 py-3 text-ink-700">{e.limitacion}</td>
            </tr>
          ))}
        </ResponsiveTable>
        <div className="mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-ink-700">
          <p>
            <b>Lectura prudente.</b> Estas cifras provienen del PDF de apoyo y no se pudo identificar el estudio primario
            que las reporta; por eso aparecen como cifras atribuidas, no como datos propios. El sTEE es un error típico
            estandarizado (sin unidades), pero su definición exacta en esa fuente sigue pendiente de confirmar. Además,
            sTEE y sesgo en centímetros son medidas distintas y no se comparan entre sí.
          </p>
          <p>
            Una frase como «tecnología obsoleta» o «estándar de oro absoluto» sobra: lo útil es el número. Un error de
            0,35 frente a 0,10–0,13 significa más ruido en la medición, algo que importa sobre todo cuando se comparan
            jugadores con diferencias de pocos centímetros.
          </p>
        </div>
      </Bloque>

      <CourtDivider />

      {/* 7 */}
      <Bloque n={7} id="gs-7">
        <SectionHeader
          eyebrow="07 · Wearables"
          title="IMU: útiles, pero no para selección sin corrección"
          lead="Los sensores inerciales (por ejemplo Kinexon en un arnés entre las escápulas o Vert en una banda lumbar) sirven para seguir la carga diaria. Sus datos crudos de altura requieren cautela."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card accent>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Lo que dice el PDF</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Sobrestiman la altura de salto en unos 8,5 a 9,4 cm frente al criterio de referencia. Fuente primaria en
              verificación.
            </p>
          </Card>
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">VERT contra video</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              En 46 jóvenes basquetbolistas, VERT Classic coincidió con el conteo de saltos por video (ICC = 0,958 para
              saltos de más de 15 cm). Valida el <b>conteo</b>, no la altura, y el criterio fue el video, no la plataforma
              de fuerza (Benson et al., 2020).
            </p>
          </Card>
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Sensor MARG contra plataforma</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              En 54 basquetbolistas de élite el sesgo medio fue menor de 3 %: muy buena correlación para la potencia
              (r = 0,95) pero solo r = 0,65 para la <b>altura</b> (Staunton et al., 2021). Es la nota que matiza el mensaje
              «los wearables sirven».
            </p>
          </Card>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-700">
          Las tres afirmaciones son distintas (otro dispositivo, otro criterio, otra variable) y no deben fundirse en una
          sola. En conjunto: buenos para tendencias y conteos; para decidir la selección de un jugador, conviene medir el
          salto con el criterio de referencia.
        </p>
      </Bloque>

      <CourtDivider />

      {/* 8 */}
      <Bloque n={8} id="gs-8">
        <SectionHeader
          eyebrow="08 · Por dominio"
          title="Gold standard por dominio"
          lead="Las fuentes se agrupan en tres dominios. Cada fila de la tabla indica su población, n, criterio, nivel de evidencia y estado de verificación."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Composición corporal</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              El método cambia el resultado: según el metaanálisis de Sansone et al. (2022), el DXA da valores de grasa
              más altos que la BIA y los pliegues. Los criterios de referencia usados son varios (DXA, pesaje hidrostático,
              pletismografía de aire).
            </p>
          </Card>
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Capacidad aeróbica</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              El criterio es el VO₂máx medido con analizador de gases. En 34 jóvenes basquetbolistas (unos 15,7 años) el
              test de 20 m de ida y vuelta lo subestimó (48,91 frente a 55,45 ml/kg/min) y no se consideró apropiado
              (Stojanović et al., 2016). El estudio en silla de ruedas (n = 7) no se extrapola a U14. Ver{' '}
              <Link to="/demandas" className="text-accent-600 underline underline-offset-2">
                Demandas
              </Link>
              .
            </p>
          </Card>
          <Card>
            <h3 className="font-display uppercase tracking-tight text-ink-950">Salto y carga externa</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Altura y potencia se comparan con plataformas de fuerza; desplazamiento y posición, con cintas o líneas de
              la cancha. Los sistemas de posicionamiento son buenos en distancia, pero los errores de tiempo pueden ser
              grandes para pruebas que exigen precisión (Colino et al., 2019, deportes de cancha en general).
            </p>
          </Card>
        </div>

        <h3 className="mb-3 mt-10 font-display text-lg uppercase tracking-tight text-ink-950">
          Composición corporal: método, criterio y dirección del sesgo
        </h3>
        <ResponsiveTable
          headers={['Método evaluado', 'Criterio de referencia', 'Dirección del sesgo', 'Población', 'Fuente']}
          caption="Método evaluado, criterio de referencia y dirección del sesgo en composición corporal"
        >
          {sesgosComposicion.map((s) => (
            <tr key={s.fuenteId} className="border-t border-ink-900/10 align-top odd:bg-ink-950/[0.02]">
              <th scope="row" className="px-4 py-3 text-left font-semibold text-ink-950">
                {s.metodo}
              </th>
              <td className="px-4 py-3 text-ink-700">{s.criterio}</td>
              <td className="px-4 py-3 text-ink-700">{s.direccion}</td>
              <td className="px-4 py-3 text-ink-700">{s.poblacion}</td>
              <td className="px-4 py-3 text-xs text-ink-400">N.º {s.fuenteId}</td>
            </tr>
          ))}
        </ResponsiveTable>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700">
          No hay un veredicto único: con DXA como referencia, la BIA y los pliegues subestiman la grasa; con
          pletismografía como referencia, el DXA es quien subestima. Casi todas estas poblaciones son universitarias o de
          otros deportes, así que no se trasladan directamente a jugadores U14. La{' '}
          <Link to="/calculadora-somatotipo" className="text-accent-600 underline underline-offset-2">
            calculadora de somatotipo
          </Link>{' '}
          usa pliegues, que aquí aparecen con error frente a DXA.
        </p>

        <h3 className="mb-3 mt-10 font-display text-lg uppercase tracking-tight text-ink-950">Todas las fuentes</h3>
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-ink-700" aria-label="Criterios de nivel de evidencia">
          {(Object.keys(NIVELES) as NivelEvidencia[]).map((n) => (
            <span key={n} className="flex items-center gap-2 border border-ink-900/10 bg-white/60 px-2 py-1">
              <NivelBadge nivel={n} />
              {porNivel(n)} fuentes · {NIVELES[n].criterio}
            </span>
          ))}
        </div>
        <TablaFuentes />
      </Bloque>

      <CourtDivider />

      {/* 9 */}
      <Bloque n={9} id="gs-9">
        <SectionHeader
          eyebrow="09 · U14"
          title="Maduración y rendimiento en U14"
          lead="Estos estudios no validan instrumentos de medición; describen cómo se relacionan la maduración y el rendimiento en jóvenes basquetbolistas."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              t: 'Fragoso et al., 2021 · U-14 élite portugueses',
              d: 'La maduración afectó atributos morfológicos y la fuerza. El resto de los hallazgos aportados por el equipo (composición corporal y potencia de salto) siguen en verificación.',
            },
            {
              t: 'Ramos et al., 2020 · equipos regionales U-14',
              d: 'En varones, los equipos finalistas fueron más rápidos, más ágiles y con menos grasa que los de menor clasificación.',
            },
            {
              t: 'Ramos et al., 2021 · 416 jugadores U-14',
              d: 'En varones, la talla, la fuerza de agarre, la agilidad y el CMJ predijeron el rendimiento por minuto; en mujeres, el maturity offset, la experiencia y la agilidad.',
            },
            {
              t: 'Torres-Unda et al., 2016 · 13 a 14 años',
              d: 'El maturity offset fue el mejor predictor del rendimiento; los nacidos en la segunda mitad del año y los de maduración tardía podrían quedar relegados.',
            },
            {
              t: 'Arede et al., 2021 · U-13 y U-15 (n = 185)',
              d: 'Las pruebas físicas se asociaron con las estadísticas de juego en la mayoría de los grupos; las diferencias de maduración fueron mayores en U-13 que en U-15.',
            },
            {
              t: 'Leyhr et al., 2024 · selección sub-15',
              d: 'Sesgo hacia nacidos y maduradores tempranos; de las pruebas motoras, solo el CMJ separó a los grupos, y esa diferencia no se sostuvo al ajustar por edad relativa y maduración.',
            },
          ].map((c) => (
            <Card key={c.t}>
              <h3 className="font-display text-base uppercase tracking-tight text-ink-950">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{c.d}</p>
            </Card>
          ))}
        </div>
        <Card accent className="mt-6">
          <h3 className="font-display uppercase tracking-tight text-ink-950">Una tensión que conviene decir en voz alta</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            El PDF afirma que el CMJ aísla la capacidad atlética de la ventaja de ser más alto. Pero el salto también
            está influido por la maduración: al ajustar por maduración y edad relativa, el CMJ del estudio de Leyhr et al.
            dejó de discriminar la selección. Por eso la fórmula del PDF exige <b>ajustar por maduración</b> y no leer el
            salto como un talento «puro».
          </p>
        </Card>
      </Bloque>

      <CourtDivider />

      {/* 10 */}
      <Bloque n={10} id="gs-10">
        <SectionHeader eyebrow="10 · Síntesis" title="Fórmula de la evaluación U14 y checklist" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="bg-ink-950 p-6 text-paper sm:p-8">
            <p className="kicker">Fórmula del PDF de apoyo</p>
            <p className="mt-3 font-display text-xl uppercase leading-snug sm:text-2xl">
              Métricas ajustadas por maduración <span className="text-accent-500">+</span> salto medido con criterio
              directo <span className="text-accent-500">=</span> lectura más informativa del talento
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              El PDF concluye que un jugador alto de maduración temprana y salto promedio tiene «mucho menos potencial a
              largo plazo» que uno de maduración tardía con salto explosivo verificado. Es una interpretación del PDF:
              no se encontró un estudio longitudinal que la respalde, por lo que aquí se usa solo como hipótesis de
              trabajo.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">Checklist para entrenadores y academias</h3>
            <ol className="mt-4 space-y-4">
              {[
                {
                  t: 'Medir la maduración',
                  d: 'Estima el maturity offset y úsalo junto con la talla. Es una estimación con margen de error: sirve para contextualizar, no para descartar a nadie.',
                },
                {
                  t: 'Leer el CMJ con la maduración, sin dejar de lado el sprint y la agilidad',
                  d: 'El PDF prioriza el CMJ; la evidencia U14 muestra que velocidad y agilidad también aportan. Combina las tres.',
                },
                {
                  t: 'Invertir en precisión donde importa',
                  d: 'Para pruebas oficiales, tiempo de vuelo directo o plataforma; para el entrenamiento diario, wearables. Si buscas exactitud, evita el palo de medición.',
                },
              ].map((c, i) => (
                <li key={c.t} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-accent-500 text-accent-600"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">
                      <span className="sr-only">Punto {i + 1}: </span>
                      {c.t}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">{c.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Bloque>

      <CourtDivider />

      {/* 11 */}
      <Bloque n={11} id="gs-11">
        <SectionHeader
          eyebrow="11 · Lectura crítica"
          title="Limitaciones y lectura crítica"
          lead="Antes de usar estos datos, conviene tener presente lo siguiente."
        />
        <details open className="border border-ink-900/10 bg-white/60 p-5 shadow-card sm:p-6">
          <summary className="cursor-pointer font-display text-sm uppercase tracking-wide text-ink-950">
            Doce advertencias sobre este apartado
          </summary>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-700">
            <li>No existe un único gold standard: depende de la variable y del estudio.</li>
            <li>
              En composición corporal los hallazgos se contradicen según el criterio de referencia; no se emite un
              veredicto único.
            </li>
            <li>
              Varias fuentes no son de U14: universitarias (n.º 6), NCAA División I (n.º 7 y 8), silla de ruedas con n = 7
              (n.º 10) y deportes de cancha en general (n.º 14).
            </li>
            <li>
              Los estudios de salto usan criterios distintos (plataforma, video, cinta); sus resultados no se funden en
              una sola conclusión. El sensor MARG tuvo buena potencia (r = 0,95) pero solo r = 0,65 en altura.
            </li>
            <li>El CMJ también está afectado por la maduración; por eso se pide ajustarlo.</li>
            <li>
              La «diferencia crítica» del CMJ (2,68 cm) no trae valor p, tamaño del efecto ni n en el PDF; se atribuye al
              PDF y al estudio original, sin presentarla como prueba definitiva.
            </li>
            <li>La afirmación sobre «mucho menos potencial a largo plazo» es una interpretación del PDF sin respaldo longitudinal.</li>
            <li>
              Las cifras de la sub-15 alemana vienen del PDF, que cita a «Leyhr et al.»; el resumen del estudio (en
              baloncesto, n = 68) confirmó los autores y el diseño, pero no esos números.
            </li>
            <li>Las fuentes n.º 7 y 8 son actas de congreso (resúmenes), de nivel limitado.</li>
            <li>
              Hay referencias con autores, iniciales, año o n sin confirmar; se marcan como «referencia en verificación» y
              se listan en la tabla de fuentes.
            </li>
            <li>
              El tono del PDF («tecnología obsoleta», «estándar de oro absoluto», «sin margen para la subjetividad») es
              retórico; aquí se reemplaza por la cifra de error correspondiente.
            </li>
            <li>
              Los valores sTEE (0,10–0,13; 0,35; hasta 1,31) y el sesgo de 8,5–9,4 cm de los IMU provienen del PDF y su
              estudio primario no pudo identificarse.
            </li>
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-ink-700">
            Este apartado es una guía de lectura para orientar la evaluación y el desarrollo de los jugadores. No
            establece criterios de selección ni de descarte.
          </p>
        </details>
      </Bloque>

      <CourtDivider />

      {/* 12 */}
      <Bloque n={12} id="gs-12" alt>
        <SectionHeader
          eyebrow="12 · Referencias"
          title="Referencias de este apartado"
          lead="APA 7, en orden alfabético. Las marcadas «referencia en verificación» tienen datos de autoría, año o muestra por confirmar. La lista general del sitio está en Referencias."
        />
        <ol className="space-y-4">
          {referenciasOrdenadas.map((f) => (
            <li key={f.id} className="border border-ink-900/10 bg-white/60 p-4 text-sm leading-relaxed text-ink-800">
              <p>
                {f.fuente}{' '}
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="break-all text-accent-600 underline decoration-accent-500/40 underline-offset-2 hover:text-accent-500"
                >
                  {f.url}
                </a>
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <NivelBadge nivel={f.nivel_de_evidencia} />
                <EstadoBadge fuente={f} />
                <span className="text-xs text-ink-400">Consulta: {f.fecha_de_consulta}</span>
              </div>
              {f.pendiente.length > 0 && (
                <details className="mt-2 text-xs text-ink-700">
                  <summary className="cursor-pointer text-ink-800">Pendiente por confirmar ({f.pendiente.length})</summary>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {f.pendiente.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-700">
          <Link to="/referencias" className="text-accent-600 underline underline-offset-2">
            Ver la lista completa de referencias del sitio
          </Link>
        </p>
      </Bloque>
    </div>
  )
}
