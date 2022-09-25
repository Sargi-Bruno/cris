export interface Power {
  name: string
  description: string
  id?: string
}

export interface Path {
  name: string
  description: string
  abilities: Array<Power>
}

export interface ParanormalPower {
  name: string
  description: string
  element: string
  id?: string
}

export interface Modification {
  name: string
  description: string
  itemType: string
  id?: string
}

export interface Curse {
  name: string
  description: string
  element: string
  itemType: string
  id?: string
}

export interface CursedItem {
  name: string
  description: string
  element: string
  id?: string
}

export interface Ammunition {
  name: string
  description: string
  category: string
  slots: number | string
  id?: string
}

export interface Background {
  name: string
  description: string
  skills: Array<string>
  power: Power
  id?: string
}

export interface Class {
  name: string
  shortDescription: string
  description: string
  initialPv: number
  levelPv: number
  initialPe: number
  levelPe: number
  initialSan: number
  levelSan: number
  trainedSkills: {
    skills: Array<string>
    optionSkils: Array<Array<string>>
    quantity: number
  },
  proficiencies: Array<string>
  proficienciesGradeQuantity: number
  abilities: Array<Power>
  powers: Array<Power>
  paths: Array<Path>
  table: Array<string>
  id?: string
}

export interface Weapon {
  name: string
  description: string
  proficiencie: string
  type: string
  handling: string
  damage: string
  secondaryDamage?: string
  criticalMult: number
  criticalRange: number
  damageType: string
  range: string
  category: string
  slots: number | string
  ammunition?: Ammunition
  mods?: Array<Modification>
  curses?: Array<Curse>
  id?: string
  itemType: string
  equipped?: boolean
}

export interface Protection {
  name: string
  description: string
  defense: number
  category: string
  slots: number | string
  mods?: Array<Modification>
  curses?: Array<Curse>
  id?: string
  itemType: string
  equipped?: boolean
}

export interface Misc {
  name: string
  description: string
  category: string
  slots: number | string
  tag: string
  mods?: Array<Modification>
  curses?: Array<Curse>
  id?: string
  itemType: string
  equipped?: boolean
}

export interface Ritual {
  name: string
  description: string
  circle: string
  element: string
  execution: string
  range: string
  area?: string
  target?: string
  effect?: string
  duration?: string
  save?: string
  id?: string
}

export interface Skill {
  name: string
  description: string
  attribute: string
  trainingDegree: string
  bonus: number
  otherBonus: number
  loadPenalty: boolean
  onlyTrained: boolean
  id?: string
}

export interface Attack {
  name: string
  attackBonus: number
  damage: string
  extraDamage: string
  criticalRange: number
  criticalMult: number
  damageType: string
  range: string
  skillUsed: string
  damageAttribute: string
  id?: string
  itemId?: string
}

export interface Character {
  name: string
  player: string
  attributes: {
    str: number
    dex: number
    int: number
    con: number
    pre: number
  },
  backgroundName: string
  className: string
  nex: string
  movement: number
  maxPv: number
  currentPv: number
  maxPe: number
  currentPe: number
  maxSan: number
  currentSan: number
  protectionDefense: number
  bonusDefense: number
  currentProtection: string
  resistances: string
  skills: Array<Skill>
  attacks: Array<Attack>
  powers: Array<Power>
  rituals: Array<Ritual>
  ritualsDc: number
  patent: string
  prestigePoints: number
  inventory: Array<Weapon | Protection | Misc>
  itemsLimit: {
    I: number
    II: number
    III: number
    IV: number
  },
  creditsLimit: string
  maxLoad: number
  currentLoad: number
  description: {
    physical: string
    personal: string
    history: string
    goal: string
  }
  uid?: string
  id?: string
  timestamp?: unknown
}

const characterStringKeysList = ['name', 'player'] as const
export type CharacterStringKeys = typeof characterStringKeysList[number]

const characterNumberKeysList = ['movement', 'maxPv', 'currentPv', 'maxPe', 'currentPe', 'maxSan', 'currentSan', 'protectionDefense', 'bonusDefense'] as const
export type CharacterNumberKeys = typeof characterNumberKeysList[number]

const characterDropdownKeysList = ['nex'] as const
export type CharacterDropdownKeys = typeof characterDropdownKeysList[number]

const attrList = ['str', 'dex', 'int', 'con', 'pre'] as const
export type AttrKeys = typeof attrList[number]

const attrPtList = ['FOR', 'AGI', 'INT', 'VIG', 'PRE'] as const
export type AttrPtKeys = typeof attrPtList[number]

const attrDamageList = ['Força', 'Agilidade', 'Intelecto', 'Vigor', 'Presença'] as const
export type AttrDamageKeys = typeof attrDamageList[number]

const attackStringKeyList = ['name', 'damage', 'extraDamage'] as const
export type AttackStringKeys = typeof attackStringKeyList[number]

const attackNumberKeyList = ['attackBonus', 'criticalRange', 'criticalMult'] as const
export type AttackNumberKeys = typeof attackNumberKeyList[number]

const attackDropdownKeyList = ['damageType', 'range', 'skillUsed', 'damageAttribute'] as const
export type AttackDropdownKeys = typeof attackDropdownKeyList[number]

const skillDropdownKeyList = ['attribute', 'trainingDegree'] as const
export type SkillDropdownKeys = typeof skillDropdownKeyList[number]

const descriptionKeyList = ['physical', 'personal', 'history', 'goal'] as const
export type DescriptionKeys = typeof descriptionKeyList[number]

const inventoryDropdownKeyList = ['patent', 'creditsLimit'] as const
export type InventoryDropdownKeys = typeof inventoryDropdownKeyList[number]

const inventoryNumberKeyList = ['currentLoad', 'maxLoad', 'prestigePoints'] as const
export type InventoryNumberKeys = typeof inventoryNumberKeyList[number]

const itemsLimitKeyList = ['I', 'II', 'III', 'IV'] as const
export type ItemsLimitKeys = typeof itemsLimitKeyList[number]

export interface Timestamp {
  seconds: number
  nanoseconds: number
}
