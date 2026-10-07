import { useEffect, useId, useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ResponsiveTable from '../components/ResponsiveTable'
import CourtDivider from '../components/CourtDivider'
import Somatocarta, { type PuntoSomatocarta } from '../components/Somatocarta'
import {
  calcularEctomorfia,
  calcularEndomorfia,
  calcularMesomorfia,
  clasificarCategoria,
  coordenadasSomatocarta,
  distanciaEuclidiana,
  distanciaSAD,
  type Somatotipo,
} from '../lib/somatotipo'
import {
  ajustePosicion,
  aspectosAMejorar,
  estimarTallaAdulta,
  orientacionOtroDeporte,
  posicionMasAfin,
  type ComparacionVariable,
} from '../lib/recomendaciones'
import {
  jugadorReferentePorPosicion,
  muestraCadetePorPosicion,
  muestraCadeteTotal,
  NOMBRES_POSICION,
  somatotipoElitePorPosicion,
  EDAD_MUESTRA_VALIDA,
  type PosicionId,
} from '../data/somatotipo-referencias'

const POSICIONES: PosicionId[] = ['base', 'escolta', 'alero', 'ala-pivot', 'pivot']

interface FormState {
  edad: string
  talla: string
  peso: string
  envergadura: string
  posicion: PosicionId
  sexo: 'masculino' | 'femenino'
  // ISAK
  triceps: string
  subescapular: string
  supraespinal: string
  piernaMedial: string
  humero: string
  femur: string
  perimetroBrazo: string
  perimetroPierna: string
  // Contexto
  tallaMadre: string
  tallaPadre: string
}

const FORM_INICIAL: FormState = {
  edad: '',
  talla: '',
  peso: '',
  envergadura: '',
  posicion: 'base',
  sexo: 'masculino',
  triceps: '',
  subescapular: '',
  supraespinal: '',
  piernaMedial: '',
  humero: '',
  femur: '',
  perimetroBrazo: '',
  perimetroPierna: '',
  tallaMadre: '',
  tallaPadre: '',
}

// Datos de ejemplo para probar la calculadora de un clic: los valores medios de la
// posición Pívot, Tabla 1 del artículo base (Abella del Campo et al., 2016) —
// edad, talla, peso, envergadura y las 8 medidas ISAK (pliegues, diámetros y
// perímetros). Son datos reales y citados, no inventados para la demostración.
const EJEMPLO_PIVOT: Partial<FormState> = {
  edad: '15.40',
  talla: '193.60',
  peso: '85.36',
  envergadura: '197.40',
  posicion: 'pivot',
  sexo: 'masculino',
  triceps: '13.42',
  subescapular: '10.60',
  supraespinal: '10.66',
  piernaMedial: '12.90',
  humero: '7.26',
  femur: '9.94',
  perimetroBrazo: '31.46',
  perimetroPierna: '39.14',
}

// Rangos fisiológicos plausibles para la validación (§3). No son límites clínicos
// estrictos, solo una red de seguridad contra errores de digitación.
const RANGOS = {
  edad: [10, 40] as [number, number],
  talla: [120, 230] as [number, number],
  peso: [25, 200] as [number, number],
  envergadura: [120, 250] as [number, number],
  pliegue: [2, 60] as [number, number],
  diametro: [3, 12] as [number, number],
  perimetro: [15, 55] as [number, number],
  tallaPadres: [120, 220] as [number, number],
}

function numero(v: string): number | null {
  if (v.trim() === '') return null
  const n = Number(v.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

interface Resultado {
  modo: 'completo' | 'rapido'
  somatotipo: Somatotipo
  categoria: string | null
  hwr: number
  imc: number
  indiceEnvergaduraTalla: number
  sumaPliegues: number | null
  coords: { x: number; y: number }
  comparaciones: ComparacionVariable[]
  fuenteComparacion: 'posicion' | 'total'
  avisoEdad: boolean
  avisoN: boolean
  ranking: ReturnType<typeof posicionMasAfin>
  aspectos: string[]
  otroDeporte: ReturnType<typeof orientacionOtroDeporte>
  tallaAdulta: ReturnType<typeof estimarTallaAdulta> | null
  distanciasElite: { sad: number; euclidiana: number } | null
  puntosSomatocarta: PuntoSomatocarta[]
  zonaIncertidumbre?: { centro: { x: number; y: number }; radioX: number; radioY: number }
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  unidad,
  required,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: number
  max?: number
  unidad?: string
  required?: boolean
  hint?: string
}) {
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
        aria-required={required}
        className="mt-1 w-full border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-950 outline-none focus:border-accent-500"
        placeholder={min !== undefined && max !== undefined ? `${min}–${max}` : undefined}
      />
      {hint && <p className="mt-1 text-[11px] text-ink-400">{hint}</p>}
    </div>
  )
}

export default function CalculadoraSomatotipo() {
  const [form, setForm] = useState<FormState>(FORM_INICIAL)
  const [mostrarIsak, setMostrarIsak] = useState(false)
  const [mostrarContexto, setMostrarContexto] = useState(false)
  const [mostrarMedia, setMostrarMedia] = useState(false)
  const [errores, setErrores] = useState<string[]>([])
  const [avisos, setAvisos] = useState<string[]>([])
  const [resultado, setResultado] = useState<Resultado | null>(null)

  // Al imprimir, se abren los paneles plegables (ISAK, contexto) para que la
  // entrada de datos quede completa en el PDF, y se restauran al terminar.
  const estadoPrevioImpresion = useRef({ isak: false, contexto: false })
  useEffect(() => {
    const alAntesDeImprimir = () => {
      estadoPrevioImpresion.current = { isak: mostrarIsak, contexto: mostrarContexto }
      setMostrarIsak(true)
      setMostrarContexto(true)
    }
    const alDespuesDeImprimir = () => {
      setMostrarIsak(estadoPrevioImpresion.current.isak)
      setMostrarContexto(estadoPrevioImpresion.current.contexto)
    }
    window.addEventListener('beforeprint', alAntesDeImprimir)
    window.addEventListener('afterprint', alDespuesDeImprimir)
    return () => {
      window.removeEventListener('beforeprint', alAntesDeImprimir)
      window.removeEventListener('afterprint', alDespuesDeImprimir)
    }
  }, [mostrarIsak, mostrarContexto])

  const campo = (k: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [k]: v }))

  function cargarEjemplo() {
    setForm((f) => ({ ...f, ...EJEMPLO_PIVOT }))
    setMostrarIsak(true)
    setErrores([])
    setAvisos([])
  }

  function validar(): { ok: boolean; errores: string[]; avisos: string[] } {
    const errs: string[] = []
    const avs: string[] = []

    const edad = numero(form.edad)
    const talla = numero(form.talla)
    const peso = numero(form.peso)
    const envergadura = numero(form.envergadura)

    if (edad === null) errs.push('La edad es obligatoria.')
    else if (edad <= 0) errs.push('La edad no puede ser cero ni negativa.')
    else if (edad < RANGOS.edad[0] || edad > RANGOS.edad[1]) errs.push(`La edad debe estar entre ${RANGOS.edad[0]} y ${RANGOS.edad[1]} años.`)

    if (talla === null) errs.push('La talla es obligatoria.')
    else if (talla <= 0) errs.push('La talla no puede ser cero ni negativa.')
    else if (talla < RANGOS.talla[0] || talla > RANGOS.talla[1]) avs.push(`La talla (${talla} cm) es atípica para este rango de edad; verifícala.`)

    if (peso === null) errs.push('El peso es obligatorio.')
    else if (peso <= 0) errs.push('El peso no puede ser cero ni negativo.')
    else if (peso < RANGOS.peso[0] || peso > RANGOS.peso[1]) avs.push(`El peso (${peso} kg) es atípico; verifícalo.`)

    if (envergadura === null) errs.push('La envergadura es obligatoria.')
    else if (envergadura <= 0) errs.push('La envergadura no puede ser cero ni negativa.')
    else if (envergadura < RANGOS.envergadura[0] || envergadura > RANGOS.envergadura[1])
      avs.push(`La envergadura (${envergadura} cm) es atípica; verifícala.`)

    const pliegues: [string, string][] = [
      ['Tríceps', form.triceps],
      ['Subescapular', form.subescapular],
      ['Supraespinal', form.supraespinal],
      ['Pierna medial', form.piernaMedial],
    ]
    for (const [nombre, v] of pliegues) {
      const n = numero(v)
      if (n !== null) {
        if (n <= 0) errs.push(`El pliegue ${nombre} no puede ser cero ni negativo.`)
        else if (n < RANGOS.pliegue[0] || n > RANGOS.pliegue[1]) avs.push(`El pliegue ${nombre} (${n} mm) es atípico; verifícalo.`)
      }
    }
    const diametros: [string, string][] = [
      ['Húmero', form.humero],
      ['Fémur', form.femur],
    ]
    for (const [nombre, v] of diametros) {
      const n = numero(v)
      if (n !== null) {
        if (n <= 0) errs.push(`El diámetro de ${nombre} no puede ser cero ni negativo.`)
        else if (n < RANGOS.diametro[0] || n > RANGOS.diametro[1]) avs.push(`El diámetro de ${nombre} (${n} cm) es atípico; verifícalo.`)
      }
    }
    const perimetros: [string, string][] = [
      ['Brazo flexionado', form.perimetroBrazo],
      ['Pierna', form.perimetroPierna],
    ]
    for (const [nombre, v] of perimetros) {
      const n = numero(v)
      if (n !== null) {
        if (n <= 0) errs.push(`El perímetro de ${nombre} no puede ser cero ni negativo.`)
        else if (n < RANGOS.perimetro[0] || n > RANGOS.perimetro[1]) avs.push(`El perímetro de ${nombre} (${n} cm) es atípico; verifícalo.`)
      }
    }

    return { ok: errs.length === 0, errores: errs, avisos: avs }
  }

  function calcular() {
    const v = validar()
    setErrores(v.errores)
    setAvisos(v.avisos)
    if (!v.ok) {
      setResultado(null)
      return
    }

    const edad = numero(form.edad)!
    const talla = numero(form.talla)!
    const peso = numero(form.peso)!
    const envergadura = numero(form.envergadura)!
    const posicion = form.posicion

    const { hwr, ectomorfia } = calcularEctomorfia(talla, peso)
    const imc = peso / (talla / 100) ** 2
    const indiceEnvergaduraTalla = envergadura / talla

    const isakCampos = [form.triceps, form.subescapular, form.supraespinal, form.piernaMedial, form.humero, form.femur, form.perimetroBrazo, form.perimetroPierna]
    const isakCompleto = isakCampos.every((c) => numero(c) !== null)

    let somatotipo: Somatotipo
    let modo: 'completo' | 'rapido'
    let sumaPliegues: number | null = null

    if (isakCompleto) {
      modo = 'completo'
      const triceps = numero(form.triceps)!
      const subescapular = numero(form.subescapular)!
      const supraespinal = numero(form.supraespinal)!
      const piernaMedial = numero(form.piernaMedial)!
      const { endomorfia } = calcularEndomorfia(triceps, subescapular, supraespinal, talla)
      const { mesomorfia } = calcularMesomorfia({
        humeroCm: numero(form.humero)!,
        femurCm: numero(form.femur)!,
        perimetroBrazoFlexionadoCm: numero(form.perimetroBrazo)!,
        tricepsMm: triceps,
        perimetroPiernaCm: numero(form.perimetroPierna)!,
        piernaMedialMm: piernaMedial,
        tallaCm: talla,
      })
      somatotipo = { endomorfia, mesomorfia, ectomorfia }
      sumaPliegues = triceps + subescapular + supraespinal + piernaMedial
    } else {
      modo = 'rapido'
      somatotipo = {
        endomorfia: muestraCadeteTotal.endomorfia.media,
        mesomorfia: muestraCadeteTotal.mesomorfia.media,
        ectomorfia,
      }
    }

    const coords = coordenadasSomatocarta(somatotipo)
    const categoria = modo === 'completo' ? clasificarCategoria(somatotipo) : null

    const sexoValido = form.sexo === 'masculino'

    const { comparaciones, fuenteUsada, avisoEdad, avisoN } = ajustePosicion(
      { edad, tallaCm: talla, pesoKg: peso, envergaduraCm: envergadura, imc, indiceEnvergaduraTalla },
      posicion,
      modo === 'completo' ? somatotipo : null,
    )

    const ranking = posicionMasAfin({ edad, tallaCm: talla, pesoKg: peso, envergaduraCm: envergadura, imc, indiceEnvergaduraTalla }, posicion)
    const aspectos = sexoValido ? aspectosAMejorar(comparaciones) : []
    const otroDeporte = sexoValido ? orientacionOtroDeporte(ranking.ranking, edad) : { aplica: false, texto: '' }

    let tallaAdulta: ReturnType<typeof estimarTallaAdulta> | null = null
    const tMadre = numero(form.tallaMadre)
    const tPadre = numero(form.tallaPadre)
    if (tMadre !== null && tPadre !== null && tMadre > 0 && tPadre > 0) {
      tallaAdulta = estimarTallaAdulta(tPadre, tMadre, form.sexo)
    }

    const elite = somatotipoElitePorPosicion[posicion]
    const referenteDatos = jugadorReferentePorPosicion[posicion]
    let distanciasElite: { sad: number; euclidiana: number } | null = null
    const puntos: PuntoSomatocarta[] = []

    if (modo === 'completo') {
      puntos.push({
        id: 'atleta',
        tipo: 'atleta',
        label: 'Tú (atleta)',
        somatotipo,
        coords,
      })
    }

    if (sexoValido && elite) {
      const coordsElite = coordenadasSomatocarta(elite)
      puntos.push({ id: 'elite', tipo: 'elite', label: `Élite — ${NOMBRES_POSICION[posicion]}`, somatotipo: elite, coords: coordsElite })
      if (modo === 'completo') {
        distanciasElite = { sad: distanciaSAD(somatotipo, elite), euclidiana: distanciaEuclidiana(coords, coordsElite) }
      }
    }

    if (sexoValido && elite) {
      const { ectomorfia: ectoReferente } = calcularEctomorfia(referenteDatos.tallaCm, referenteDatos.pesoKg)
      const somatotipoReferente: Somatotipo = { endomorfia: elite.endomorfia, mesomorfia: elite.mesomorfia, ectomorfia: ectoReferente }
      const coordsReferente = coordenadasSomatocarta(somatotipoReferente)
      puntos.push({
        id: 'referente',
        tipo: 'referente',
        label: referenteDatos.nombre,
        somatotipo: somatotipoReferente,
        coords: coordsReferente,
        detalle: 'Estimado: antropometría pública + somatotipo de élite de la posición',
      })
    }

    if (sexoValido && mostrarMedia) {
      const muestraPos = muestraCadetePorPosicion[posicion] ?? muestraCadeteTotal
      const somatotipoMedia: Somatotipo = {
        endomorfia: muestraPos.endomorfia.media,
        mesomorfia: muestraPos.mesomorfia.media,
        ectomorfia: muestraPos.ectomorfia.media,
      }
      puntos.push({
        id: 'media',
        tipo: 'media',
        label: `Media cadete — ${NOMBRES_POSICION[posicion]} (n=${muestraPos.n})`,
        somatotipo: somatotipoMedia,
        coords: coordenadasSomatocarta(somatotipoMedia),
      })
    }

    // Propagación aproximada (no estadísticamente estricta, solo orientativa) de la
    // incertidumbre de ±1 DE de endomorfia y mesomorfia sobre las coordenadas X, Y.
    // X = ecto − endo, con ecto exacta ⇒ la incertidumbre de X es la DE de endo.
    // Y = 2·meso − (endo + ecto), con ecto exacta ⇒ se combinan las DE de meso (×2) y endo.
    const zonaIncertidumbre =
      modo === 'rapido'
        ? {
            centro: coords,
            radioX: muestraCadeteTotal.endomorfia.de,
            radioY: 2 * muestraCadeteTotal.mesomorfia.de + muestraCadeteTotal.endomorfia.de,
          }
        : undefined

    setResultado({
      modo,
      somatotipo,
      categoria,
      hwr,
      imc,
      indiceEnvergaduraTalla,
      sumaPliegues,
      coords,
      comparaciones: sexoValido ? comparaciones : [],
      fuenteComparacion: fuenteUsada,
      avisoEdad,
      avisoN,
      ranking,
      aspectos,
      otroDeporte,
      tallaAdulta,
      distanciasElite,
      puntosSomatocarta: puntos,
      zonaIncertidumbre,
    })
  }

  const edadNum = numero(form.edad)
  const isakListos = [form.triceps, form.subescapular, form.supraespinal, form.piernaMedial, form.humero, form.femur, form.perimetroBrazo, form.perimetroPierna].filter(
    (c) => numero(c) !== null,
  ).length

  return (
    <div>
      <PageHeader
        number="10"
        kicker="Sección 10 · Calculadora de somatotipo"
        title="Calculadora de somatotipo"
        lead="Clasifica el somatotipo de un jugador con el método Heath-Carter, lo compara con la élite de su posición y con un jugador referente actual, y entrega recomendaciones orientativas. Ningún dato que ingreses se envía ni se guarda."
      />

      <section className="section-shell py-14 sm:py-16">
        <SectionHeader
          eyebrow="Paso 1"
          title="Datos del jugador"
          lead="Los cinco campos obligatorios permiten un modo rápido (ectomorfia exacta + estimación). Para el somatotipo completo, agrega las medidas ISAK."
        />

        <div className="grid gap-5 border border-ink-900/10 bg-white/60 p-6 shadow-card sm:grid-cols-2 lg:grid-cols-3">
          <NumberField label="Edad" unidad="años" value={form.edad} onChange={campo('edad')} min={10} max={40} required />
          <NumberField label="Talla" unidad="cm" value={form.talla} onChange={campo('talla')} min={120} max={230} required />
          <NumberField label="Peso" unidad="kg" value={form.peso} onChange={campo('peso')} min={25} max={200} required />
          <NumberField label="Envergadura" unidad="cm" value={form.envergadura} onChange={campo('envergadura')} min={120} max={250} required />

          <div>
            <label htmlFor="posicion" className="block text-xs uppercase tracking-wide text-ink-400">
              Posición <span className="text-accent-500">*</span>
            </label>
            <select
              id="posicion"
              value={form.posicion}
              onChange={(e) => campo('posicion')(e.target.value)}
              className="mt-1 w-full border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-950 outline-none focus:border-accent-500"
            >
              {POSICIONES.map((p) => (
                <option key={p} value={p}>
                  {NOMBRES_POSICION[p]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sexo" className="block text-xs uppercase tracking-wide text-ink-400">
              Sexo
            </label>
            <select
              id="sexo"
              value={form.sexo}
              onChange={(e) => campo('sexo')(e.target.value as 'masculino' | 'femenino')}
              className="mt-1 w-full border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-950 outline-none focus:border-accent-500"
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            {form.sexo === 'femenino' && (
              <p className="mt-1 text-[11px] text-accent-600">
                Las referencias de este cálculo (muestra cadete, élite, jugador referente) son masculinas: se calculará el somatotipo, pero
                no se mostrará el contraste con esas referencias.
              </p>
            )}
          </div>
        </div>

        <details
          className="mt-5 border border-accent-500/40 bg-accent-50/40"
          open={mostrarIsak}
          onToggle={(e) => setMostrarIsak((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer px-5 py-4 font-display text-sm uppercase tracking-wide text-accent-700">
            Medidas ISAK (opcional) — desbloquea el somatotipo Heath-Carter completo {isakListos > 0 && `(${isakListos}/8)`}
          </summary>
          <div className="space-y-6 border-t border-accent-500/30 p-5">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-700">Pliegues (mm)</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <NumberField label="Tríceps" unidad="mm" value={form.triceps} onChange={campo('triceps')} />
                <NumberField label="Subescapular" unidad="mm" value={form.subescapular} onChange={campo('subescapular')} />
                <NumberField label="Supraespinal" unidad="mm" value={form.supraespinal} onChange={campo('supraespinal')} />
                <NumberField label="Pierna medial" unidad="mm" value={form.piernaMedial} onChange={campo('piernaMedial')} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-700">Diámetros (cm)</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label="Húmero (biepicondíleo)" unidad="cm" value={form.humero} onChange={campo('humero')} />
                <NumberField label="Fémur (biepicondíleo)" unidad="cm" value={form.femur} onChange={campo('femur')} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-700">Perímetros (cm)</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField label="Brazo flexionado y contraído" unidad="cm" value={form.perimetroBrazo} onChange={campo('perimetroBrazo')} />
                <NumberField label="Pierna (máximo)" unidad="cm" value={form.perimetroPierna} onChange={campo('perimetroPierna')} />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-ink-400">
              Se necesitan los 8 campos para calcular endomorfia y mesomorfia reales. Si falta alguno, la calculadora usa el modo rápido.
            </p>
          </div>
        </details>

        <details
          className="mt-3 border border-ink-900/10 bg-white/40"
          open={mostrarContexto}
          onToggle={(e) => setMostrarContexto((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer px-5 py-4 font-display text-sm uppercase tracking-wide text-ink-700">
            Datos de contexto (opcional)
          </summary>
          <div className="grid gap-4 border-t border-ink-900/10 p-5 sm:grid-cols-2">
            <NumberField label="Talla de la madre" unidad="cm" value={form.tallaMadre} onChange={campo('tallaMadre')} />
            <NumberField label="Talla del padre" unidad="cm" value={form.tallaPadre} onChange={campo('tallaPadre')} />
          </div>
        </details>

        {edadNum !== null && (edadNum < EDAD_MUESTRA_VALIDA[0] || edadNum > EDAD_MUESTRA_VALIDA[1]) && (
          <p className="mt-4 text-xs text-ink-500">
            Nota: la muestra cadete de referencia tiene edades de ~{EDAD_MUESTRA_VALIDA[0]} a {EDAD_MUESTRA_VALIDA[1]} años. Con la edad
            ingresada, la comparación se hará solo contra las referencias de élite, no contra la muestra cadete.
          </p>
        )}

        {errores.length > 0 && (
          <div role="alert" className="mt-5 border-l-[3px] border-l-red-600 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">Corrige lo siguiente:</p>
            <ul className="mt-1 list-inside list-disc text-sm text-red-700">
              {errores.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {avisos.length > 0 && errores.length === 0 && (
          <div className="mt-5 border-l-[3px] border-l-accent-500 bg-accent-50/60 p-4">
            <p className="text-sm font-medium text-accent-700">Valores atípicos (puedes continuar si son correctos):</p>
            <ul className="mt-1 list-inside list-disc text-sm text-ink-700">
              {avisos.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={calcular}
            className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-sm font-medium uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-300"
          >
            Calcular
          </button>
          <button
            type="button"
            onClick={cargarEjemplo}
            className="inline-flex items-center gap-2 border border-ink-900/15 px-5 py-3 text-xs font-medium uppercase tracking-wide text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600"
          >
            Cargar datos de ejemplo (Pívot)
          </button>
          <label className="flex items-center gap-2 text-xs text-ink-700">
            <input type="checkbox" checked={mostrarMedia} onChange={(e) => setMostrarMedia(e.target.checked)} />
            Mostrar también la media cadete del artículo en la somatocarta
          </label>
        </div>
        <p className="mt-2 text-[11px] text-ink-400">
          "Cargar datos de ejemplo" usa los valores medios reales de la posición Pívot (Tabla 1, Abella del Campo et al., 2016), no datos
          inventados — útil para probar el modo completo sin medir a nadie.
        </p>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-400">
          Privacidad: todo el cálculo ocurre en tu navegador. No enviamos, registramos ni guardamos los datos que ingreses aquí — ni
          siquiera en este dispositivo (no se usa localStorage). Al salir de la página, los datos desaparecen.
        </p>
      </section>

      {resultado && <ResultadoSomatotipo resultado={resultado} form={form} />}

      <CourtDivider />

      <section className="section-shell py-10">
        <p className="mx-auto max-w-2xl border border-ink-900/10 bg-white/60 p-5 text-center text-xs leading-relaxed text-ink-600">
          Herramienta educativa basada en Abella del Campo et al. (2016) y el método Heath-Carter. Las referencias provienen de una
          muestra pequeña (n=20) de un solo club y de valores de élite publicados; los resultados son orientativos, no constituyen un
          diagnóstico ni un criterio de selección o descarte, y no reemplazan la valoración de un profesional.
        </p>
      </section>
    </div>
  )
}

function nivelColor(nivel: ComparacionVariable['nivel']) {
  if (nivel === 'acorde') return 'text-emerald-700'
  if (nivel === 'a-trabajar') return 'text-amber-700'
  return 'text-red-700'
}

function nivelTexto(nivel: ComparacionVariable['nivel']) {
  if (nivel === 'acorde') return 'Acorde'
  if (nivel === 'a-trabajar') return 'A trabajar'
  return 'Desajuste'
}

function ResultadoSomatotipo({ resultado: r, form }: { resultado: Resultado; form: FormState }) {
  const posicion = form.posicion
  const sexoValido = form.sexo === 'masculino'
  const elite = somatotipoElitePorPosicion[posicion]
  const referente = jugadorReferentePorPosicion[posicion]

  const lecturaTexto = useMemo(() => {
    if (r.modo !== 'completo' || !sexoValido || !elite) return null
    const dMeso = r.somatotipo.mesomorfia - elite.mesomorfia
    const dEcto = r.somatotipo.ectomorfia - elite.ectomorfia
    const dEndo = r.somatotipo.endomorfia - elite.endomorfia
    const partes: string[] = []
    partes.push(dEcto > 0.3 ? 'más lineal que la élite de su posición' : dEcto < -0.3 ? 'menos lineal que la élite de su posición' : 'con una linealidad similar a la élite de su posición')
    partes.push(dMeso < -0.3 ? 'con menor desarrollo muscular relativo' : dMeso > 0.3 ? 'con mayor desarrollo muscular relativo' : 'con un desarrollo muscular relativo comparable')
    partes.push(dEndo > 0.3 ? 'y mayor adiposidad relativa' : dEndo < -0.3 ? 'y menor adiposidad relativa' : 'y una adiposidad relativa similar')
    return `El perfil del atleta es ${partes.join(', ')}.`
  }, [r, sexoValido, elite])

  return (
    <section className="section-shell py-4 sm:py-6" aria-live="polite">
      <div className="border-t-2 border-accent-500 bg-ink-950 p-6 text-paper sm:p-10 print:break-inside-avoid">
        <p className="kicker">Resultado</p>
        <h2 className="mt-2 font-display text-2xl uppercase tracking-tight sm:text-3xl">
          {r.modo === 'completo' ? r.categoria : 'Estimación sin pliegues (modo rápido)'}
        </h2>
        {r.modo === 'completo' ? (
          <p className="mt-2 text-sm text-paper/70">
            Endomorfia {r.somatotipo.endomorfia.toFixed(2)} · Mesomorfia {r.somatotipo.mesomorfia.toFixed(2)} · Ectomorfia{' '}
            {r.somatotipo.ectomorfia.toFixed(2)}
          </p>
        ) : (
          <p className="mt-2 max-w-2xl text-sm text-paper/70">
            Solo la ectomorfia es un dato calculado del atleta: <strong>{r.somatotipo.ectomorfia.toFixed(2)}</strong>. La endomorfia y la
            mesomorfia mostradas en el gráfico son valores de referencia del grupo cadete (artículo base), no del atleta. Agrega las
            medidas ISAK arriba para desbloquear el somatotipo real.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-paper/60">
          <span>
            IMC: <strong className="text-paper">{r.imc.toFixed(1)} kg/m²</strong>
          </span>
          <span>
            HWR (índice ponderal): <strong className="text-paper">{r.hwr.toFixed(2)}</strong>
          </span>
          <span>
            Envergadura/talla: <strong className="text-paper">{r.indiceEnvergaduraTalla.toFixed(3)}</strong>
          </span>
          {r.sumaPliegues !== null && (
            <span>
              Suma de pliegues disponibles: <strong className="text-paper">{r.sumaPliegues.toFixed(1)} mm</strong>
            </span>
          )}
        </div>
      </div>

      <div className="border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10 print:break-inside-avoid">
        <Somatocarta puntos={r.puntosSomatocarta} zonaIncertidumbre={r.zonaIncertidumbre} distancias={r.distanciasElite} />
      </div>

      {!sexoValido && (
        <div className="border border-t-0 border-ink-900/10 bg-accent-50/50 p-6 text-sm text-ink-700">
          Con sexo femenino seleccionado, no se muestra el contraste con las referencias (muestra cadete, élite y jugador referente son
          masculinas). Si quieres ver la comparación completa, selecciona "Masculino" — o trata este resultado solo como el cálculo de
          tu propio somatotipo, sin contraste.
        </div>
      )}

      {sexoValido && r.comparaciones.length > 0 && (
        <div className="border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10 print:break-inside-avoid">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">Comparación con la referencia de la posición</h3>
          <p className="mt-1 text-xs text-ink-500">
            Fuente de comparación: {r.fuenteComparacion === 'posicion' ? `muestra cadete de ${NOMBRES_POSICION[posicion]}` : 'muestra cadete total (n=20)'}
            {r.avisoEdad && ' — tu edad está fuera del rango de la muestra cadete (~14-17 años); esta comparación es orientativa.'}
            {r.avisoN && ' — submuestra pequeña: trátala como orientativa.'}
          </p>
          <div className="mt-4">
            <ResponsiveTable headers={['Variable', 'Atleta', 'Referencia', 'z', 'Nivel']} caption="Comparación con la referencia de posición">
              {r.comparaciones.map((c) => (
                <tr key={c.variable} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
                  <td className="px-4 py-2.5 text-ink-950">{c.variable}</td>
                  <td className="px-4 py-2.5 text-ink-700">
                    {c.valorAtleta.toFixed(2)} {c.unidad}
                  </td>
                  <td className="px-4 py-2.5 text-ink-700">
                    {c.valorReferencia.toFixed(2)} {c.unidad}
                  </td>
                  <td className="px-4 py-2.5 text-ink-700">{c.z !== null ? c.z.toFixed(2) : '—'}</td>
                  <td className={`px-4 py-2.5 font-medium ${nivelColor(c.nivel)}`}>{nivelTexto(c.nivel)}</td>
                </tr>
              ))}
            </ResponsiveTable>
          </div>
          {lecturaTexto && <p className="mt-4 text-sm leading-relaxed text-ink-700">{lecturaTexto}</p>}
        </div>
      )}

      {sexoValido && r.aspectos.length > 0 && (
        <div className="border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10 print:break-inside-avoid">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">Recomendaciones</h3>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-ink-400">Posición más afín</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">{r.ranking.texto}</p>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-ink-400">Aspectos a considerar</p>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-ink-700">
              {r.aspectos.map((a) => (
                <li key={a} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-500" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-ink-500">
            Las proporciones de un adolescente cambian con el crecimiento; este resultado es una foto del momento, no un pronóstico.
            Ninguna recomendación aquí implica selección ni descarte: son orientaciones generales, no sustituyen la valoración de un
            entrenador, preparador físico o nutricionista.
          </p>

          {r.tallaAdulta && (
            <div className="mt-5 border-l-[3px] border-l-accent-500 bg-accent-50/50 p-4">
              <p className="text-sm text-ink-800">{r.tallaAdulta.texto}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-ink-400">Fuente: {r.tallaAdulta.source}</p>
            </div>
          )}

          {r.otroDeporte.aplica && (
            <div className="mt-5 border-l-[3px] border-l-ink-900 bg-ink-950/[0.03] p-4">
              <p className="text-xs uppercase tracking-wide text-ink-500">Orientación hacia otro deporte</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{r.otroDeporte.texto}</p>
            </div>
          )}
        </div>
      )}

      {sexoValido && (elite || referente) && (
        <div className="border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10 print:break-inside-avoid">
          <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">Referencias de esta posición</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {elite ? (
              <div className="border border-ink-900/10 p-4">
                <p className="text-xs uppercase tracking-wide text-ink-400">Élite internacional — {NOMBRES_POSICION[posicion]}</p>
                <p className="mt-1 text-sm text-ink-800">
                  Endo {elite.endomorfia} · Meso {elite.mesomorfia} · Ecto {elite.ectomorfia}
                </p>
                <p className="mt-1 text-[11px] text-ink-400">
                  Fuente: Martínez-Sanz, Urdampilleta, Guerrero y Barrios (2011), EFDeportes, 16(159)
                </p>
              </div>
            ) : (
              <div className="border border-ink-900/10 p-4 text-sm text-ink-600">
                El artículo fuente no publica un somatotipo de élite para Ala-Pívot. Puedes comparar orientativamente con Alero y Pívot.
              </div>
            )}
            <div className="border border-ink-900/10 p-4">
              <p className="text-xs uppercase tracking-wide text-ink-400">Jugador referente actual</p>
              <p className="mt-1 text-sm text-ink-800">
                {referente.nombre} — {referente.equipo}
              </p>
              <p className="text-sm text-ink-700">
                {referente.tallaCm} cm · {referente.pesoKg} kg · envergadura {referente.envergaduraCm} cm
              </p>
              <p className="mt-1 text-[11px] text-ink-400">
                Fuente: {referente.source} (consultado {referente.fechaConsulta})
              </p>
            </div>
          </div>
        </div>
      )}

      <ComoSeCalculo />

      <div className="flex flex-wrap gap-3 border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10 print:hidden">
        <CopiarBoton resultado={r} form={form} />
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 border border-ink-900/15 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600"
        >
          Imprimir / guardar como PDF
        </button>
      </div>
    </section>
  )
}

function CopiarBoton({ resultado, form }: { resultado: Resultado; form: FormState }) {
  const [copiado, setCopiado] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        const r = resultado
        const lineas = [
          'Calculadora de clasificación morfológica — Baloncesto · Caracterización del Deporte',
          `Posición: ${NOMBRES_POSICION[form.posicion]}`,
          r.modo === 'completo'
            ? `Somatotipo Heath-Carter: Endomorfia ${r.somatotipo.endomorfia.toFixed(2)} · Mesomorfia ${r.somatotipo.mesomorfia.toFixed(2)} · Ectomorfia ${r.somatotipo.ectomorfia.toFixed(2)}`
            : `Ectomorfia (exacta): ${r.somatotipo.ectomorfia.toFixed(2)} — endomorfia y mesomorfia son de referencia (modo rápido)`,
          r.categoria ? `Categoría: ${r.categoria}` : 'Categoría: no determinada (modo rápido)',
          `IMC: ${r.imc.toFixed(1)} kg/m² · HWR: ${r.hwr.toFixed(2)} · Envergadura/talla: ${r.indiceEnvergaduraTalla.toFixed(3)}`,
        ]
        navigator.clipboard
          ?.writeText(lineas.join('\n'))
          .then(() => {
            setCopiado(true)
            setTimeout(() => setCopiado(false), 2000)
          })
          .catch(() => {})
      }}
      className="inline-flex items-center gap-2 bg-accent-500 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-300"
    >
      {copiado ? 'Copiado ✓' : 'Copiar resumen'}
    </button>
  )
}

function ComoSeCalculo() {
  const detailsRef = useRef<HTMLDetailsElement>(null)

  // El atributo "open" de <details> no se puede forzar por CSS (print:open no
  // existe como propiedad real): se abre y se cierra a mano con beforeprint/afterprint.
  useEffect(() => {
    const el = detailsRef.current
    if (!el) return
    let abiertoAntes = el.open
    const alAntesDeImprimir = () => {
      abiertoAntes = el.open
      el.open = true
    }
    const alDespuesDeImprimir = () => {
      el.open = abiertoAntes
    }
    window.addEventListener('beforeprint', alAntesDeImprimir)
    window.addEventListener('afterprint', alDespuesDeImprimir)
    return () => {
      window.removeEventListener('beforeprint', alAntesDeImprimir)
      window.removeEventListener('afterprint', alDespuesDeImprimir)
    }
  }, [])

  return (
    <details ref={detailsRef} className="border border-t-0 border-ink-900/10 bg-white/60 p-6 shadow-card sm:p-10">
      <summary className="cursor-pointer font-display text-lg uppercase tracking-tight text-ink-950">Cómo se calculó</summary>
      <div className="mt-5 space-y-5 text-sm leading-relaxed text-ink-700">
        <div>
          <h4 className="font-display text-xs uppercase tracking-wide text-ink-950">Fórmulas (Heath-Carter)</h4>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Ectomorfia: a partir del índice ponderal (talla / raíz cúbica del peso), con tres tramos.</li>
            <li>Endomorfia: a partir de la suma de los pliegues de tríceps, subescapular y supraespinal, corregida por talla.</li>
            <li>Mesomorfia: a partir de los diámetros de húmero y fémur y los perímetros de brazo y pierna corregidos por pliegue, menos un ajuste por talla.</li>
            <li>Coordenadas de la somatocarta: X = ectomorfia − endomorfia; Y = 2×mesomorfia − (endomorfia + ectomorfia).</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xs uppercase tracking-wide text-ink-950">Fuentes</h4>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>
              Abella del Campo, M., Escortell Sánchez, R., Sospedra, I., Norte-Navarro, A., Martinez-Rodriguez, A., y Martínez-Sanz, J. M.
              (2016). Características cineantropométricas en jugadores de baloncesto adolescentes. <em>Revista Española de Nutrición
              Humana y Dietética, 20</em>(1), 23-31. https://doi.org/10.14306/renhyd.20.1.179
            </li>
            <li>Carter, J. E. L. (2002). The Heath-Carter anthropometric somatotype: Instruction manual. San Diego State University.</li>
            <li>Carter, J. E. L., y Heath, B. H. (1990). Somatotyping: Development and applications. Cambridge University Press.</li>
            <li>
              Martínez-Sanz, J. M., Urdampilleta, A., Guerrero, J., y Barrios, V. (2011). El somatotipo-morfología en los deportistas.{' '}
              <em>EFDeportes, 16</em>(159).
            </li>
            <li>Stewart, A., Marfell-Jones, M., Olds, T., y de Ridder, H. (2011). International standards for anthropometric assessment. ISAK.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xs uppercase tracking-wide text-ink-950">Limitaciones</h4>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>La muestra cadete de referencia es de un solo club (n=20) y las submuestras por posición son pequeñas (n=2 a n=9).</li>
            <li>El artículo no publica un somatotipo de élite para la posición ala-pívot.</li>
            <li>Sin medidas ISAK, la endomorfia y la mesomorfia no pueden calcularse del atleta: se usa la media del grupo de referencia.</li>
            <li>Las referencias usadas son masculinas; con sexo femenino no se muestra el contraste.</li>
          </ul>
        </div>
      </div>
    </details>
  )
}
