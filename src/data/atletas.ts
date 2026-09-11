export interface Leyenda {
  nombre: string
  hito: string
}

export const jugadoresLeyenda: Leyenda[] = [
  { nombre: 'Bill Russell', hito: 'Dominó la defensa y ganó once campeonatos con los Boston Celtics.' },
  { nombre: 'Wilt Chamberlain', hito: 'Ostenta récords aún vigentes, como los 100 puntos anotados en un solo partido.' },
  {
    nombre: 'Kareem Abdul-Jabbar',
    hito: 'Fue, durante casi cuatro décadas, el máximo anotador histórico de la NBA gracias a su icónico tiro de gancho.',
  },
  {
    nombre: 'Michael Jordan',
    hito: 'Con seis campeonatos con los Chicago Bulls, se convirtió en un ícono cultural más allá del deporte.',
  },
  {
    nombre: 'LeBron James',
    hito:
      'Superó a Abdul-Jabbar como máximo anotador histórico de la NBA y es el único jugador en figurar entre los diez mejores de la historia en puntos, asistencias y rebotes simultáneamente.',
  },
]

export const leyendasSource = 'Flashscore.es, 2025; Instituto IUDI, 2026'

export const baloncestoColombiano =
  'En el contexto colombiano, aunque el país no ha producido aún una estrella consolidada en la NBA, sí cuenta con jugadores que han abierto camino en ligas competitivas de Europa y América, como quienes han disputado la ACB y la LEB Oro españolas tras pasar por el baloncesto universitario estadounidense, además de jugadores sanandresanos con trayectoria en ligas de Centroamérica; estas figuras sostienen hoy la estructura de la selección nacional en su búsqueda de una clasificación mundialista (El Colombiano, 2022).'

export const mejorAtletaActual = {
  masculino: {
    nombre: 'Shai Gilgeous-Alexander',
    equipo: 'Oklahoma City Thunder',
    texto:
      'Considerado actualmente el mejor base y, para múltiples analistas, el mejor jugador de toda la NBA, tras ganar el MVP de temporada regular en 2025 y 2026 y el título de campeón en 2025.',
    source: 'Martinez, 2026',
  },
  femenino: {
    nombre: "A'ja Wilson",
    equipo: 'Las Vegas Aces',
    texto:
      'Considerada la mejor jugadora de la WNBA de cara a la temporada 2026: primera jugadora en la historia de la liga en ganar cuatro premios MVP, además de dos medallas de oro olímpicas con Estados Unidos.',
    source: 'DIRECTV Insider, 2026',
  },
}

export interface JugadorPerfil {
  nombre: string
  edad: string
  equipo: string
  estatura: string
  peso: string
  imc: string
  grasa: string
  envergadura: string
}

export interface PerfilPosicion {
  posicion: string
  posicionEn: string
  masculino: JugadorPerfil
  femenino: JugadorPerfil
}

export const perfilesPorPosicion: PerfilPosicion[] = [
  {
    posicion: 'Base',
    posicionEn: 'Point Guard',
    masculino: {
      nombre: 'Shai Gilgeous-Alexander',
      edad: '28 años',
      equipo: 'OKC Thunder (NBA)',
      estatura: '1.98 m',
      peso: '88 kg',
      imc: '22.4',
      grasa: '3-6% (medido en Draft 2018, no representa su composición actual)',
      envergadura: '2.11 m',
    },
    femenino: {
      nombre: 'Sabrina Ionescu',
      edad: '28 años',
      equipo: 'New York Liberty (WNBA)',
      estatura: '1.80 m',
      peso: '75 kg',
      imc: '23.1',
      grasa: 'No publicado',
      envergadura: '1.88 m',
    },
  },
  {
    posicion: 'Escolta',
    posicionEn: 'Shooting Guard',
    masculino: {
      nombre: 'Anthony Edwards',
      edad: '25 años',
      equipo: 'Minnesota Timberwolves (NBA)',
      estatura: '1.93 m',
      peso: '102 kg',
      imc: '27.4',
      grasa: 'No publicado',
      envergadura: '2.06 m',
    },
    femenino: {
      nombre: 'Kelsey Plum',
      edad: '32 años',
      equipo: 'Los Angeles Sparks (WNBA)',
      estatura: '1.73 m',
      peso: '66 kg',
      imc: '22.1',
      grasa: 'No publicado',
      envergadura: '1.75 m',
    },
  },
  {
    posicion: 'Alero',
    posicionEn: 'Small Forward',
    masculino: {
      nombre: 'Jayson Tatum',
      edad: '28 años',
      equipo: 'Boston Celtics (NBA)',
      estatura: '2.03 m',
      peso: '95 kg',
      imc: '23.1',
      grasa: 'No publicado',
      envergadura: '2.11 m',
    },
    femenino: {
      nombre: 'Breanna Stewart',
      edad: '32 años',
      equipo: 'New York Liberty (WNBA)',
      estatura: '1.93 m',
      peso: '77 kg',
      imc: '20.7',
      grasa: 'No publicado',
      envergadura: '2.16 m',
    },
  },
  {
    posicion: 'Ala-Pívot',
    posicionEn: 'Power Forward',
    masculino: {
      nombre: 'Giannis Antetokounmpo',
      edad: '31 años',
      equipo: 'Milwaukee Bucks (NBA)',
      estatura: '2.11 m',
      peso: '110 kg',
      imc: '24.7',
      grasa: 'No publicado',
      envergadura: '2.24 m',
    },
    femenino: {
      nombre: 'Napheesa Collier',
      edad: '29 años',
      equipo: 'Minnesota Lynx (WNBA)',
      estatura: '1.85 m',
      peso: '83 kg',
      imc: '24.2',
      grasa: 'No publicado',
      envergadura: '1.98 m',
    },
  },
  {
    posicion: 'Pívot',
    posicionEn: 'Center',
    masculino: {
      nombre: 'Nikola Jokić',
      edad: '31 años',
      equipo: 'Denver Nuggets (NBA)',
      estatura: '2.11 m',
      peso: '129 kg (cifra ampliamente reportada por medios especializados)',
      imc: '29.0',
      grasa: 'No publicado',
      envergadura: '2.21 m',
    },
    femenino: {
      nombre: "A'ja Wilson",
      edad: '30 años',
      equipo: 'Las Vegas Aces (WNBA)',
      estatura: '1.93 m',
      peso: '88 kg',
      imc: '23.6',
      grasa: 'No publicado',
      envergadura: '2.03 m',
    },
  },
]

