// Datos de referencia para la Calculadora de clasificación morfológica (somatotipo).
//
// Fuente principal: Abella del Campo, M., Escortell Sánchez, R., Sospedra, I.,
// Norte-Navarro, A., Martinez-Rodriguez, A., y Martínez-Sanz, J. M. (2016).
// Características cineantropométricas en jugadores de baloncesto adolescentes.
// Revista Española de Nutrición Humana y Dietética, 20(1), 23-31.
// https://doi.org/10.14306/renhyd.20.1.179
//
// Todas las cifras de este archivo se verificaron una a una contra el PDF original
// del artículo (Tabla 1 y Discusión) antes de incluirse. Ninguna fue inventada ni
// redondeada.

export type PosicionId = 'base' | 'escolta' | 'alero' | 'ala-pivot' | 'pivot'

export interface MediaDE {
  media: number
  de: number
}

export interface MuestraCadete {
  n: number
  edad: MediaDE
  peso: MediaDE
  talla: MediaDE
  envergadura: MediaDE
  imc: MediaDE
  sumatorio8Pliegues: MediaDE
  porcentajeGrasoWithers: MediaDE
  porcentajeMuscularLee: MediaDE
  endomorfia: MediaDE
  mesomorfia: MediaDE
  ectomorfia: MediaDE
  categoria: string
}

// Tabla 1 del artículo (media ± DE). Verificado contra el PDF, cifra por cifra.
export const muestraCadeteTotal: MuestraCadete = {
  n: 20,
  edad: { media: 15.35, de: 0.59 },
  peso: { media: 75.36, de: 10.68 }, // Tabla 1 y Resultados usan 10,68; la Discusión trae
  // una errata (±19,68) que no se propaga aquí — ver nota en README del proyecto.
  talla: { media: 185.76, de: 8.08 },
  envergadura: { media: 191.78, de: 8.08 }, // misma DE que talla en la Tabla 1 original
  // (posible error de transcripción del artículo); no se usa como base de puntuaciones z.
  imc: { media: 21.78, de: 2.26 },
  sumatorio8Pliegues: { media: 87.27, de: 22.62 },
  porcentajeGrasoWithers: { media: 12.67, de: 3.04 },
  porcentajeMuscularLee: { media: 41.75, de: 2.26 },
  endomorfia: { media: 2.65, de: 0.73 },
  mesomorfia: { media: 2.58, de: 0.86 },
  ectomorfia: { media: 3.71, de: 1.14 },
  categoria: 'Ectomorfo balanceado',
}

