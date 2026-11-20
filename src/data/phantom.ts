// Datos de la Calculadora Z Phantom.
//
// Los valores P y s, los exponentes d, los perímetros corregidos, los índices y los perfiles
// deportivos se copiaron SIN CAMBIOS del componente original (docs/calculadora-phantom.html); la
// prueba src/lib/phantom.test.ts los compara contra ese archivo para detectar cualquier cambio.
//
// Procedencia declarada por el componente original (no verificada de forma independiente aquí):
//  - P y s: Ross y Wilson (1974); Ross y Marfell-Jones (1991); tabla recopilada en Esparza (1993).
//  - Perímetros corregidos: Kerr (1988).
//  - Perfiles Z de la matriz deportiva: valores ORIENTATIVOS construidos por el autor del componente
//    a partir de tendencias morfológicas descritas en la literatura; no son valores medidos.

/** Talla del Phantom (cm) y desviación estándar de la talla para el Z de la talla sin escalar. */
export const H_PH = 170.18
export const S_TALLA = 6.29

// [clave, etiqueta, unidad, P, s, d]
export type VariablePhantom = readonly [string, string, string, number, number, number]

export interface GrupoPhantom {
  id: string
  titulo: string
  nota: string
  vars: readonly VariablePhantom[]
}

export const GRUPOS: readonly GrupoPhantom[] = [
  {
    id: 'basicas',
    titulo: 'Básicas',
    nota: 'kg / cm',
    vars: [
      ['peso', 'Peso corporal', 'kg', 64.58, 8.6, 3],
      ['tallaSentado', 'Talla sentado', 'cm', 89.92, 4.5, 1],
      ['envergadura', 'Envergadura', 'cm', 172.35, 7.41, 1],
    ],
  },
  {
    id: 'pliegues',
    titulo: 'Pliegues cutáneos',
    nota: 'en milímetros (mm)',
    vars: [
      ['plTriceps', 'Tríceps', 'mm', 15.4, 4.47, 1],
      ['plSubescapular', 'Subescapular', 'mm', 17.2, 5.07, 1],
      ['plBiceps', 'Bíceps', 'mm', 8.0, 2.0, 1],
      ['plPectoral', 'Pectoral', 'mm', 11.8, 3.27, 1],
      ['plCresta', 'Cresta ilíaca (supracrestal)', 'mm', 22.4, 6.8, 1],
      ['plSupraespinal', 'Supraespinal', 'mm', 15.4, 4.47, 1],
      ['plAbdominal', 'Abdominal', 'mm', 25.4, 7.78, 1],
      ['plMuslo', 'Muslo anterior', 'mm', 27.0, 8.33, 1],
      ['plPierna', 'Pierna medial', 'mm', 16.0, 4.67, 1],
    ],
  },
  {
    id: 'perimetros',
    titulo: 'Perímetros',
    nota: 'en centímetros (cm)',
    vars: [
      ['peCabeza', 'Cabeza', 'cm', 56.0, 1.44, 1],
      ['peCuello', 'Cuello', 'cm', 34.91, 1.73, 1],
      ['peBrazoRel', 'Brazo relajado', 'cm', 26.89, 2.33, 1],
      ['peBrazoFlex', 'Brazo flexionado y contraído', 'cm', 29.41, 2.37, 1],
      ['peAntebrazo', 'Antebrazo', 'cm', 25.13, 1.41, 1],
      ['peMuneca', 'Muñeca', 'cm', 16.35, 0.72, 1],
      ['peTorax', 'Tórax (mesoesternal)', 'cm', 87.86, 5.18, 1],
      ['peCintura', 'Cintura (mínima)', 'cm', 71.91, 4.45, 1],
      ['peUmbilical', 'Abdominal (umbilical)', 'cm', 79.06, 6.95, 1],
      ['peCadera', 'Cadera (glúteo)', 'cm', 94.67, 5.58, 1],
      ['peMuslo', 'Muslo (1 cm bajo glúteo)', 'cm', 55.82, 4.23, 1],
      ['pePierna', 'Pierna (máxima)', 'cm', 35.25, 2.3, 1],
      ['peTobillo', 'Tobillo', 'cm', 21.71, 1.33, 1],
    ],
  },
  {
    id: 'diametros',
    titulo: 'Diámetros óseos',
    nota: 'en centímetros (cm)',
    vars: [
      ['diBiacromial', 'Biacromial', 'cm', 38.04, 1.92, 1],
      ['diTransTorax', 'Transverso del tórax', 'cm', 27.92, 1.74, 1],
      ['diAPTorax', 'Anteroposterior del tórax', 'cm', 17.5, 1.38, 1],
      ['diBiiliocrestal', 'Biiliocrestal', 'cm', 28.84, 1.75, 1],
      ['diHumero', 'Biepicondilar del húmero', 'cm', 6.48, 0.35, 1],
      ['diBiestiloideo', 'Biestiloideo (muñeca)', 'cm', 5.21, 0.28, 1],
      ['diFemur', 'Bicondilar del fémur', 'cm', 9.52, 0.48, 1],
      ['diBimaleolar', 'Bimaleolar (tobillo)', 'cm', 6.68, 0.36, 1],
      ['diMano', 'Anchura de la mano', 'cm', 8.28, 0.5, 1],
      ['diPie', 'Anchura del pie', 'cm', 10.34, 0.65, 1],
    ],
  },
  {
    id: 'longitudes',
    titulo: 'Alturas y longitudes',
    nota: 'en centímetros (cm)',
    vars: [
      ['alAcromial', 'Altura acromial', 'cm', 139.37, 5.45, 1],
      ['alRadial', 'Altura radial', 'cm', 107.25, 5.37, 1],
      ['alIleoespinal', 'Altura ileoespinal', 'cm', 94.11, 4.71, 1],
      ['alTrocanterea', 'Altura trocantérea', 'cm', 86.4, 4.32, 1],
      ['alTibial', 'Altura tibial', 'cm', 44.82, 2.56, 1],
      ['loExtSup', 'Long. extremidad superior', 'cm', 75.95, 3.64, 1],
      ['loBrazo', 'Long. brazo (acromial-radial)', 'cm', 32.53, 1.77, 1],
      ['loAntebrazo', 'Long. antebrazo (radial-estilión)', 'cm', 24.57, 1.37, 1],
      ['loMano', 'Long. mano', 'cm', 18.85, 0.85, 1],
      ['loMuslo', 'Long. muslo', 'cm', 41.37, 2.48, 1],
      ['loPierna', 'Long. pierna', 'cm', 37.72, 2.15, 1],
      ['loPie', 'Long. pie', 'cm', 25.5, 1.16, 1],
    ],
  },
  {
    id: 'masas',
    titulo: 'Masas fraccionadas (opcional)',
    nota: 'en kilogramos (kg) · d = 3',
    vars: [
      ['maOsea', 'Masa ósea', 'kg', 10.49, 1.57, 3],
      ['maMuscular', 'Masa muscular', 'kg', 25.55, 2.99, 3],
      ['maResidual', 'Masa residual', 'kg', 16.41, 1.9, 3],
      ['maGrasa', 'Masa grasa', 'kg', 12.13, 3.25, 3],
    ],
  },
]

