import Skills from "../../data/skills"
import { v4 as uuidv4 } from 'uuid'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { 
  Character,
  Attack,
  Power, 
  Ritual, 
  Weapon, 
  Protection, 
  Misc, 
  Skill,
  AttrKeys,
  CharacterNumberKeys, 
  AttackNumberKeys,
  InventoryNumberKeys,
  ItemsLimitKeys,
  AttrPtKeys,
  AttrDamageKeys
} from "../../types"

export const characterDefaultValue: Character = {
  name: '',
  player: '',
  attributes: {
    str: 0,
    dex: 0,
    int: 0,
    con: 0,
    pre: 0,
  },
  backgroundName: '',
  className: '',
  nex: '',
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
  patent: '',
  prestigePoints: 0,
  inventory: [],
  itemsLimit: {
    I: 0,
    II: 0,
    III: 0,
    IV: 0,
  },
  creditsLimit: '',
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
  damage: '',
  extraDamage: '',
  criticalRange: 20,
  criticalMult: 2,
  damageType: '-',
  range: '-',
  skillUsed: 'Luta',
  damageAttribute: 'Força'
}

export const attrDic = {
  str: 'Força',
  dex: 'Agilidade',
  int: 'Inteligência',
  con: 'Vigor',
  pre: 'Presença'
}

const attrShortDic = {
  FOR: 'str',
  AGI: 'dex',
  INT: 'int',
  PRE: 'pre',
  VIG: 'con'
}

const attrDamageDic = {
  'Força': 'str',
  'Agilidade': 'dex',
  'Intelecto': 'int',
  'Vigor': 'con',
  'Presença': 'pre'
}

const attrLongToShortDic = {
  'Força': 'FOR',
  'Agilidade': 'AGI',
  'Intelecto': 'INT',
  'Vigor': 'VIG',
  'Presença': 'PRE',
}

const formatValueNumbers = (value: number, limit: 1 | 2 | 3, floor = true, noNegative = true) => {
  const digitisLimit = {
    1: 9,
    2: 99,
    3: 999,
  }
  const negativeDigitisLimit = {
    1: -9,
    2: -99,
    3: -999
  }

  if(isNaN(value)) value = 0
  if(value > digitisLimit[limit]) value = digitisLimit[limit]

  if(noNegative) {
    if(value < 0) value = 0
  } else {
    if(value < negativeDigitisLimit[limit]) value = negativeDigitisLimit[limit]
  }

  if(floor) return Math.floor(value)
  else return value
}

export const changeCharNumber = (character: Character, value: number, key: CharacterNumberKeys) => {
  if(key === 'currentPv' || key === 'currentPe' || key === 'currentSan' || key === 'bonusDefense') character[key] = formatValueNumbers(value, 3, true, false)
  else if(key === 'movement') character[key] = formatValueNumbers(value, 3, false, true)
  else character[key] = formatValueNumbers(value, 3)
}

export const changeCharAttributes = (character: Character, value: number, key: AttrKeys) => {
  character.attributes[key] = formatValueNumbers(value, 1, true, false)
}

export const changeMovementInSquares = (character: Character, value: number) => {
  if(isNaN(value)) value = 0
  if(value > 666) value = 666
  if(value < 0) value = 0

  if(value === 0) character.movement = 0
  else character.movement = Math.floor(value) * 1.5
}

export const formatRollResult = (output: string) => {
  return output.split('=')[0].split(':')[1]
}

export const formatRollNotation = (output: string) => {
  return output.split('=')[0].split(':')[0]
}

export const rollAttribute = (character: Character, attr: AttrKeys) => {
  let rollString: string
  const attrValue = character.attributes[attr]

  if(attrValue > 0) rollString = `${attrValue}d20kh1`
  else rollString = `${Math.abs(attrValue) + 2}d20kl1`
  
  const roll = new DiceRoll(rollString)

  return roll
}

