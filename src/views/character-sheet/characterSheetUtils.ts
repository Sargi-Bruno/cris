import { Character, Attack, Weapon, Protection } from "../../types"
import Skills from "../../data/skills"
import { v4 as uuidv4 } from 'uuid'

export const characterDefaultValue: Character = {
  name: 'Adam',
  player: 'Bruno',
  attributes: {
    str: 1,
    dex: 1,
    int: 1,
    con: 1,
    pre: 1,
  },
  backgroundName: 'T.I.',
  className: 'Combatente',
  nex: '5%',
  movement: 9,
  maxPv: 0,
  currentPv: 0,
  maxPe: 0,
  currentPe: 0,
  maxSan: 0,
  currentSan: 0,
  protectionDefense: 0,
  bonusDefense: 0,
  currentProtection: '',
  resistances: '',
  skills: Skills,
  attacks: [],
  powers: [],
  rituals: [],
  ritualsDc: 0,
  patent: 'Recruta',
  prestigePoints: 0,
  inventory: [],
  itemsLimit: {
    I: '2',
    II: '-',
    III: '-',
    IV: '-',
  },
  creditsLimit: 'Baixo',
  maxLoad: 0,
  currentLoad: 0,
  description: {
    physical: '',
    personal: '',
    history: '',
    goal: '',
  }
}

export const attackDefaultValue: Attack = {
  name: '',
  attackBonus: 0,
  damage: '0',
  extraDamage: '0',
  criticalRange: 20,
  criticalMult: 2,
  damageType: '',
  range: '',
  skillUsed: 'Luta',
  damageAttribute: 'Força'
}

export const equipItem = (character: Character, index: number) => {
  if(character.inventory[index].itemType === 'weapon') {
    const weapon = (character.inventory[index] as Weapon)
    const newAttack = {...attackDefaultValue}
    newAttack.id = uuidv4()
    newAttack.itemId = weapon.id
    newAttack.name = weapon.name
    newAttack.damage = weapon.damage
    newAttack.criticalRange = weapon.criticalRange
    newAttack.criticalMult = weapon.criticalMult
    newAttack.damageType = weapon.damageType
    newAttack.range = weapon.range

    if(weapon.type !== 'Corpo a Corpo') {
      newAttack.skillUsed = 'Pontaria'
      newAttack.damageAttribute = 'Nenhum'
    }

    character.attacks.push(newAttack)
  }

  if(character.inventory[index].itemType === 'protection') {
    const protection = (character.inventory[index] as Protection)

    character.protectionDefense += protection.defense

    if(character.currentProtection === '') character.currentProtection += protection.name
    else character.currentProtection += ` ${protection.name}`
  }
}

export const unequipItem = (character: Character, index: number) => {
  if(character.inventory[index].itemType === 'weapon') {
    const weapon = (character.inventory[index] as Weapon)
    const attackIndex = character.attacks.findIndex((ele) => ele.itemId === weapon.id)
    character.attacks.splice(attackIndex, 1)
  }

  if(character.inventory[index].itemType === 'protection') {
    const protection = (character.inventory[index] as Protection)

    character.protectionDefense -= protection.defense
    character.currentProtection = character.currentProtection.replace(protection.name, '')
    character.currentProtection = character.currentProtection.trim()
  }
}