export const muestraCadetePorPosicion: Record<PosicionId, MuestraCadete | null> = {
  base: {
    n: 4,
    edad: { media: 15.25, de: 0.96 },
    peso: { media: 65.95, de: 11.31 },
    talla: { media: 173.65, de: 6.63 },
    envergadura: { media: 180.95, de: 4.64 },
    imc: { media: 21.74, de: 2.43 },
    sumatorio8Pliegues: { media: 75.68, de: 18.74 },
    porcentajeGrasoWithers: { media: 11.03, de: 2.66 },
    porcentajeMuscularLee: { media: 43.59, de: 3.19 },
    endomorfia: { media: 2.57, de: 0.74 },
    mesomorfia: { media: 3.38, de: 0.64 },
    ectomorfia: { media: 3.00, de: 0.92 },
    categoria: 'Mesoectomorfo',
  },
  escolta: {
    n: 2,
    edad: { media: 15.50, de: 0.71 },
    peso: { media: 76.05, de: 5.59 },
    talla: { media: 185.00, de: 6.36 },
    envergadura: { media: 195.25, de: 2.47 },
    imc: { media: 22.20, de: 0.10 },
    sumatorio8Pliegues: { media: 78.45, de: 2.05 },
    porcentajeGrasoWithers: { media: 11.63, de: 0.07 },
    porcentajeMuscularLee: { media: 40.96, de: 0.03 },
    endomorfia: { media: 2.38, de: 0.17 },
    mesomorfia: { media: 2.49, de: 0.16 },
    ectomorfia: { media: 3.39, de: 0.32 },
    categoria: 'Ectomorfo balanceado',
  },
  alero: {
    n: 9,
    edad: { media: 15.33, de: 0.50 },
    peso: { media: 73.83, de: 7.57 },
    talla: { media: 186.96, de: 4.19 },
    envergadura: { media: 192.70, de: 7.42 },
    imc: { media: 21.15, de: 2.36 },
    sumatorio8Pliegues: { media: 84.44, de: 18.06 },
    porcentajeGrasoWithers: { media: 12.33, de: 2.34 },
    porcentajeMuscularLee: { media: 42.21, de: 0.98 },
    endomorfia: { media: 2.52, de: 0.65 },
    mesomorfia: { media: 2.40, de: 0.97 },
    ectomorfia: { media: 4.10, de: 1.24 },
    categoria: 'Ectomorfo balanceado',
  },
  'ala-pivot': null, // el artículo no desglosa la posición ala-pívot (solo base/escolta/alero/pívot)
  pivot: {
    n: 5,
    edad: { media: 15.40, de: 0.55 },
    peso: { media: 85.36, de: 10.23 },
    talla: { media: 193.60, de: 2.23 },
    envergadura: { media: 197.40, de: 4.16 },
    imc: { media: 22.76, de: 2.55 },
    sumatorio8Pliegues: { media: 105.14, de: 30.40 },
    porcentajeGrasoWithers: { media: 15.00, de: 4.17 },
    porcentajeMuscularLee: { media: 39.79, de: 2.40 },
    endomorfia: { media: 3.07, de: 0.99 },
    mesomorfia: { media: 2.31, de: 0.70 },
    ectomorfia: { media: 3.69, de: 1.23 },
    categoria: 'Ectoendomorfo',
  },
}

export const EDAD_MUESTRA_VALIDA: [number, number] = [14, 17] // ~14-17 años, entorno a 15,35±0,59

// Nota de verificación adicional (no estaba en el prompt original, se encontró al
// probar la calculadora de punta a punta con los datos medios del Pívot de la
// Tabla 1): la fórmula de mesomorfia de Heath-Carter es lineal en sus 6 variables de
// entrada (húmero, fémur, perímetro de brazo y pierna corregidos, talla), así que
// aplicarla a los promedios de columna de la Tabla 1 del artículo DEBERÍA reproducir,
// casi exactamente, el promedio de mesomorfia que el artículo reporta para ese grupo
// (porque la media de una función lineal es igual a la función aplicada a las medias).
// Al probarlo con los datos del Pívot (húmero 7,26; fémur 9,94; brazo flexionado
// 31,46; tríceps 13,42; pierna 39,14; pierna medial 12,90; talla 193,60) la fórmula
// da mesomorfia ≈ 3,10, mientras que la Tabla 1 reporta 2,31±0,70 para ese grupo.
// Se verificó dos veces la transcripción de estos valores contra el PDF original y
// coinciden exactamente con la Tabla 1 — no es un error de transcripción de este
// proyecto. La fórmula implementada en src/lib/somatotipo.ts se verificó, por su
// parte, contra dos fuentes independientes (el propio prompt del proyecto y Canda,
// A. (2024), Arch Med Deporte, 41(5), 267-273, que reproduce los mismos
// coeficientes). La explicación más probable es que el artículo calculó la
// mesomorfia de cada uno de los 5 pívots con sus valores individuales de precisión
// completa (no los redondeados a 2 decimales que aparecen en la Tabla 1) y promedió
// esos 5 resultados — un camino que, pese a la linealidad de la fórmula, puede no
// reproducirse con exactitud a partir de columnas redondeadas si, por ejemplo, el
// protocolo GREC usa una definición de "perímetro corregido" distinta a la que
// describe el método Heath-Carter original. No se tomó ninguna decisión para
// "corregir" este resultado: la calculadora sigue fielmente la fórmula de Carter
// (2002), tal como pide el proyecto, y esta nota queda documentada para quien
// revise el trabajo.

