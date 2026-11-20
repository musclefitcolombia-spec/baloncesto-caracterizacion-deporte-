import type { Referencia } from './referencias'

// Referencias de la Calculadora Z Phantom (consulta del 2026-11-20).
// completa = false → falta confirmar autoría, iniciales, páginas o editorial; en el listado general se
// muestran con la marca "[referencia en verificación]". Nada se completó de memoria.
export interface ReferenciaPhantom extends Referencia {
  completa: boolean
  pendiente: string[]
}

export const referenciasPhantom: ReferenciaPhantom[] = [
  {
    cita: 'Ackland, T. R., Lohman, T. G., Sundgot-Borgen, J., Maughan, R. J., Meyer, N. L., Stewart, A. D., & Müller, W. (2012). Current status of body composition assessment in sport: Review and position statement on behalf of the ad hoc research working group on body composition, health and performance, under the auspices of the I.O.C. Medical Commission. Sports Medicine, 42(3), 227–249.',
    url: 'https://doi.org/10.2165/11597140-000000000-00000',
    completa: true,
    pendiente: [],
  },
  {
    cita: 'Carter, J. E. L., & Heath, B. H. (1990). Somatotyping: Development and applications. Cambridge University Press.',
    completa: true,
    pendiente: ['No se encontró un enlace estable del editor; la ficha se confirmó en catálogos de bibliotecas'],
  },
  {
    cita: 'Esparza Ros, F. (Ed.). (1993). Manual de cineantropometría. FEMEDE.',
    completa: false,
    pendiente: ['Confirmar editorial, serie y apellido (algunas fuentes escriben «Esparza» y otras «Esparza Ros»); el manual está agotado'],
  },
  {
    cita: 'Kerr, D. A. (1988). An anthropometric method for fractionation of skin, adipose, bone, muscle and residual tissue masses in males and females age 6 to 77 years [Tesis de maestría, Simon Fraser University].',
    url: 'https://summit.sfu.ca/item/5139',
    completa: false,
    pendiente: ['Confirmar el nombre del autor y el título exacto: el registro encontrado no muestra el campo de autoría'],
  },
  {
    cita: 'Norton, K., & Olds, T. (2001). Morphological evolution of athletes over the 20th century: Causes and consequences. Sports Medicine, 31(11), 763–783.',
    url: 'https://doi.org/10.2165/00007256-200131110-00001',
    completa: true,
    pendiente: [],
  },
  {
    cita: 'Ross, W. D., & Marfell-Jones, M. J. (1991). Kinanthropometry. En J. D. MacDougall, H. A. Wenger, & H. J. Green (Eds.), Physiological testing of the high-performance athlete (2.ª ed.). Human Kinetics.',
    completa: false,
    pendiente: ['Confirmar que el capítulo es de Ross y Marfell-Jones (el catálogo solo confirma el libro) y las páginas'],
  },
  {
    cita: 'Ross, W. D., & Wilson, N. C. (1974). A stratagem for proportional growth assessment. Acta Paediatrica Belgica, 28(Supl.), 169–182.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/4446980/',
    completa: false,
    pendiente: ['El registro de PubMed confirma título, revista, volumen y páginas, pero no mostró la lista de autores'],
  },
]
