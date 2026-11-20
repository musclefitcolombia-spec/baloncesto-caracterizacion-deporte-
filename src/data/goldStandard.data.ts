// Datos del apartado "Gold standard" (sección 11).
//
// REGLAS DE RIGOR: ninguna cifra, autor, año ni n se completa de memoria. Lo que no se pudo
// confirmar queda como `null` / "dato no disponible" y se lista en `pendiente`.
//
// Estado de verificación (consulta del 2026-11-20):
//  - verificado = true  → se leyó el registro de la propia fuente (página del repositorio, catálogo o
//                         API de Crossref) y coincide con lo registrado aquí.
//  - verificado = false → los datos provienen de registros bibliográficos devueltos por buscadores
//                         (DOAJ, PMC, catálogos), pero el enlace aportado no pudo abrirse en esta
//                         revisión (error de red, 403/404/429). Debe revisarse a mano.
//  - referencia_completa = false → faltan iniciales o autores para escribir la cita en APA 7; en el
//                         sitio se muestra con la marca visible "referencia en verificación".

export type TipoFuente =
  | 'metaanálisis'
  | 'revisión sistemática'
  | 'validación'
  | 'actas de congreso'
  | 'estudio observacional'

export type DominioId = 'composicion' | 'aerobica' | 'salto-carga' | 'maduracion'
export type NivelEvidencia = 'fuerte' | 'moderado' | 'limitado'

export const DOMINIOS: Record<DominioId, string> = {
  composicion: 'Composición corporal',
  aerobica: 'Capacidad aeróbica',
  'salto-carga': 'Salto y carga externa',
  maduracion: 'Maduración y rendimiento U14',
}

export const NIVELES: Record<NivelEvidencia, { etiqueta: string; criterio: string }> = {
  fuerte: {
    etiqueta: 'Fuerte',
    criterio: 'Metaanálisis o revisión sistemática.',
  },
  moderado: {
    etiqueta: 'Moderado',
    criterio: 'Estudio con criterio de referencia, n ≥ 30 y población comparable (jóvenes deportistas), con datos confirmados.',
  },
  limitado: {
    etiqueta: 'Limitado',
    criterio:
      'Actas de congreso, n < 30, población distinta (adultos, silla de ruedas, otro deporte) o datos clave por confirmar.',
  },
}

export interface FuenteGS {
  id: number
  tipo: TipoFuente
  dominio: DominioId
  /** Cita corta para el texto: "Autor et al., año". */
  corta: string
  poblacion: string
  /** n tal como lo reporta la fuente; null = dato no disponible. */
  n: string | null
  criterio_de_referencia: string
  hallazgo: string
  /** Cita en APA 7 (sin el enlace). */
  fuente: string
  url: string
  verificado: boolean
  referencia_completa: boolean
  pendiente: string[]
  fecha_de_consulta: string
  nivel_de_evidencia: NivelEvidencia
  motivo_nivel: string
}

const CONSULTA = '2026-11-20'