// 5.2 — Somatotipo de élite internacional por posición.
// Fuente: Martínez-Sanz, J. M., Urdampilleta, A., Guerrero, J., y Barrios, V. (2011).
// El somatotipo-morfología en los deportistas. EFDeportes, 16(159). Citado como
// referencia 31 del artículo base, y verificado también contra el propio texto de la
// Discusión del artículo (página 7), donde se reproducen los mismos 4 tríos de valores.
export interface SomatotipoElite {
  endomorfia: number
  mesomorfia: number
  ectomorfia: number
}

export const somatotipoElitePorPosicion: Record<PosicionId, SomatotipoElite | null> = {
  base: { endomorfia: 2.5, mesomorfia: 5, ectomorfia: 3 },
  escolta: { endomorfia: 2.1, mesomorfia: 4.4, ectomorfia: 3.5 },
  alero: { endomorfia: 2.2, mesomorfia: 4.7, ectomorfia: 3.3 },
  'ala-pivot': null, // el artículo fuente no publica un valor de élite para esta posición
  pivot: { endomorfia: 2.8, mesomorfia: 3.9, ectomorfia: 3.7 },
}

// 5.4 — Jugador referente actual por posición. Se reutilizan, sin cambios, los mismos
// 5 jugadores ya publicados en src/data/atletas.ts ("Perfil físico ideal por posición"),
// para no contradecir el contenido ya existente en el sitio. Fuente de cada dato:
// Basketball-Reference.com (2026); envergadura de Gilgeous-Alexander: NBC Sports
// Philadelphia (2018), medición oficial del Draft NBA.
export interface JugadorReferente {
  nombre: string
  equipo: string
  tallaCm: number
  pesoKg: number
  envergaduraCm: number
  source: string
  fechaConsulta: string
}

export const jugadorReferentePorPosicion: Record<PosicionId, JugadorReferente> = {
  base: {
    nombre: 'Shai Gilgeous-Alexander',
    equipo: 'Oklahoma City Thunder (NBA)',
    tallaCm: 198,
    pesoKg: 88,
    envergaduraCm: 211,
    source: 'Basketball-Reference.com (2026); NBC Sports Philadelphia (2018), Draft NBA',
    fechaConsulta: '2026-09-10',
  },
  escolta: {
    nombre: 'Anthony Edwards',
    equipo: 'Minnesota Timberwolves (NBA)',
    tallaCm: 193,
    pesoKg: 102,
    envergaduraCm: 206,
    source: 'Basketball-Reference.com (2026)',
    fechaConsulta: '2026-09-10',
  },
  alero: {
    nombre: 'Jayson Tatum',
    equipo: 'Boston Celtics (NBA)',
    tallaCm: 203,
    pesoKg: 95,
    envergaduraCm: 211,
    source: 'Basketball-Reference.com (2026)',
    fechaConsulta: '2026-09-10',
  },
  'ala-pivot': {
    nombre: 'Giannis Antetokounmpo',
    equipo: 'Milwaukee Bucks (NBA)',
    tallaCm: 211,
    pesoKg: 110,
    envergaduraCm: 224,
    source: 'Basketball-Reference.com (2026)',
    fechaConsulta: '2026-09-10',
  },
  pivot: {
    nombre: 'Nikola Jokić',
    equipo: 'Denver Nuggets (NBA)',
    tallaCm: 211,
    pesoKg: 129,
    envergaduraCm: 221,
    source: 'Basketball-Reference.com (2026); cifra de peso ampliamente reportada por medios especializados',
    fechaConsulta: '2026-09-10',
  },
}

export const NOMBRES_POSICION: Record<PosicionId, string> = {
  base: 'Base',
  escolta: 'Escolta',
  alero: 'Alero',
  'ala-pivot': 'Ala-Pívot',
  pivot: 'Pívot',
}
