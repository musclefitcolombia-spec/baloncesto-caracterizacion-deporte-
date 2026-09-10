export interface HitoHistorico {
  year: string
  title: string
  text: string
  source: string
}

export const hitosMundiales: HitoHistorico[] = [
  {
    year: '1891',
    title: 'Invención del baloncesto',
    text: 'James Naismith, profesor canadiense de educación física, crea el juego en la Escuela Internacional de Entrenamiento de la YMCA de Springfield, Massachusetts, ante el encargo de diseñar una actividad física segura para practicar bajo techo durante el crudo invierno de Nueva Inglaterra.',
    source: 'Infobae, 2025',
  },
  {
    year: '21 dic 1891',
    title: 'Primer partido documentado',
    text: 'Se disputa el primer partido con un balón de fútbol y dos canastas de melocotón colocadas a 3.05 m de altura, bajo un reglamento original de trece reglas.',
    source: 'Infobae, 2025',
  },
  {
    year: '1932',
    title: 'Fundación de la FIBA',
    text: 'La Federación Internacional de Baloncesto se funda el 18 de junio en Ginebra (Suiza), por ocho federaciones nacionales, con el objetivo de unificar las reglas del juego a nivel mundial.',
    source: 'FIBA.basketball, s.f.',
  },
  {
    year: '1936',
    title: 'Debut olímpico',
    text: 'El baloncesto debuta como disciplina olímpica en los Juegos de Berlín. En esa misma ocasión, la FIBA nombra a Naismith su presidente honorario.',
    source: 'FIBA.basketball, s.f.',
  },
]

export const hitosColombia: HitoHistorico[] = [
  {
    year: '18 jul 1925',
    title: 'Primer partido documentado en Colombia',
    text: 'El baloncesto llega al país de la mano de la comunidad lasallista. El primer partido documentado se disputa en el Liceo de La Salle de Bogotá.',
    source: 'Infobae, 2026',
  },
  {
    year: '1937',
    title: 'Fundación de Fecolcesto',
    text: 'Se funda la Federación Colombiana de Baloncesto (FCB o Fecolcesto), organismo rector del deporte a nivel nacional.',
    source: 'Infobae, 2026',
  },
  {
    year: '1981',
    title: 'Bronce sudamericano femenino',
    text: 'La selección femenina de Colombia obtiene el tercer puesto del Campeonato Sudamericano.',
    source: 'Ascun Deportes, s.f.',
  },
  {
    year: '1982',
    title: 'Colombia, sede del Mundial masculino',
    text: 'El país es anfitrión del Campeonato Mundial de Baloncesto masculino; la selección colombiana ocupa el séptimo lugar.',
    source: 'Infobae, 2026',
  },
  {
    year: '1984',
    title: 'Título Sudamericano femenino',
    text: 'La selección femenina se corona campeona del Sudamericano al vencer a Brasil por 62-51.',
    source: 'Ascun Deportes, s.f.',
  },
  {
    year: 'Hoy',
    title: 'Meta olímpica pendiente',
    text: 'Pese a esta trayectoria centenaria, hasta la fecha ninguna selección colombiana —masculina ni femenina— ha logrado clasificar a unos Juegos Olímpicos.',
    source: 'Infobae, 2026',
  },
]

export const datoLigaColombia = {
  text:
    'A nivel de clubes, la Liga Profesional de Baloncesto de Colombia es organizada por la División Profesional de Baloncesto (DPB) en articulación con la Federación Colombiana de Baloncesto. El club más laureado de su historia es Titanes de Barranquilla, con nueve títulos.',
  source: 'DPB Colombia, s.f.; El Espectador, 2024',
}

export const ecosistemaJerarquia = {
  text:
    'A nivel organizativo, el baloncesto se estructura en un ecosistema jerárquico: la FIBA regula el deporte a nivel mundial, mientras que en Colombia la Federación Colombiana de Baloncesto regula las selecciones nacionales y, a través de la División Profesional de Baloncesto, la Liga Profesional de clubes. Este ecosistema incluye también el baloncesto formativo (categorías inferiores y colegial) y el universitario, articulado en Colombia por Ascun Deportes a través de los Juegos Universitarios Nacionales.',
  source: 'Colombia.com.co, 2026; DPB Colombia, s.f.; Ascun Deportes, s.f.',
}

export const genero1910 = {
  text:
    'En su dimensión social, el baloncesto ha cumplido un rol particular en el país: una ley de 1910 que estableció la educación física obligatoria autorizó el baloncesto como el único deporte permitido para las niñas, por considerarse de menor contacto físico. Esta decisión, aunque reflejaba una visión restrictiva del cuerpo femenino en el deporte de la época, terminó posicionando al baloncesto como una de las primeras vías de acceso de las mujeres colombianas al deporte competitivo.',
  source: 'Pino, 2016, como se citó en Pontificia Universidad Javeriana, s.f.',
}

export const seleccionFemeninaActual = {
  text:
    'Actualmente, la selección femenina de baloncesto de Colombia continúa compitiendo por un cupo al Mundial de Alemania 2026, enfrentando en la fase clasificatoria a selecciones como Francia, Nigeria y Alemania, y cuenta con logros históricos como el título Sudamericano de 1984 al vencer a Brasil.',
  source: 'El Colombiano, 2026; Ascun Deportes, s.f.',
}

export const brechaInstitucional = {
  text:
    'No obstante, persisten brechas institucionales: en junio de 2026 la Federación decidió no inscribir a la selección femenina en el torneo preclasificatorio a los Juegos Olímpicos, decisión que las propias jugadoras cuestionaron públicamente por considerarla una pérdida de una oportunidad de crecimiento para el baloncesto nacional.',
  source: 'Infobae, 2026',
}

export const cifrasMinDeporte = {
  ninas: 202244,
  total: 551378,
  porcentajeAltoRendimiento: 48,
  text:
    'En contraste, cifras del Ministerio del Deporte muestran avances en la base: en 2024, 202 244 de los 551 378 jóvenes inscritos en los Juegos Intercolegiados Nacionales eran niñas, y las mujeres ya representan el 48% de los deportistas de alto rendimiento del sistema olímpico colombiano.',
  source: 'Ministerio del Deporte, 2025',
}

export const conclusionGenero =
  'Este contraste entre el crecimiento en la base formativa y las decisiones institucionales que aún limitan el desarrollo del alto rendimiento femenino es un punto de análisis relevante para cualquier proceso de evaluación motriz y detección de talento que se plantee con enfoque de género.'
