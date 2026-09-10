export interface NavItem {
  path: string
  label: string
  shortLabel: string
  number: string
}

export const navItems: NavItem[] = [
  { path: '/', label: 'Inicio', shortLabel: 'Inicio', number: '00' },
  { path: '/historia', label: 'Historia', shortLabel: 'Historia', number: '01' },
  { path: '/clasificacion', label: 'Clasificación y categorías', shortLabel: 'Categorías', number: '02' },
  { path: '/reglamento', label: 'Reglamento y material', shortLabel: 'Reglamento', number: '03' },
  { path: '/demandas', label: 'Demandas físicas y fisiológicas', shortLabel: 'Demandas', number: '04' },
  { path: '/posiciones', label: 'Perfil por posición', shortLabel: 'Posiciones', number: '05' },
  { path: '/desarrollo-juvenil', label: 'Desarrollo juvenil y lesiones', shortLabel: 'Juvenil', number: '06' },
  { path: '/atletas', label: 'Atletas referentes', shortLabel: 'Atletas', number: '07' },
  { path: '/ventanas-entrenabilidad', label: 'Ventanas de entrenabilidad', shortLabel: 'Ventanas', number: '08' },
  { path: '/deteccion-talento', label: 'Detección de talento', shortLabel: 'Detección', number: '09' },
  { path: '/referencias', label: 'Referencias', shortLabel: 'Referencias', number: '10' },
]
