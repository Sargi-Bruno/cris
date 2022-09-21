export interface Power {
  name: string,
  description: string,
  id?: string
}

export interface Path {
  name: string,
  description: string,
  abilities: Array<Power>,
}

export interface ParanormalPower {
  name: string,
  description: string,
  element: string,
  id?: string
}

export interface Modification {
  name: string,
  description: string,
  itemType: string,
  id?: string
}

export interface Curse {
  name: string,
  description: string,
  element: string,
  itemType: string,
  id?: string
}

export interface CursedItem {
  name: string,
  description: string,
  element: string,
  id?: string
}

export interface Ammunition {
  name: string,
  description: string,
  category: string,
  slots: number | string,
  id?: string
}

export interface Background {
  name: string,
  description: string,
  skills: Array<string>,
  power: Power,
  id?: string
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
  id?: string
}

export interface Weapon {
  name: string,
  description: string,
  proficiencie: string,
  type: string,
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
  id?: string
  itemType: string,
}

export interface Protection {
  name: string,
  description: string,
  defense: number,
  category: string,
  slots: number | string,
  mods?: Array<Modification>,
  curses?: Array<Curse>,
  id?: string
  itemType: string,
}

export interface Misc {
  name: string,
  description: string,
  category: string,
  slots: number | string,
  tag: string,
  mods?: Array<Modification>,
  curses?: Array<Curse>,
  id?: string
  itemType: string,
}

export interface Ritual {
  name: string,
  description: string,
  circle: string,
  element: string,
  execution: string,
  range: string,
  area?: string,
  target?: string,
  effect?: string,
  duration?: string,
  save?: string,
  id?: string
}

export interface Skill {
  name: string,
  description: string,
  attribute: string,
  trainingDegree: string,
  bonus: number,
  otherBonus: number,
  loadPenalty: boolean,
  onlyTrained: boolean,
  id?: string
}

export interface Attack {
  name: string,
  attackBonus: number,
  damage: string,
  extraDamage: string,
  criticalRange: number,
  criticalMult: number,
  damageType: string,
  range: string,
  skillUsed: string,
  damageAttribute: string
  id?: string
}

export interface Character {
  name: string,
  player: string,
  attributes: {
    str: number,
    dex: number,
    int: number,
    con: number,
    pre: number,
  },
  backgroundName: string,
  className: string,
  nex: string,
  movement: number,
  maxPv: number,
  currentPv: number,
  maxPe: number,
  currentPe: number,
  maxSan: number,
  currentSan: number,
  defense: number,
  protectionDefense: number,
  bonusDefense: number,
  currentProtection: string,
  resistances: string,
  skills: Array<Skill>,
  attacks: Array<Attack>,
  powers: Array<Power>,
  rituals: Array<Ritual>,
  ritualsDc: number,
  patent: string,
  prestigePoints: number,
  inventory: Array<Weapon | Protection | Misc>,
  itemsLimit: {
    I: string,
    II: string,
    III: string,
    IV: string
  },
  creditsLimit: string,
  maxLoad: number,
  currentLoad: number,
  description: {
    physical: string,
    personal: string,
    history: string,
    goal: string,
  }
  id?: string
}
