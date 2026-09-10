export const clasificacionDeporte = [
  {
    title: 'Sociomotor · colaboración-oposición',
    text: 'Deporte de conjunto, con móvil (el balón) y meta (la canasta), practicado en un espacio estandarizado y bajo un reglamento formalizado. Exige resolver de forma constante problemas perceptivo-decisionales bajo oposición directa de un adversario.',
  },
  {
    title: 'Invasión de campo compartido',
    text: 'Deporte de pabellón o cancha cubierta (aunque también se practica al aire libre de forma recreativa). Ambos equipos disputan el mismo espacio de juego, a diferencia de los deportes de cancha dividida como el voleibol.',
  },
  {
    title: 'Disciplina olímpica desde 1936',
    text: 'Deporte olímpico oficial desde los Juegos de Berlín 1936, con ramas masculina y femenina independientes reguladas por el mismo organismo rector, la FIBA.',
  },
]

export interface Categoria {
  nombre: string
  rango: string
  detalle: string
}

export const categorias: Categoria[] = [
  { nombre: 'Minibasket', rango: '6-12 años', detalle: 'Canasta y balón de tamaño reducido.' },
  { nombre: 'Infantil', rango: 'U13-U14', detalle: 'Primer tramo formativo tras el minibasket.' },
  { nombre: 'Cadete', rango: 'U15-U16', detalle: 'Consolidación técnico-táctica.' },
  { nombre: 'Junior', rango: 'U17-U18', detalle: 'Última etapa formativa antes de la transición.' },
  { nombre: 'Sub-21 / Sub-22', rango: 'U21-U22', detalle: 'Etapa de transición hacia la categoría absoluta.' },
  { nombre: 'Sénior', rango: 'Sin límite de edad', detalle: 'Categoría absoluta.' },
]

export const notaCategorias =
  'En las competiciones FIBA y en la mayoría de países americanos se utiliza la nomenclatura "U" (Under) seguida de la edad límite, mientras que en otros sistemas el corte de categoría se rige por el año escolar en lugar de la fecha de nacimiento (Parla Básquet, 2020).'

export const datoRetencionTalento = {
  text:
    'Estas categorías no son un simple trámite administrativo: un estudio con jugadores españoles nacidos entre 1974 y 1981 encontró que la mayoría de los internacionales en categoría cadete no llegan a jugar en la categoría absoluta, y que solo la mitad de ellos llega a la liga profesional (ACB); esta proporción aumenta progresivamente en las categorías junior y sub-22.',
  source: 'Sáenz-López et al., 2006',
}

export interface Competencia {
  nombre: string
  detalle: string
}

export const competenciasSelecciones: Competencia[] = [
  { nombre: 'Juegos Olímpicos', detalle: 'Rama masculina desde 1936, femenina desde 1976.' },
  { nombre: 'Copa Mundial FIBA masculina', detalle: 'Desde 1950, cada cuatro años.' },
  { nombre: 'Copa Mundial FIBA femenina', detalle: 'Desde 1953.' },
  { nombre: 'EuroBasket', detalle: 'Campeonato continental europeo.' },
  { nombre: 'AmeriCup', detalle: 'Campeonato continental americano.' },
]

export const competenciasClubesInternacional: Competencia[] = [
  { nombre: 'EuroLeague', detalle: 'Máxima competición de clubes de Europa.' },
  { nombre: 'NBA', detalle: 'Liga profesional de mayor nivel a nivel mundial.' },
  { nombre: 'Basketball Champions League Americas', detalle: 'Desde 2019.' },
  { nombre: 'Liga Sudamericana de Baloncesto', detalle: 'Desde 1996.' },
]

export const competenciasColombia: Competencia[] = [
  { nombre: 'Liga Profesional de Baloncesto (DPB)', detalle: 'Principal competencia de clubes del país.' },
  { nombre: 'Juegos Nacionales', detalle: 'Competencia multideportiva por departamentos.' },
  { nombre: 'Juegos Intercolegiados', detalle: 'Baloncesto escolar y formativo.' },
  { nombre: 'Juegos Universitarios Nacionales (Ascun Deportes)', detalle: 'Baloncesto universitario.' },
]
