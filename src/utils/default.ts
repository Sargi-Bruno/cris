import { Power, Ritual, Misc, Protection, Weapon, CursedItem } from '../types'

export const powerDefault: Power = {
  name: '',
  description: ''
}

export const ritualDefault: Ritual = {
  name: '',
  description: '',
  circle: '1',
  element: 'Conhecimento',
  execution: 'Padrão',
  range: 'Pessoal',
  area: '',
  target: '',
  effect: '',
  duration: '',
  save: '',
}

export const miscDefault: Misc = {
  name: '',
  description: '',
  category: '0',
  slots: 1,
  tag: 'Acessórios',
  itemType: 'misc',
}

export const protectionDefault: Protection = {
  name: '',
  description: '',
  defense: 0,
  category: '0',
  slots: 1,
  itemType: 'protection',
}

export const weaponDefault: Weapon = {
  name: '',
  description: '',
  proficiencie: 'Armas Simples',
  type: 'Corpo a Corpo',
  handling: 'Leve',
  damage: '1d4',
  criticalMult: 2,
  criticalRange: 20,
  damageType: 'Balístico',
  range: '-',
  category: '0',
  slots: '1',
  itemType: 'weapon',
}

export const cursedItemDefault: CursedItem = {
  name: '',
  description: '',
  element: 'Conhecimento',
  category: 'II',
  slots: '1',
  itemType: 'cursedItem',
}