export const rollDices = (value: string) => {
  const roll = new DiceRoll(value.trim())

  return roll
}

export const rollAttack = (character: Character, attack: Attack) => {
  const rollSkillIndex = character.skills.findIndex((e) => e.name === attack.skillUsed)
  const skill = character.skills[rollSkillIndex]
  const attrSkillValue = character.attributes[attrShortDic[skill.attribute  as AttrPtKeys] as AttrKeys]

  const attackTooltipInfo = `${skill.name} (${skill.attribute})` + (attack.attackBonus !== 0 ? ` + ${attack.attackBonus}` : '')
  const damageTooltipInfo = `${attack.damage}` 
                            + (attack.extraDamage !== '' ? ` + ${attack.extraDamage}` : '')
                            + (attack.damageAttribute !== 'Nenhum' ? ` + ${attrLongToShortDic[attack.damageAttribute as AttrDamageKeys]}` : '')
  const criticalTooltipInfo = `${attack.criticalRange}/x${attack.criticalMult}`
  
  let attackRollString: string

  if(attrSkillValue > 0) 
    attackRollString = `${attrSkillValue}d20kh1` 
                        + (skill.bonus !== 0 ? `+${skill.bonus}` : '')
                        + (attack.attackBonus !== 0 ? `+${attack.attackBonus}` : '')

  else attackRollString = `${Math.abs(attrSkillValue) + 2}d20kl1`
                           + (skill.bonus !== 0 ? `+${skill.bonus}` : '')
                           + (attack.attackBonus !== 0 ? `+${attack.attackBonus}` : '')

  const rollAttack = new DiceRoll(attackRollString.trim())
  const attackTotal = rollAttack.total

  const outputAttackArray = rollAttack.output.substring(rollAttack.output.indexOf('['), rollAttack.output.indexOf(']')).split(',')
  let critical = 0

  if(outputAttackArray.length > 1) {
    outputAttackArray.map(value => {
      if(!value.includes('d')) {
        if(parseInt(value) >= attack.criticalRange) critical = 1
        if(parseInt(value) === 1) critical = -1
        if(parseInt(value) === 1 && attack.criticalRange === 1) critical = 1
      }
    })
  } else {
    const outputAttackString = rollAttack.output.substring(rollAttack.output.indexOf('[') + 1, rollAttack.output.indexOf(']'))

    if(parseInt(outputAttackString) >= attack.criticalRange) critical = 1
    if(parseInt(outputAttackString) === 1) critical = -1
  }

  const damageRollString = attack.damage !== '' ? `${attack.damage}` : '0'
  let damageTotal = 0

  if(critical === 1) {
    for(let x = 0; x < attack.criticalMult; x++) {
      const damageRoll = new DiceRoll(damageRollString.trim())
      damageTotal += damageRoll.total
    }
  } else {
    const damageRoll = new DiceRoll(damageRollString.trim())
    damageTotal += damageRoll.total
  }

  const attrDamageValue = attack.damageAttribute !== 'Nenhum' ? 
                          `${character.attributes[attrDamageDic[attack.damageAttribute as AttrDamageKeys] as AttrKeys]}` : ''

  const extraDamageRollString = attack.extraDamage !== '' ? 
                                `${attack.extraDamage}` + (attrDamageValue !== '' ? `+${attrDamageValue}` : '') : (attrDamageValue !== '' ? `${attrDamageValue}` : '')
  
  if(extraDamageRollString !== '') {
    const extraDamageRoll = new DiceRoll(extraDamageRollString.trim())
    damageTotal += extraDamageRoll.total
  }
  
  return { attackTotal, damageTotal, critical, attackTooltipInfo, damageTooltipInfo, criticalTooltipInfo }
}

