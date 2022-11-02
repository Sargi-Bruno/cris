import { CursedItem } from './../../types';
import Skills from "../../data/skills"
import { v4 as uuidv4 } from 'uuid'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import classes from "../../data/classes"
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
  AttrDamageKeys,
  NexKeys
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
  proficiencies: '',
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
  currentItemsLimit: {
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
  int: 'Intelecto',
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

const nexAsLv = {
  '5%': 1,
  '10%': 2,
  '15%': 3,
  '20%': 4,
  '25%': 5,
  '30%': 6,
  '35%': 7,
  '40%': 8,
  '45%': 9,
  '50%': 10,
  '55%': 11,
  '60%': 12,
  '65%': 13,
  '70%': 14,
  '75%': 15,
  '80%': 16,
  '85%': 17,
  '90%': 18,
  '95%': 19,
  '99%': 20,
}

const formatValueNumbers = (value: number, limit: 1 | 2 | 3 | 4, floor = true, noNegative = true) => {
  const digitisLimit = {
    1: 9,
    2: 99,
    3: 999,
    4: 9999,
  }
  const negativeDigitisLimit = {
    1: -9,
    2: -99,
    3: -999,
    4: -9999,
  }

  if(isNaN(value)) value = 0
  if(value > digitisLimit[limit]) value = digitisLimit[limit]

  if(noNegative) {
    if(value < 0) value = 0
  } else {
    if(value < negativeDigitisLimit[limit]) value = negativeDigitisLimit[limit]
  }

  if(floor) return Math.floor(value)
  return value
}

export const changeCharNumber = (character: Character, value: number, key: CharacterNumberKeys) => {
  if(key === 'maxPv' || key === 'maxPe' || key === 'maxSan') character[key] = formatValueNumbers(value, 4)
  else if(key === 'currentPv' || key === 'currentPe' || key === 'currentSan') character[key] = formatValueNumbers(value, 4, true, false)
  else if(key === 'bonusDefense') character[key] = formatValueNumbers(value, 3, true, false)
  else if(key === 'movement') character[key] = formatValueNumbers(value, 3, false, true)
  else character[key] = formatValueNumbers(value, 3)
}

const handleChangePre = (character: Character, previousPre: number) => {
  let auxPre = character.attributes.pre
  if(auxPre < 0) auxPre = 0
  if(previousPre < 0) previousPre = 0

  const preDif = Math.abs(auxPre - previousPre)

  if(auxPre > previousPre) {
    character.ritualsDc += preDif
    character.maxPe += preDif
    character.currentPe += preDif
  } else {
    character.ritualsDc -= preDif
    character.maxPe -= preDif
    character.currentPe -= preDif
  }

  if(character.ritualsDc < 0) character.ritualsDc = 0
  if(character.maxPe < 0) character.maxPe = 0
}

const handleChangeStr = (character: Character, previousStr: number) => {
  let auxStr = character.attributes.str
  if(auxStr < 0) auxStr = 0
  if(previousStr < 0) previousStr = 0

  if(auxStr === previousStr) return

  if(auxStr === 0) {
    character.maxLoad -= (previousStr - 1) * 5
    character.maxLoad -= 3 
  } else {
    if(previousStr === 0) {
      if(character.attributes.str < 0) return
      character.maxLoad += (auxStr - 1) * 5
      character.maxLoad += 3
    } else {
      const strDif = Math.abs(auxStr - previousStr)

      if(auxStr > previousStr) {
        character.maxLoad += strDif * 5
      } else {
        character.maxLoad -= strDif * 5
      }
    }
  }

  if(character.maxLoad < 0) character.maxLoad = 0
}

const handleChangeCon = (character: Character, previousCon: number) => {
  let auxCon = character.attributes.con
  if(auxCon < 0) auxCon = 0
  if(previousCon < 0) previousCon = 0

  const conDif = Math.abs(auxCon - previousCon)

  if(auxCon > previousCon) {
    character.maxPv += conDif
    character.currentPv += conDif
  } else {
    character.maxPv -= conDif
    character.currentPv -= conDif
  }

  if(character.maxPv < 1) character.maxPv = 1
}

export const changeCharAttributes = (character: Character, value: number, key: AttrKeys) => {
  const previousAttr = {...character.attributes}
  character.attributes[key] = formatValueNumbers(value, 1, true, false)

  if(key === 'str') handleChangeStr(character, previousAttr.str)
  if(key === 'con') handleChangeCon(character, previousAttr.con)
  if(key === 'pre') handleChangePre(character, previousAttr.pre)
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

const getDamageTooltipInfo = (attack: Attack) => {
  return `${attack.damage}` 
  + (attack.extraDamage !== '' ? ` + ${attack.extraDamage}` : '')
  + (attack.damageAttribute !== 'Nenhum' ? ` + ${attrLongToShortDic[attack.damageAttribute as AttrDamageKeys]}` : '')
}

const getPositiveAttackRollString = (attrSkillValue: number, skillBonus: number, attackBonus: number) => {
  return `${attrSkillValue}d20kh1` 
  + (skillBonus !== 0 ? `+${skillBonus}` : '')
  + (attackBonus !== 0 ? `+${attackBonus}` : '')
}

const getNegativeAttackRollString = (attrSkillValue: number, skillBonus: number, attackBonus: number) => {
  return `${Math.abs(attrSkillValue) + 2}d20kl1`
  + (skillBonus !== 0 ? `+${skillBonus}` : '')
  + (attackBonus !== 0 ? `+${attackBonus}` : '')
}

export const rollAttack = (character: Character, attack: Attack) => {
  const rollSkillIndex = character.skills.findIndex((e) => e.name === attack.skillUsed)
  const skill = character.skills[rollSkillIndex]
  const attrSkillValue = character.attributes[attrShortDic[skill.attribute  as AttrPtKeys] as AttrKeys]

  const attackInfo = `${skill.name} (${skill.attribute})` + (attack.attackBonus !== 0 ? ` + ${attack.attackBonus}` : '')
  const damageInfo = getDamageTooltipInfo(attack)
  const criticalInfo = `${attack.criticalRange}/x${attack.criticalMult}`
  
  let attackRollString: string

  if(attrSkillValue > 0) attackRollString = getPositiveAttackRollString(attrSkillValue, skill.bonus, attack.attackBonus) 
  else attackRollString = getNegativeAttackRollString(attrSkillValue, skill.bonus, attack.attackBonus)

  const rollAttack = new DiceRoll(attackRollString.trim())
  const attackTotal = rollAttack.total
  const outputAttackArray = rollAttack.output.substring(rollAttack.output.indexOf('[') + 1, rollAttack.output.indexOf(']')).split(',')
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
  let damageRollsTooltip = ''

  if(critical === 1) {
    for(let x = 0; x < attack.criticalMult; x++) {
      const damageRoll = new DiceRoll(damageRollString.trim())
      damageTotal += damageRoll.total
      damageRollsTooltip += damageRoll.output.substring(damageRoll.output.indexOf(':') + 1, damageRoll.output.indexOf('=') - 1) + '+'
    }
  } else {
    const damageRoll = new DiceRoll(damageRollString.trim())
    damageTotal += damageRoll.total
    damageRollsTooltip += damageRoll.output.substring(damageRoll.output.indexOf(':') + 1, damageRoll.output.indexOf('=') - 1) + '+'
  }

  if(attack.extraDamage !== '') {
    const extraDamageRoll = new DiceRoll(attack.extraDamage.trim())
    damageTotal += extraDamageRoll.total
    if(extraDamageRoll.output.includes('[')) damageRollsTooltip += extraDamageRoll.output.substring(extraDamageRoll.output.indexOf(':') + 1, extraDamageRoll.output.indexOf('=') - 1) + '+'
    else damageRollsTooltip += extraDamageRoll.total + '+'
  }

  if(attack.damageAttribute !== 'Nenhum') {
    damageTotal += character.attributes[attrDamageDic[attack.damageAttribute as AttrDamageKeys] as AttrKeys]
    damageRollsTooltip += character.attributes[attrDamageDic[attack.damageAttribute as AttrDamageKeys] as AttrKeys]
  }

  if(damageRollsTooltip.charAt(damageRollsTooltip.length - 1) === '+') {
    damageRollsTooltip = damageRollsTooltip.slice(0, -1)
  }

  const payload = {
    attackTotal,
    damageTotal,
    critical,
    attackInfo,
    damageInfo,
    criticalInfo,
    attackRollInfo: rollAttack.output.substring(rollAttack.output.indexOf('['), rollAttack.output.indexOf(']') + 1)  + (attack.attackBonus !== 0 ? `+${attack.attackBonus}` : ''),
    damageRollInfo: `${damageRollsTooltip.trim().replace(/\s/g, "")}`
  }
  
  return payload
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

  if(character.inventory[index].itemType === 'misc' || character.inventory[index].itemType === 'cursedItem') return
  
  character.inventory[index].equipped = !character.inventory[index].equipped

  if(character.inventory[index].equipped) equipItem(character, index)
  else unequipItem(character, index)
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

  let addedLoad: number

  if(isNaN(aux.slots as number)) addedLoad = 0
  else addedLoad = parseInt(aux.slots as string)

  if(aux.itemType === 'weapon') {
    const weapon = aux as Weapon
    if(weapon.ammunition) {
      addedLoad += parseInt(weapon.ammunition.slots as string)

      if(weapon.ammunition.category !== '-' && weapon.ammunition.category !== '0') character.currentItemsLimit[weapon.ammunition.category as ItemsLimitKeys] += 1
    }
  }

  if(aux.category !== '-' && aux.category !== '0') character.currentItemsLimit[aux.category as ItemsLimitKeys] += 1

  character.currentLoad += addedLoad
  character.inventory.push(aux)
}

export const removeItem = (character: Character, id: string) => {
  const index = character.inventory.findIndex((e) => e.id === id)
  const aux = character.inventory[index]

  let removedLoad

  if(isNaN(aux.slots as number)) removedLoad = 0
  else removedLoad = aux.slots as number

  if(aux.itemType === 'weapon') {
    const weapon = aux as Weapon

    if(weapon.ammunition) {
      removedLoad += weapon.ammunition.slots as number

      if(weapon.ammunition.category !== '-' && weapon.ammunition.category !== '0') {
        character.currentItemsLimit[weapon.ammunition.category as ItemsLimitKeys] -= 1

        if(character.currentItemsLimit[weapon.ammunition.category as ItemsLimitKeys] < 0) character.currentItemsLimit[weapon.ammunition.category as ItemsLimitKeys] = 0
      }
    }
  }

  if(aux.category !== '-' && aux.category !== '0') {
    character.currentItemsLimit[aux.category as ItemsLimitKeys] -= 1

    if(character.currentItemsLimit[aux.category as ItemsLimitKeys] < 0) character.currentItemsLimit[aux.category as ItemsLimitKeys] = 0
  }

  character.currentLoad -= removedLoad

  if(character.inventory[index].equipped) unequipItem(character, index)

  character.inventory.splice(index, 1)
}

export const changeRitualDc = (character: Character, value: number) => {
  character.ritualsDc = formatValueNumbers(value, 3)
}

export const updateCharNexStats = (character: Character, previousNex: string) => {
  if(character.nex === previousNex) return

  const charClass = classes.find((ele) => ele.name === character.className)

  if(!charClass) return

  const currentNexAsLv = nexAsLv[character.nex as NexKeys]
  const previousNexAsLv = nexAsLv[previousNex as NexKeys]
  const lvDif = Math.abs(currentNexAsLv - previousNexAsLv)
  const pv = (charClass.levelPv + character.attributes.con) * lvDif
  const pe = (charClass.levelPe + character.attributes.pre) * lvDif
  const san = charClass.levelSan * lvDif

  if(currentNexAsLv > previousNexAsLv) {
    character.maxPv += pv
    character.currentPv += pv
    character.maxPe += pe
    character.currentPe += pe
    character.maxSan += san
    character.currentSan += san
    character.ritualsDc += lvDif
  } else {
    character.maxPv -= pv
    character.currentPv -= pv
    character.maxPe -= pe
    character.currentPe -= pe
    character.maxSan -= san
    character.currentSan -= san
    character.ritualsDc -= lvDif
  }

  if(character.maxPv < 1) character.maxPv = 1
  if(character.maxPe < 0) character.maxPe = 0
  if(character.maxSan < 1) character.maxSan = 1
  if(character.ritualsDc < 0) character.ritualsDc = 0
}

export const editItemSheet = (character: Character, item: Weapon | Protection | Misc | CursedItem) => {
  const index = character.inventory.findIndex((e) => e.id === item.id)
  const oldItem = {...character.inventory[index]}

  if(JSON.stringify(oldItem) === JSON.stringify(item)) return

  character.inventory[index] = item

  if(item.itemType === 'cursedItem') return

  if(oldItem.slots !== item.slots) {
    if(!isNaN(parseInt(item.slots as string))) {
      const slotsDif = Math.abs((oldItem.slots as number) - (item.slots as number))

      if(item.slots > oldItem.slots) character.currentLoad += slotsDif
      else character.currentLoad -= slotsDif

    } else {
      character.currentLoad -= oldItem.slots as number
    }

    if(character.currentLoad < 0) character.currentLoad = 0
  }

  if(oldItem.category !== item.category) {
    if(oldItem.category !== '-' && oldItem.category !== '0') character.currentItemsLimit[oldItem.category as ItemsLimitKeys] -= 1
    if(item.category !== '-' && item.category !== '0') character.currentItemsLimit[item.category as ItemsLimitKeys] += 1
  }

  if(item.itemType === 'protection') {
    if(item.equipped) {
      const oldProtection = oldItem as Protection
      const newProtection = item as Protection

      if(oldProtection.defense !== newProtection.defense) {
        const defenseDif = Math.abs(oldProtection.defense - newProtection.defense)

        if(newProtection.defense > oldProtection.defense) character.protectionDefense += defenseDif
        else character.protectionDefense -= defenseDif
      }

      if(oldProtection.name !== newProtection.name) {
        if(character.currentProtection.includes(oldProtection.name)) {
          character.currentProtection = character.currentProtection.replace(oldProtection.name, newProtection.name)
        }
      }
    }
  }

  if(item.itemType === 'weapon') {
    if(item.equipped) {
      const oldWeapon = oldItem as Weapon
      const newWeapon = item as Weapon
      const attackIndex = character.attacks.findIndex((e) => e.itemId === item.id)

      if(oldWeapon.name !== newWeapon.name) character.attacks[attackIndex].name = newWeapon.name
      if(oldWeapon.damage !== newWeapon.damage) character.attacks[attackIndex].damage = newWeapon.damage
      if(oldWeapon.criticalRange !== newWeapon.criticalRange) character.attacks[attackIndex].criticalRange = newWeapon.criticalRange
      if(oldWeapon.criticalMult !== newWeapon.criticalMult) character.attacks[attackIndex].criticalMult = newWeapon.criticalMult
      if(oldWeapon.damageType !== newWeapon.damageType) character.attacks[attackIndex].damageType = newWeapon.damageType
      if(oldWeapon.range !== newWeapon.range) character.attacks[attackIndex].range = newWeapon.range
    }
  }
}