// Perímetros corregidos (Kerr, 1988): [clave, etiqueta, perímetro, pliegue, P, s]
export const CORREGIDOS: readonly (readonly [string, string, string, string, number, number])[] = [
  ['coBrazo', 'Brazo relajado corregido', 'peBrazoRel', 'plTriceps', 22.05, 1.91],
  ['coTorax', 'Tórax corregido', 'peTorax', 'plSubescapular', 82.46, 4.86],
  ['coMuslo', 'Muslo corregido', 'peMuslo', 'plMuslo', 47.34, 3.59],
  ['coPierna', 'Pierna corregida', 'pePierna', 'plPierna', 30.22, 1.97],
]

/** Datos del botón "Cargar ejemplo" (varón de 21 años, muy musculoso). */
export const EJEMPLO: Record<string, number> = {
  talla: 175,
  peso: 82,
  tallaSentado: 91.5,
  envergadura: 178,
  plTriceps: 9,
  plSubescapular: 12,
  plBiceps: 4,
  plCresta: 14,
  plSupraespinal: 8,
  plAbdominal: 14,
  plMuslo: 12,
  plPierna: 6,
  peBrazoRel: 36,
  peBrazoFlex: 39,
  peAntebrazo: 30,
  peMuneca: 17.5,
  peTorax: 104,
  peCintura: 84,
  peCadera: 99,
  peMuslo: 60,
  pePierna: 38,
  diBiacromial: 42,
  diBiiliocrestal: 28.5,
  diHumero: 7.2,
  diBiestiloideo: 5.8,
  diFemur: 10.1,
}

// Índices de la matriz de orientación deportiva.
// T talla, G adiposidad, M muscularidad, O robustez ósea, P peso proporcional, E envergadura,
// H hombros, C tronco. `mod` indica si el rasgo es entrenable (true) o estructural (false).
export interface IndiceDef {
  k: 'T' | 'G' | 'M' | 'O' | 'P' | 'E' | 'H' | 'C'
  nom: string
  mod: boolean
}

export const INDICES: readonly IndiceDef[] = [
  { k: 'T', nom: 'Talla', mod: false },
  { k: 'G', nom: 'Adiposidad', mod: true },
  { k: 'M', nom: 'Muscularidad', mod: true },
  { k: 'O', nom: 'Robustez ósea', mod: false },
  { k: 'P', nom: 'Peso', mod: true },
  { k: 'E', nom: 'Envergadura', mod: false },
  { k: 'H', nom: 'Hombros', mod: false },
  { k: 'C', nom: 'Tronco', mod: false },
]