export const fuentesGS: FuenteGS[] = [
  {
    id: 1,
    tipo: 'metaanálisis',
    dominio: 'composicion',
    corta: 'Sansone et al., 2022',
    poblacion: 'Jugadores y jugadoras de baloncesto de distintos niveles (no es solo U14).',
    n: '80 estudios; 4335 jugadores',
    criterio_de_referencia: 'No aplica: compara valores de grasa según el método de medición.',
    hallazgo:
      'Los valores de grasa corporal cambian según el sexo, el nivel competitivo y el método; los obtenidos con DXA resultan más altos que los de BIA y pliegues.',
    fuente:
      'Sansone, Makivic, Csapo, Hume, Martínez-Rodríguez, & Bauer. (2022). Body fat of basketball players: A systematic review and meta-analysis. Sports Medicine - Open, 8, Artículo 26.',
    url: 'https://doi.org/10.1186/s40798-022-00418-x',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Iniciales de los autores', 'Abrir el artículo y confirmar los valores agrupados por método'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'fuerte',
    motivo_nivel: 'Metaanálisis; la verificación del enlace quedó pendiente.',
  },
  {
    id: 2,
    tipo: 'validación',
    dominio: 'composicion',
    corta: 'Utczás et al., 2020',
    poblacion: 'Atletas adolescentes varones de fútbol, baloncesto y balonmano.',
    n: '738',
    criterio_de_referencia: 'DXA',
    hallazgo:
      'La BIA (InBody 720) tendió a subestimar el porcentaje de grasa y a sobrestimar la masa magra; con piernas más largas, la sobrestimación de masa magra fue mayor, por lo que los autores piden cautela en baloncesto.',
    fuente:
      'Utczás, K., Tróznai, Z., Pálinkás, G., Kalabiska, I., & Petridis, L. (2020). How length sizes affect body composition estimation in adolescent athletes using bioelectrical impedance. Journal of Sports Science and Medicine, 19(3), 577–584.',
    url: 'https://www.jssm.org/jssm-19-577.xml-abst',
    verificado: false,
    referencia_completa: true,
    pendiente: ['Abrir el enlace (no resolvió en la revisión) y confirmar la edad media de la muestra'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'Validación con n ≥ 30 en adolescentes que incluyen baloncesto.',
  },
  {
    id: 3,
    tipo: 'validación',
    dominio: 'composicion',
    corta: 'Küçükkubaş et al., 2020',
    poblacion: 'Atletas jóvenes varones (baloncesto, fútbol, balonmano, natación y esquí).',
    n: '61',
    criterio_de_referencia: 'Pesaje hidrostático',
    hallazgo:
      'Tres equipos de BIA resultaron válidos para los compartimentos corporales, salvo el porcentaje de grasa del equipo Tanita, que fue notablemente menor que el del pesaje hidrostático.',
    fuente:
      'Küçükkubaş, N., Aytar, S. H., Açıkada, C., & Hazır, T. (2020). Bioelectric impedance analyses for young male athletes: A validation study. Isokinetics and Exercise Science, 28(1), 49–58.',
    url: 'https://content.iospress.com/articles/isokinetics-and-exercise-science/ies185209',
    verificado: true,
    referencia_completa: true,
    pendiente: ['Los resultados se tomaron del resumen indexado; el texto completo no estaba accesible'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'Validación con n ≥ 30 en jóvenes atletas, con baloncesto entre los deportes.',
  },
  {
    id: 4,
    tipo: 'validación',
    dominio: 'composicion',
    corta: 'Ferri-Morales et al., 2018',
    poblacion: 'Atletas varones de 12 a 14 años: natación, fútbol y ciclismo (no incluye baloncesto).',
    n: '104',
    criterio_de_referencia: 'Pletismografía por desplazamiento de aire (ADP)',
    hallazgo:
      'DXA y BIA pie a pie dieron menos grasa que la ADP; el acuerdo de la BIA fue pobre y el del DXA, bueno a excelente. A nivel individual, ninguno predice con precisión el porcentaje de grasa.',
    fuente:
      'Ferri-Morales, et al. (2018). Agreement between standard body composition methods to estimate percentage of body fat in young male athletes. Pediatric Exercise Science. https://doi.org/10.1123/pes.2017-0171',
    url: 'https://ore.exeter.ac.uk/repository/bitstream/10871/33437/1/15.%20Agreement%20between%20standard%20body%20composition%20methods%20to%20estimate%20percentage%20of%20body%20fat%20in%20young%20male%20athletes.pdf',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Lista completa de autores e iniciales', 'Volumen y páginas', 'Abrir el PDF (el enlace no resolvió en la revisión)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'Población de otros deportes (sin baloncesto) y referencia incompleta.',
  },
  {
    id: 5,
    tipo: 'revisión sistemática',
    dominio: 'composicion',
    corta: 'Poureghbali et al., 2026',
    poblacion: 'Atletas adolescentes (revisión de estudios publicados desde 2000).',
    n: null,
    criterio_de_referencia: 'No aplica: revisa los métodos de composición corporal usados en adolescentes atletas.',
    hallazgo:
      'Concluye que no hay un método de referencia fiable para esta población, que los métodos de campo (BIA, pliegues) necesitan más validación y que los modelos de cuatro compartimentos son preferibles a los de dos o tres.',
    fuente:
      'Poureghbali, S., et al. (2026). Body composition analysis methods in adolescent athletes: A systematic review. Sports Medicine International Open, 10, a27515759. https://doi.org/10.1055/a-2751-5759',
    url: 'https://www.thieme-connect.com/products/ejournals/html/10.1055/a-2751-5759',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Lista completa de autores', 'Número de estudios incluidos', 'El enlace aportado (thiemeconnect.com) devolvió 404; el dominio correcto es thieme-connect.com'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'fuerte',
    motivo_nivel: 'Revisión sistemática; la verificación quedó pendiente.',
  },
  {
    id: 6,
    tipo: 'validación',
    dominio: 'composicion',
    corta: 'Ploudre et al., 2018',
    poblacion: 'Jugadoras universitarias de baloncesto (División II), unos 20 años.',
    n: '14',
    criterio_de_referencia: 'DXA',
    hallazgo:
      'A lo largo de la temporada, la BIA pie a pie dio un seguimiento adecuado, pero significativamente menor, del porcentaje de grasa; la mayoría de los métodos midió menos grasa que el DXA.',
    fuente:
      'Ploudre, Arabas, Jorn, & Mayhew. (2018). Comparison of techniques for tracking body composition changes across a basketball season in college women basketball players. International Journal of Exercise Science, 11(4).',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5955327',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Iniciales de los autores', 'Título exacto (el listado del journal lo muestra como "…across a Basketball Season")', 'Páginas'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n = 14 y población universitaria femenina.',
  },
  {
    id: 7,
    tipo: 'actas de congreso',
    dominio: 'composicion',
    corta: 'Landry et al., 2025',
    poblacion: 'Jugadores y jugadoras universitarios de baloncesto, NCAA División I.',
    n: '303 (219 hombres y 84 mujeres)',
    criterio_de_referencia: 'DXA',
    hallazgo: 'La BIA dio menos grasa que el DXA: 15,11 ± 0,37 % frente a 20,11 ± 0,43 % en la muestra total.',
    fuente:
      'Landry, S. E., Gorman, C. J., Cervantes, C., Barnes, J. T., Wagganer, J. D., & Kearney, M. L. (2025). Compared to DXA, BIA underestimates body fat in male and female collegiate basketball players. International Journal of Exercise Science: Conference Proceedings, 11(12), Artículo 58.',
    url: 'https://digitalcommons.wku.edu/ijesab/vol11/iss12/58',
    verificado: true,
    referencia_completa: true,
    pendiente: ['El valor p y los resultados por sexo no aparecen en el resumen disponible'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'Actas de congreso (resumen) y población universitaria.',
  },
  {
    id: 8,
    tipo: 'actas de congreso',
    dominio: 'composicion',
    corta: 'Gegg et al., 2015',
    poblacion: 'Jugadores y jugadoras universitarios de baloncesto, División 1, 19 años.',
    n: '24 (13 mujeres y 11 hombres)',
    criterio_de_referencia: 'DXA',
    hallazgo:
      'Los pliegues dieron 17 % de grasa frente a 20 % del DXA (diferencia significativa, unos 3 puntos); error estándar de estimación de 3,4 % de grasa. Los autores no los consideraron una estimación válida.',
    fuente:
      'Gegg, C. R., Barnes, J. T., Wagganer, J. D., Loenneke, J. P., Miller, W. M., Soni, D. S., & Johnson, R. J. (2015). A comparison of skinfolds to dual energy x-ray absorptiometry for body composition analysis in Division 1 collegiate basketball players. International Journal of Exercise Science: Conference Proceedings, 11(3), Artículo 43.',
    url: 'https://digitalcommons.wku.edu/ijesab/vol11/iss3/43',
    verificado: true,
    referencia_completa: true,
    pendiente: ['El repositorio lista el año 2015 con la numeración "vol. 11, núm. 3"; confirmar año y volumen de las actas'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'Actas de congreso, n = 24 y población universitaria.',
  },
  {
    id: 9,
    tipo: 'validación',
    dominio: 'aerobica',
    corta: 'Stojanović et al., 2016',
    poblacion: 'Jóvenes basquetbolistas bien entrenados, unos 15,7 años.',
    n: '34',
    criterio_de_referencia: 'VO₂máx medido con analizador de gases portátil (K4b2)',
    hallazgo:
      'El test de 20 m de ida y vuelta subestimó el VO₂máx (48,91 frente a 55,45 ml/kg/min; correlación r = 0,65) y los autores no lo consideraron una medida de campo adecuada.',
    fuente:
      'Stojanović, Calleja-Gonzalez, et al. (2016). Accuracy and criterion-related validity of the 20-m shuttle run test in well-trained young basketball players. Montenegrin Journal of Sports Science and Medicine, 5(2), 5–10.',
    url: 'https://www.mjssm.me/clanci/MJSSM_Sept_2016_Stojanovic.pdf',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Lista completa de autores e iniciales', 'Abrir el PDF (el enlace no resolvió en la revisión)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'Validación con n ≥ 30 en jóvenes basquetbolistas; autores por completar.',
  },
  {
    id: 10,
    tipo: 'validación',
    dominio: 'aerobica',
    corta: 'Pérez Tejero et al., 2018',
    poblacion: 'Jugadores de élite de baloncesto en silla de ruedas (adultos).',
    n: '7',
    criterio_de_referencia: 'VO₂pico medido en laboratorio',
    hallazgo: 'La distancia recorrida en el test de campo se correlacionó con el VO₂pico (r = 0,854).',
    fuente:
      'Pérez Tejero, J., Coterón López, J., Rabadán Ruiz, M., & Sampedro Molinevo, J. (2018). Field test validation for wheelchair basketball players’ aerobic capacity assessment. European Journal of Human Movement, 40, 136–148.',
    url: 'https://doaj.org/article/9fbac3f79ad641caa9d2710476592a92',
    verificado: false,
    referencia_completa: true,
    pendiente: ['Abrir el artículo y confirmar n = 7 (se tomó del listado del journal)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n = 7 y población distinta (silla de ruedas, adultos).',
  },
  {
    id: 11,
    tipo: 'validación',
    dominio: 'salto-carga',
    corta: 'Staunton et al., 2021',
    poblacion: 'Basquetbolistas de élite (edad y sexo no indicados en el registro).',
    n: '54 (44 con técnica correcta en el análisis)',
    criterio_de_referencia: 'Plataforma de fuerza',
    hallazgo:
      'Un sensor MARG tuvo sesgo medio < 3 % en las métricas del salto. La correlación fue r = 0,95 para la potencia concéntrica media, pero solo r = 0,65 para la altura de salto (límites de acuerdo de 1 ± 15 %).',
    fuente:
      'Staunton, C. A., Stanger, J. J., Wundersitz, D. W., Gordon, B. A., Custovic, E., & Kingsley, M. I. (2021). Criterion validity of a MARG sensor to assess countermovement jump performance in elite basketballers. Journal of Strength and Conditioning Research, 35(3), 797–803.',
    url: 'https://lida.sport-iat.de/ta/Record/4069879',
    verificado: true,
    referencia_completa: true,
    pendiente: ['Edad y sexo de la muestra (no figuran en el registro)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'Validación contra plataforma de fuerza con n ≥ 30; población de élite, no necesariamente juvenil.',
  },
  {
    id: 12,
    tipo: 'validación',
    dominio: 'salto-carga',
    corta: 'Benson et al., 2020',
    poblacion: 'Jóvenes basquetbolistas (19 mujeres y 27 hombres) en partidos y entrenamientos.',
    n: '46',
    criterio_de_referencia: 'Conteo de saltos por video (no plataforma de fuerza)',
    hallazgo:
      'El dispositivo VERT Classic coincidió con el video en el conteo de saltos de más de 15 cm (ICC = 0,958), con una diferencia media de −2,4 saltos. Mide el conteo de saltos, no la altura.',
    fuente:
      'Benson, L. C., Tait, T. J., Befus, K., Choi, J., Hillson, C., Stilling, C., Grewal, S., MacDonald, K., Pasanen, K., & Emery, C. A. (2020). Validation of a commercially available inertial measurement unit for recording jump load in youth basketball players. Journal of Sports Sciences, 38(8), 928–936.',
    url: 'https://lida.sport-iat.de/ta/Record/4060783',
    verificado: true,
    referencia_completa: true,
    pendiente: [],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'Validación con n ≥ 30 en jóvenes basquetbolistas, pero con criterio distinto a la plataforma de fuerza.',
  },
  {
    id: 13,
    tipo: 'validación',
    dominio: 'salto-carga',
    corta: 'Pino-Ortega et al., 2024',
    poblacion: 'Prueba en un entorno cerrado (cancha); tamaño y características de la muestra no disponibles.',
    n: null,
    criterio_de_referencia: 'Medidas reales de la cancha (líneas del campo de baloncesto)',
    hallazgo:
      'Un sistema de posicionamiento de banda ultraancha con ocho antenas resultó adecuado para desplazamiento y posición en interiores (error medio de 0,03 m).',
    fuente:
      'Pino-Ortega, J., Bastida-Castillo, A., Gómez-Carmona, C. D., & Rico-González, M. (2024). Validity and reliability of an eight antennae ultra-wideband local positioning system to measure performance in an indoor environment. Sports Biomechanics, 23(2), 145–155.',
    url: 'https://digitum.um.es/digitum/handle/10201/149005',
    verificado: false,
    referencia_completa: true,
    pendiente: [
      'Año: el artículo se publicó en línea el 18-nov-2020; se usa 2024 por corresponder al volumen 23 (inferido), confirmar',
      'n y características de la muestra',
      'Abrir el enlace (403 en la revisión)',
    ],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'Muestra no disponible; evalúa posición y desplazamiento, no el salto.',
  },
  {
    id: 14,
    tipo: 'validación',
    dominio: 'salto-carga',
    corta: 'Colino et al., 2019',
    poblacion: 'Quince atletas varones en deportes de cancha en general (no solo baloncesto).',
    n: '15',
    criterio_de_referencia: 'Cinta métrica y puertas de cronometraje electrónicas',
    hallazgo:
      'Un sistema de posicionamiento local resultó válido y fiable para medir distancia a velocidad constante en línea recta; los errores de tiempo podrían ser demasiado grandes para pruebas que exigen precisión.',
    fuente:
      'Colino, E., et al. (2019). Validity and reliability of a commercially available indoor tracking system to assess distance and time in court-based sports. Frontiers in Psychology, 10, 2076. https://doi.org/10.3389/fpsyg.2019.02076',
    url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02076/pdf',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Iniciales y lista completa de autores (el registro nombra a Colino, García-Unanue, Sánchez-Sánchez, Navandar y otros)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n = 15 y deportes de cancha en general.',
  },
  {
    id: 15,
    tipo: 'validación',
    dominio: 'salto-carga',
    corta: 'Smith et al., 2024',
    poblacion: 'Basquetbolistas bien entrenados.',
    n: '18',
    criterio_de_referencia: 'Medidas criterio para cada parámetro de movimiento',
    hallazgo:
      'La unidad inercial VXSport (Omni) tuvo sesgo medio < 5 % en carreras de 20 m, pero > 10 % en distancia total, colisiones, aceleraciones y deceleraciones; la fiabilidad fue alta para velocidad y conteos.',
    fuente:
      'Smith, et al. (2024). Validity and reliability of the VXSport (Omni) device on basketball movement parameters. Scientific Journal of Sport and Performance, 3(3), 383–394. https://doi.org/10.55860/QIDN6711',
    url: 'https://research.usq.edu.au/download/6c270b958860858ad8b795bd9c5e25acdb4ff24e45bda6072c8b694130944c81/456498/Smith%202024%20SJS%203%283%29.pdf',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Lista completa de autores e iniciales', 'Abrir el PDF (405 en la revisión)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n = 18 y autoría por completar.',
  },
  {
    id: 16,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Fragoso et al., 2021',
    poblacion: 'Jugadores U-14 de élite portugueses.',
    n: '172 (cifra aportada por el equipo; no confirmada)',
    criterio_de_referencia: 'No aplica (no es un estudio de validación de medición).',
    hallazgo:
      'La maduración (según la edad de pico de velocidad de crecimiento usada como corte) afectó atributos morfológicos y la fuerza. Según la fuente aportada, los de maduración temprana también superaron a sus pares en composición corporal y potencia de salto; esto último no se pudo confirmar.',
    fuente:
      'Fragoso, Ramos, Teles, Volossovitch, Ferreira, & Massuça. (2021). The study of maturational timing effect in elite Portuguese adolescent basketball players: Anthropometric, functional and game performance implications. Applied Sciences, 11(21), 9894. https://doi.org/10.3390/app11219894',
    url: 'https://doi.org/10.3390/app11219894',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Iniciales de los autores', 'Confirmar n = 172', 'Confirmar el hallazgo sobre potencia de salto (el sitio de MDPI devolvió 403)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'Datos clave (n y hallazgo de salto) por confirmar.',
  },
  {
    id: 17,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Ramos et al., 2020',
    poblacion: 'Equipos regionales U-14 portugueses, masculinos y femeninos (festival de 2016).',
    n: null,
    criterio_de_referencia: 'No aplica (comparación entre equipos mejor y peor clasificados).',
    hallazgo:
      'En los varones, los equipos finalistas fueron más rápidos (20 m) y ágiles, lanzaron más lejos el balón medicinal y tuvieron menor porcentaje de grasa que los de menor clasificación.',
    fuente:
      'Ramos, S., Volossovitch, A., Ferreira, A. P., Barrigas, C., Fragoso, I., & Massuça, L. (2020). Differences in maturity, morphological, and fitness attributes between the better- and lower-ranked male and female U-14 Portuguese elite regional basketball teams. Journal of Strength and Conditioning Research, 34(3), 878–887.',
    url: 'https://recil.ulusofona.pt/items/c006c162-66e1-4b94-af84-2b61184a1d7a',
    verificado: true,
    referencia_completa: true,
    pendiente: [
      'n de la muestra',
      'Año: se publicó en línea en 2018 y en papel en 2020; el sitio usa 2020 (el equipo había anotado 2018)',
    ],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n no disponible.',
  },
  {
    id: 18,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Ramos et al., 2021',
    poblacion: 'Jugadores U-14 de élite portugueses de 13 a 14 años (224 varones y 192 mujeres).',
    n: '416',
    criterio_de_referencia: 'No aplica (modelos de regresión sobre el rendimiento en juego por minuto).',
    hallazgo:
      'En varones, la talla, la fuerza de agarre, la agilidad y el salto con contramovimiento predijeron el rendimiento por minuto; en mujeres, el maturity offset, la experiencia de práctica y la agilidad.',
    fuente:
      'Ramos, S., Volossovitch, A., Ferreira, A. P., Fragoso, I., & Massuça, L. M. (2021). Training experience and maturational, morphological, and fitness attributes as individual performance predictors in male and female under-14 Portuguese elite basketball players. Journal of Strength and Conditioning Research, 35(7), 2025–2032.',
    url: 'https://lida.sport-iat.de/ta/Record/4071577',
    verificado: true,
    referencia_completa: true,
    pendiente: ['Solo se leyó el resumen del catálogo'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'n = 416 en la población objetivo (U14).',
  },
  {
    id: 19,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Torres-Unda et al., 2016',
    poblacion: 'Jugadores de 13 a 14 años de equipos de élite durante un campeonato nacional (el registro menciona a los chicos).',
    n: null,
    criterio_de_referencia: 'No aplica (regresión sobre el rendimiento en juego).',
    hallazgo:
      'El maturity offset (años respecto del pico de velocidad de crecimiento) fue el mejor predictor del rendimiento; la maduración temprana y avanzada se asoció con mejor valoración y más puntos por partido, y los nacidos en la segunda mitad del año y los de maduración tardía podrían quedar marginados.',
    fuente:
      'Torres-Unda, J., Zarrazquin, I., Gravina, L., Zubero, J., Seco, J., Gil, S. M., Gil, J., & Irazusta, J. (2016). Basketball performance is related to maturity and relative age in elite adolescent players. Journal of Strength and Conditioning Research, 30(5), 1325–1332.',
    url: 'https://lida.sport-iat.de/dbb/Record/4039680',
    verificado: true,
    referencia_completa: true,
    pendiente: ['n y sexo de la muestra (no figuran en el registro)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'limitado',
    motivo_nivel: 'n no disponible en el registro.',
  },
  {
    id: 20,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Arede et al., 2021',
    poblacion: 'Jugadores y jugadoras U-13 y U-15 en un torneo no oficial.',
    n: '185',
    criterio_de_referencia: 'No aplica (análisis multivariado de maduración, pruebas físicas y estadísticas de juego).',
    hallazgo:
      'Se observaron asociaciones entre pruebas físicas y variables de juego en la mayoría de los grupos; las diferencias de maduración fueron mayores entre los grupos U-13 que entre los U-15.',
    fuente:
      'Arede, Oliveira, Gomez, & Leite. (2021). A multi-block multivariate analysis to explore the influence of the somatic maturation in youth basketball. Frontiers in Psychology, 12, 602576. https://doi.org/10.3389/fpsyg.2021.602576',
    url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.602576/pdf',
    verificado: false,
    referencia_completa: false,
    pendiente: ['Iniciales y nombres completos de los autores', 'Leer el texto completo (el PDF no fue legible en la revisión)'],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'n = 185 en jóvenes basquetbolistas; autoría por completar.',
  },
  {
    id: 21,
    tipo: 'estudio observacional',
    dominio: 'maduracion',
    corta: 'Leyhr et al., 2024',
    poblacion: 'Varones de 14,39 ± 0,28 años en el torneo inicial de selección de la sub-15 alemana.',
    n: '68 (27 seleccionados y 41 no seleccionados)',
    criterio_de_referencia: 'No aplica (comparación entre seleccionados y no seleccionados).',
    hallazgo:
      'Hubo sesgo hacia nacidos temprano y de maduración temprana; los seleccionados fueron más altos y pesados y con mayor maturity offset. De las pruebas motoras, solo el CMJ fue mejor en los seleccionados; al controlar por edad relativa y maduración, los modelos con variables motoras no discriminaron la selección.',
    fuente:
      'Leyhr, D., Rösch, D., Cumming, S. P., & Höner, O. (2024). Selection-dependent differences in youth elite basketball players’ relative age, maturation-related characteristics, and motor performance. Research Quarterly for Exercise and Sport, 95(3), 775–788. https://doi.org/10.1080/02701367.2024.2311644',
    url: 'https://doi.org/10.1080/02701367.2024.2311644',
    verificado: true,
    referencia_completa: true,
    pendiente: [
      'Las cifras de la diapositiva 5 y 6 del PDF (alturas, pesos, APHV, sprint, T-test, CMJ) no figuran en el resumen; confirmar en el texto completo',
    ],
    fecha_de_consulta: CONSULTA,
    nivel_de_evidencia: 'moderado',
    motivo_nivel: 'n = 68 en jóvenes basquetbolistas; datos numéricos pendientes de confirmar.',
  },
]

// ---- Evidencia U15: seleccionados vs. no seleccionados (según el PDF de apoyo, basado en Leyhr et al.) ----
export const evidenciaU15 = {
  nota:
    'Cifras tomadas del PDF de apoyo, que las atribuye a "Leyhr et al.". El resumen del estudio original (Leyhr et al., 2024; n = 68) no publica estos valores, por lo que quedan en verificación.',
  antropometria: [
    { variable: 'Altura', unidad: 'cm', sel: 186.9, nosel: 180.9, dif: '+6,0 cm' },
    { variable: 'Peso', unidad: 'kg', sel: 72.18, nosel: 66.54, dif: '+5,64 kg' },
    { variable: 'Años desde el APHV', unidad: 'años', sel: 1.6, nosel: 1.28, dif: '+0,32 años' },
  ],
  motoras: [
    {
      id: 'sprint',
      variable: 'Sprint lineal de 20 m',
      unidad: 's',
      sel: 3.21,
      nosel: 3.24,
      lectura: 'Sin diferencia significativa (según el PDF)',
      menorEsMejor: true,
    },
    {
      id: 'ttest',
      variable: 'Agilidad (T-test modificado)',
      unidad: 's',
      sel: 5.77,
      nosel: 5.79,
      lectura: 'Sin diferencia significativa (según el PDF)',
      menorEsMejor: true,
    },
    {
      id: 'cmj',
      variable: 'Salto con contramovimiento (CMJ)',
      unidad: 'cm',
      sel: 37.66,
      nosel: 34.98,
      lectura: 'Diferencia de 2,68 cm; el resumen del estudio original la reporta como la única prueba motora significativa',
      menorEsMejor: false,
    },
  ],
}

// ---- Cuatro formas de medir un salto (diapositiva 7 del PDF; ecuaciones estándar de la física del movimiento) ----
export interface MetodoSalto {
  id: 'vuelo' | 'impulso' | 'acelerometria' | 'desplazamiento'
  titulo: string
  idea: string
  formula: string
  limite: string
}

export const metodosSalto: MetodoSalto[] = [
  {
    id: 'vuelo',
    titulo: 'Tiempo de vuelo',
    idea: 'Se mide cuánto tiempo estás en el aire; mientras más tiempo, más alto fue el salto.',
    formula: 'h = g · t² / 8',
    limite: 'Supone que el cuerpo se extiende igual al despegar y al aterrizar; si flexionas las piernas en el aire, sobrestima.',
  },
  {
    id: 'impulso',
    titulo: 'Impulso y masa corporal',
    idea: 'Con la plataforma de fuerza se calcula la velocidad de despegue y de ahí la altura.',
    formula: 'v = ∫(F − m·g) dt / m  →  h = v² / (2 · g)',
    limite: 'El PDF lo resume como v = F·t/m; en la práctica se integra la fuerza neta (sin el peso) durante la impulsión.',
  },
  {
    id: 'acelerometria',
    titulo: 'Acelerometría',
    idea: 'Un sensor en el cuerpo registra la aceleración; al integrarla dos veces se estima el desplazamiento.',
    formula: 'a(t) → v = ∫a dt → s = ∫v dt',
    limite: 'La doble integración acumula error y depende de dónde se ubique el sensor y del algoritmo del fabricante.',
  },
  {
    id: 'desplazamiento',
    titulo: 'Desplazamiento (video o alcance)',
    idea: 'Se compara la altura alcanzada con la de pie, con una cinta, un palo de medición o un análisis de video.',
    formula: 'h = alcance en el salto − alcance de pie',
    limite: 'Mide la mano o un punto de la imagen, no el centro de masa del cuerpo.',
  },
]

// ---- Comparación de errores (diapositivas 8 a 10 del PDF) ----
export interface FilaError {
  sistema: string
  uso: string
  error: string
  tipoError: 'sTEE' | 'sesgo en cm'
  limitacion: string
}

export const erroresSalto: FilaError[] = [
  {
    sistema: 'Barras ópticas y plataformas de fuerza (1000 Hz)',
    uso: 'Criterio de referencia propuesto por el PDF',
    error: '0,10 a 0,13',
    tipoError: 'sTEE',
    limitacion: 'Equipos costosos y poco portátiles; la medición exige protocolo.',
  },
  {
    sistema: 'Palo de medición (yardstick)',
    uso: 'Método tradicional',
    error: '0,35',
    tipoError: 'sTEE',
    limitacion: 'Restringe el aterrizaje, obliga a alcanzar con un brazo y mide la mano, no el centro de masa.',
  },
  {
    sistema: 'Video 2D',
    uso: 'Método tradicional',
    error: 'hasta 1,31',
    tipoError: 'sTEE',
    limitacion: 'Seguimiento manual cuadro a cuadro y distorsión cuando el salto sale del plano de la cámara.',
  },
  {
    sistema: 'IMU portátiles (Kinexon y Vert)',
    uso: 'Carga interna diaria',
    error: '+8,5 a +9,4 cm',
    tipoError: 'sesgo en cm',
    limitacion: 'Según el PDF, sobrestiman la altura frente al criterio de referencia; sus datos crudos no deberían usarse para decidir una selección sin ajuste.',
  },
]

// ---- Criterio de referencia usado por cada estudio de composición corporal (hallazgo crítico 2) ----
export interface FilaSesgo {
  metodo: string
  criterio: string
  direccion: string
  poblacion: string
  fuenteId: number
}

export const sesgosComposicion: FilaSesgo[] = [
  { metodo: 'BIA', criterio: 'DXA', direccion: 'Subestima la grasa (15,11 % frente a 20,11 %)', poblacion: 'Universitarios NCAA D1, n = 303', fuenteId: 7 },
  { metodo: 'Pliegues cutáneos', criterio: 'DXA', direccion: 'Subestiman la grasa (unos 3 puntos)', poblacion: 'Universitarios D1, n = 24', fuenteId: 8 },
  { metodo: 'BIA pie a pie', criterio: 'DXA', direccion: 'Seguimiento adecuado pero con menos grasa que el DXA', poblacion: 'Universitarias División II, n = 14', fuenteId: 6 },
  { metodo: 'BIA (InBody 720)', criterio: 'DXA', direccion: 'Subestima la grasa y sobrestima la masa magra', poblacion: 'Adolescentes varones, n = 738', fuenteId: 2 },
  { metodo: 'DXA y BIA pie a pie', criterio: 'Pletismografía por desplazamiento de aire', direccion: 'Ambos subestiman la grasa: aquí el DXA es el que queda por debajo', poblacion: 'Varones de 12 a 14 años (sin baloncesto), n = 104', fuenteId: 4 },
  { metodo: 'Tres equipos de BIA', criterio: 'Pesaje hidrostático', direccion: 'Válidos, salvo la grasa del Tanita (subestima)', poblacion: 'Jóvenes varones, n = 61', fuenteId: 3 },
]

// ---- Criterio de referencia por variable (hallazgo crítico 1) ----
export const criteriosPorVariable = [
  { variable: 'Grasa corporal', criterios: 'DXA, pesaje hidrostático, pletismografía por desplazamiento de aire', fuentes: 'Fuentes 3, 4, 6, 7 y 8' },
  { variable: 'Capacidad aeróbica', criterios: 'VO₂máx medido con analizador de gases', fuentes: 'Fuentes 9 y 10' },
  { variable: 'Altura de salto y potencia', criterios: 'Plataforma de fuerza (y, en el PDF, barras ópticas)', fuentes: 'Fuente 11 y PDF de apoyo' },
  { variable: 'Conteo de saltos', criterios: 'Video', fuentes: 'Fuente 12' },
  { variable: 'Distancia y posición', criterios: 'Cinta métrica calibrada o líneas de la cancha', fuentes: 'Fuentes 13 y 14' },
]
