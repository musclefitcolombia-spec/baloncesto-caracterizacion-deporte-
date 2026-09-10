export interface Posicion {
  id: string
  nombre: string
  nombreIngles: string
  numero: string
  funcion: string
}

export const posiciones: Posicion[] = [
  {
    id: 'base',
    nombre: 'Base',
    nombreIngles: 'Point Guard',
    numero: '1',
    funcion: 'Dirige el juego del equipo, organiza el ataque y suele ser el mejor manejador de balón.',
  },
  {
    id: 'escolta',
    nombre: 'Escolta',
    nombreIngles: 'Shooting Guard',
    numero: '2',
    funcion: 'Anota principalmente desde el exterior; combina tiro perimetral con capacidad de penetración.',
  },
  {
    id: 'alero',
    nombre: 'Alero',
    nombreIngles: 'Small Forward',
    numero: '3',
    funcion: 'Jugador versátil, capaz de anotar por dentro y por fuera, y de defender a varias posiciones.',
  },
  {
    id: 'ala-pivot',
    nombre: 'Ala-Pívot',
    nombreIngles: 'Power Forward',
    numero: '4',
    funcion: 'Aporta fuerza física y rebote, con presencia tanto cerca del aro como en el perímetro.',
  },
  {
    id: 'pivot',
    nombre: 'Pívot',
    nombreIngles: 'Center',
    numero: '5',
    funcion: 'Domina la zona cercana al aro: rebote, bloqueos y anotación de corta distancia.',
  },
]
