interface Power {
  name: string,
  description: string,
}

interface Path {
  name: string,
  description: string,
  abilities: Array<Power>,
}

export interface ParanormalPower {
  name: string,
  description: string,
  element: string,
}

export interface Modification {
  name: string,
  description: string,
  itemType: string,
}

export interface Curse {
  name: string,
  description: string,
  element: string,
  itemType: string,
}

export interface CursedItem {
  name: string,
  description: string,
  element: string,
}

export interface Ammunition {
  name: string,
  description: string,
  category: string,
  slots: number | string,
}

export interface Background {
  name: string,
  description: string,
  skills: Array<string>,
  power: Power,
}

export interface Class {
  name: string,
  shortDescription: string
  description: string,
  initialPv: number,
  levelPv: number,
  initialPe: number,
  levelPe: number,
  initialSan: number,
  levelSan: number,
  trainedSkills: {
    skills: Array<string>,
    optionSkils: Array<Array<string>>
    quantity: number,
  },
  proficiencies: Array<string>,
  proficienciesGradeQuantity: number,
  abilities: Array<Power>,
  powers: Array<Power>,
  paths: Array<Path>,
  table: Array<string>,
}

export interface Weapon {
  name: string,
  description: string,
  proficiencie: string,
  type: string,
  rangeType?: string,
  handling: string,
  damage: string,
  secondaryDamage?: string,
  criticalMult: number,
  criticalRange: number,
  damageType: string,
  range: string,
  category: string,
  slots: number | string,
  ammunition?: Ammunition,
  mods?: Array<Modification>,
  curses?: Array<Curse>,
}

export interface Protection {
  name: string,
  description: string,
  defense: number,
  category: string,
  slots: number | string,
  mods?: Array<Modification>,
  curses?: Array<Curse>,
}

export interface Misc {
  name: string,
  description: string,
  category: string,
  slots: number | string,
  tag: string,
  mods?: Array<Modification>,
  curses?: Array<Curse>,
}

export interface Ritual {
  name: string,
  description: string,
  circle: string,
  element: string,
  execution: string,
  range: string,
  target?: string,
  duration?: string,
  area?: string,
  save?: string,
  effect?: string,
}
