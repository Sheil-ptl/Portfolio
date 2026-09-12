export interface ConstellationNode {
  id: string
  x: number
  y: number
  label: string
  interactive: boolean
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'meissa', x: 24, y: 8, label: 'Meissa', interactive: false },
  { id: 'betelgeuse', x: 34, y: 18, label: 'Betelgeuse', interactive: false },
  { id: 'bellatrix', x: 14, y: 22, label: 'Bellatrix', interactive: false },
  { id: 'mintaka', x: 28, y: 42, label: 'Mintaka', interactive: false },
  { id: 'alnilam', x: 22, y: 45, label: 'Currently Listening', interactive: true },
  { id: 'alnitak', x: 16, y: 48, label: 'Alnitak', interactive: false },
  { id: 'hatysa', x: 21, y: 58, label: 'Hatysa', interactive: false },
  { id: 'saiph', x: 28, y: 78, label: 'Training For', interactive: true },
  { id: 'rigel', x: 12, y: 74, label: 'Next Hike', interactive: true },
]

export const CONSTELLATION_LINES: [string, string][] = [
  ['betelgeuse', 'meissa'], // shoulder to head
  ['bellatrix', 'meissa'], // shoulder to head
  ['betelgeuse', 'mintaka'], // shoulder down to belt
  ['bellatrix', 'alnitak'], // shoulder down to belt
  ['mintaka', 'alnilam'], // belt
  ['alnilam', 'alnitak'], // belt
  ['mintaka', 'saiph'], // belt to leg
  ['alnitak', 'rigel'], // belt to leg
  ['alnilam', 'hatysa'], // the sword, hanging below the belt
]