export const rollSkill = (character: Character, skill: Skill) => {
  let rollString: string
  const attrValue = character.attributes[attrShortDic[skill.attribute as AttrPtKeys] as AttrKeys]

  if(attrValue > 0) rollString = `${attrValue}d20kh1` + (skill.bonus !== 0 ? `+${skill.bonus}` : '')
  else rollString = `${Math.abs(attrValue) + 2}d20kl1` + (skill.bonus !== 0 ? `+${skill.bonus}` : '')

  const roll = new DiceRoll(rollString.trim())

  return roll
}

export const updateSkillBonus = (character: Character, skillName: string) => {
  const index = character.skills.findIndex((e) => e.name === skillName)
  const skill =  character.skills[index]
  skill.bonus = parseInt(skill.trainingDegree) + skill.otherBonus
}

export const changeSkillOtherBonus = (character: Character, value: number, skillName: string) => {
  const index = character.skills.findIndex((e) => e.name === skillName)
  character.skills[index].otherBonus = formatValueNumbers(value, 2, true, false)
}

export const removeAttack = (character: Character, id: string) => {
  const index = character.attacks.findIndex((e) => e.id === id)

  if(character.attacks[index].itemId) {
    const itemIndex = character.inventory.findIndex((e) => e.id === character.attacks[index].itemId)
    character.inventory[itemIndex].equipped = false
  }
  
  character.attacks.splice(index, 1)
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

export const handleItem = (character: Character, id: string) => {
  const index = character.inventory.findIndex((e) => e.id === id)
  character.inventory[index].equipped = !character.inventory[index].equipped

  if(character.inventory[index].equipped) equipItem(character, index)
  else unequipItem(character, index)
}

export const removeItem = (character: Character, id: string) => {
  const index = character.inventory.findIndex((e) => e.id === id)
  const aux = character.inventory[index]

  let removedLoad

  if(isNaN(aux.slots as number)) removedLoad = 0
  else removedLoad = aux.slots as number

  if(aux.itemType === 'weapon') {
    const weapon = aux as Weapon
    if(weapon.ammunition) removedLoad += weapon.ammunition.slots as number
  }

  character.currentLoad -= removedLoad

  console.log(character.inventory[index])
  if(character.inventory[index].equipped) unequipItem(character, index)

  character.inventory.splice(index, 1)
}

export const changeAttackNumber = (character: Character, value: number, id: string, key: AttackNumberKeys) => {
  const index = character.attacks.findIndex((e) => e.id === id)

  if(key === 'criticalRange') {
    if(isNaN(value)) value = 20
    if(value > 20) value = 20
    if(value < 1) value = 1
  } else if(key === 'criticalMult') {
    value = formatValueNumbers(value, 2)
  } else {
    value = formatValueNumbers(value, 3, true, false)
  }

  character.attacks[index][key] = value
}

export const changeInventoryNumber = (character: Character, value: number, key: InventoryNumberKeys) => {
  character[key] = formatValueNumbers(value, 3)
}

export const changeItemsLimit = (character: Character, value: number, key: ItemsLimitKeys) => {
  character.itemsLimit[key] = formatValueNumbers(value, 2)
}

export const addPower = (character: Character, power: Power) => {
  const aux = {...power}
  aux.id = uuidv4()
  character.powers.push(aux)
}

export const addRitual = (character: Character, ritual: Ritual) => {
  const aux = {...ritual}
  aux.id = uuidv4()
  character.rituals.push(aux)
}

export const addItem = (character: Character, item: Weapon | Protection | Misc) => {
  const aux = {...item}
  aux.id = uuidv4()
  aux.equipped = false

  let addedLoad

  if(isNaN(aux.slots as number)) addedLoad = 0
  else addedLoad = aux.slots as number

  if(aux.itemType === 'weapon') {
    const weapon = aux as Weapon
    if(weapon.ammunition) addedLoad += weapon.ammunition.slots as number
  }

  character.currentLoad += addedLoad
  character.inventory.push(aux)
}

export const changeRitualDc = (character: Character, value: number) => {
  character.ritualsDc = formatValueNumbers(value, 3)
}