//                                  deporte, [T, G, M, O, P, E, H, C], rasgo clave
export type DeporteDef = readonly [string, readonly number[], string]

export const DEPORTES: readonly DeporteDef[] = [
  ['Baloncesto', [2.5, -0.5, 0.0, 0.0, 0.0, 1.0, 0.5, -0.5], 'Gran talla y brazos largos'],
  ['Voleibol', [2.0, -0.7, 0.0, 0.0, -0.3, 1.0, 0.5, -0.5], 'Talla alta, piernas largas, peso liviano'],
  ['Balonmano', [1.5, -0.3, 1.0, 0.7, 1.0, 0.8, 1.0, 0.0], 'Alto, robusto y de hombros anchos'],
  ['Fútbol', [0.0, -1.0, 0.8, 0.3, 0.3, 0.0, 0.0, 0.0], 'Perfil equilibrado, poca grasa, piernas fuertes'],
  ['Rugby (delanteros)', [1.0, 0.5, 2.0, 1.5, 2.5, 0.3, 1.5, 0.5], 'Mucha masa, hueso grueso y potencia'],
  ['Tenis', [1.0, -0.8, 0.8, 0.3, 0.0, 0.5, 0.3, 0.0], 'Alto, ágil y de brazos largos'],
  ['Halterofilia', [-1.0, 0.0, 3.0, 1.5, 2.5, -0.3, 1.0, 1.0], 'Muy musculoso, tronco largo, palancas cortas'],
  ['Powerlifting', [-0.5, 0.5, 3.0, 1.5, 3.0, 0.0, 1.0, 0.8], 'Máxima masa muscular y ósea'],
  ['CrossFit / entrenamiento funcional', [-0.3, -0.8, 2.2, 0.8, 1.3, 0.0, 1.0, 0.3], 'Musculoso y magro'],
  ['Gimnasia artística', [-2.0, -1.5, 1.5, 0.5, 0.0, 0.0, 1.0, 0.3], 'Baja talla, muy magro, gran fuerza relativa'],
  ['Escalada deportiva', [-0.5, -1.5, 1.2, 0.0, -1.0, 1.0, 0.3, 0.0], 'Liviano, magro y de brazos largos'],
  ['Atletismo: velocidad (100-400 m)', [0.5, -1.5, 1.5, 0.0, 0.3, 0.3, 0.5, -0.5], 'Magro, musculoso y de piernas largas'],
  ['Atletismo: fondo (5 km-maratón)', [-0.3, -1.8, -0.5, -0.5, -1.5, 0.0, -0.5, -0.3], 'Muy liviano y magro, hueso fino'],
  ['Atletismo: saltos', [1.2, -1.5, 0.0, -0.3, -0.7, 0.5, 0.0, -1.0], 'Alto, liviano y de piernas muy largas'],
  ['Atletismo: lanzamientos', [1.5, 0.5, 2.0, 1.5, 2.5, 1.0, 1.5, 0.0], 'Grande, pesado y de brazos largos'],
  ['Natación', [1.2, -0.5, 0.8, 0.0, 0.3, 1.5, 1.5, 0.5], 'Brazos largos, hombros anchos, tronco largo'],
  ['Remo', [1.5, -0.5, 1.0, 0.7, 1.0, 1.0, 0.8, 0.0], 'Alto, pesado y de palancas largas'],
  ['Ciclismo de ruta', [0.0, -1.5, 0.0, -0.3, -1.0, 0.0, -0.5, -0.3], 'Liviano y magro, hombros estrechos'],
  ['Triatlón', [0.3, -1.5, 0.3, 0.0, -0.7, 0.5, 0.3, 0.0], 'Magro, liviano y versátil'],
  ['Patinaje de velocidad', [-0.3, -0.8, 1.5, 0.3, 0.3, 0.0, 0.0, 0.5], 'Muslos muy desarrollados, centro de gravedad bajo'],
  ['Lucha olímpica', [-0.5, -0.5, 2.5, 1.2, 1.5, 0.3, 1.2, 0.8], 'Compacto, muy musculoso y robusto'],
  ['Judo', [0.0, -0.3, 2.0, 1.0, 1.2, 0.3, 1.0, 0.5], 'Robusto y musculoso'],
  ['Boxeo', [0.0, -1.0, 1.5, 0.3, 0.3, 1.0, 0.8, 0.0], 'Magro, musculoso y de brazos largos'],
  ['Taekwondo', [0.5, -1.2, 0.5, -0.3, -0.8, 0.5, 0.0, -1.0], 'Liviano y de piernas largas'],
  ['Esgrima', [1.0, -0.8, 0.0, 0.0, -0.3, 1.0, 0.0, -0.3], 'Alto y de gran alcance'],
]
