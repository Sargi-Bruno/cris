import { Character, Background, Class } from "../../types"
import Skills from "../../data/skills"

export const characterDefaultValue: Character = {
  name: '',
  player: '',
  attributes: {
    str: 1,
    dex: 1,
    int: 1,
    con: 1,
    pre: 1,
  },
  backgroundName: '',
  className: '',
  nex: '5%',
  movement: 9,
  maxPv: 0,
  currentPv: 0,
  maxPe: 0,
  currentPe: 0,
  maxSan: 0,
  currentSan: 0,
  defense: 10,
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

export const changeAttribute = (character: Character, payload: { value: number, attribute: 'str' | 'dex' | 'int' | 'con' | 'pre' }) => {
  if(payload.value > 3) payload.value = 3

  if(payload.value < 0) payload.value = 0

  character.attributes[payload.attribute] = payload.value
}

export const addBackground = (character: Character, background: Background) => {
  character.backgroundName = background.name
  character.powers.push(background.power)

  for(const skillName of background.skills) {
    const index = character.skills.findIndex((skill) => skill.name === skillName)
    character.skills[index].trainingBonus += 5
  }
}

export const removeBackground = (character: Character, background: Background) => {
  character.backgroundName = ''
  const powerIndex = character.powers.findIndex((power) => power.name === background.power.name)
  character.powers.splice(powerIndex, 1)

  for(const skillName of background.skills) {
    const index = character.skills.findIndex((skill) => skill.name === skillName)
    character.skills[index].trainingBonus -= 5
  }
}

export const addClass = (character: Character, charClass: Class) => {
  character.className = charClass.name

  for(const abilitie of charClass.abilities) {
    character.powers.push(abilitie)
  }
}

export const removeClass = (character: Character, charClass: Class) => {
  character.className = ''

  for(const abilitie of charClass.abilities) {
    const index = character.powers.findIndex((power) => power.name === abilitie.name)
    character.powers.splice(index, 1)
  }
}

export const updateDescription = (character: Character, payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  character.description[payload.key] = payload.value
}