export const notaIMC =
  'El IMC tiene un valor limitado en deportistas de alto rendimiento, ya que no distingue entre masa muscular y masa grasa; un jugador con IMC en rango "sobrepeso" según la clasificación general puede tener, en realidad, un porcentaje de grasa corporal muy bajo y una masa muscular muy alta. El porcentaje de grasa y muscular rara vez se publica para deportistas profesionales en activo, por lo que solo se reporta cuando existe una fuente pública verificable; en los demás casos se indica expresamente "No publicado" en lugar de estimarlo.'

export interface ReferenteColombia {
  posicion: string
  nombre: string
  estatura: string
  equipo: string
  nota: string
  source: string
}

// Jugador colombiano profesional más destacado identificado con datos públicos verificables
// para cada posición (no una convocatoria oficial única: cada uno se tomó de su fuente más
// reciente y confiable disponible). Se prioriza el nivel competitivo más alto alcanzado por
// cada jugador sobre la sola pertenencia a la selección nacional.
export const referentesColombianos: ReferenteColombia[] = [
  {
    posicion: 'Base',
    nombre: 'Hansel Atencia',
    estatura: '1.75 m',
    equipo: 'Selección Colombia / Paisas Basketball',
    nota: 'Armador titular de la selección Colombia, formado en la NCAA antes de dar el salto a Europa en 2019.',
    source: 'Colombia men\'s national basketball team, Wikipedia (datos FIBA); Vanguardia, 2023',
  },
  {
    posicion: 'Escolta',
    nombre: 'Braian Angola',
    estatura: '1.98 m',
    equipo: 'Dreamland Gran Canaria (Liga Endesa, España)',
    nota: 'El colombiano de mayor nivel competitivo actual: debuta en la ACB española tras años de sólida producción en competición europea.',
    source: 'Emisora Atlántico, 2025; acb.com',
  },
  {
    posicion: 'Alero',
    nombre: 'Michaell Jackson',
    estatura: '1.96 m',
    equipo: 'Motilones del Norte (Colombia)',
    nota: 'Capitán de la selección Colombia masculina de mayores.',
    source: 'Colombia men\'s national basketball team, Wikipedia (datos FIBA)',
  },
  {
    posicion: 'Ala-Pívot',
    nombre: 'Juan Diego Tello',
    estatura: '2.05 m',
    equipo: 'Titanes de Barranquilla (Colombia)',
    nota: 'Bicampeón de la Liga Profesional de Baloncesto de Colombia (2020 y 2021); con experiencia previa en baloncesto europeo.',
    source: 'Juan Tello Palacios, Wikipedia; El Colombiano, entrevista',
  },
  {
    posicion: 'Pívot',
    nombre: 'Jaime Echenique',
    estatura: '2.11 m',
    equipo: 'Capital City Go-Go (G League, EE. UU.)',
    nota: 'El colombiano más cerca de la NBA en la actualidad: milita en la G League, la liga de desarrollo de la NBA.',
    source: 'El Colombiano, 2022',
  },
]

export const notaReferentesColombianos =
  'A diferencia de la tabla anterior (referentes globales por posición, con fuente oficial única de liga), esta selección combina distintas fuentes periodísticas y bases de datos verificables para identificar al jugador colombiano de mayor nivel competitivo en cada posición; no corresponde a una convocatoria única de la selección nacional en una fecha específica.'

export const notaFuentesTabla =
  'Las medidas de estatura, peso y edad de los jugadores de la NBA se tomaron de sus fichas oficiales en Basketball-Reference.com (2026); las de las jugadoras de la WNBA, de fichas oficiales reproducidas por ESPN (2026) y por DIRECTV Insider (2026). La envergadura de Gilgeous-Alexander corresponde a su medición oficial en el Draft NBA 2018 (NBC Sports Philadelphia, 2018); la de Stewart, a una medición reportada por Yahoo Sports (2025).'
