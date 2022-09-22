import { Character, Background, Class, AttrKeys } from "../../types"
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

export const changeAttribute = (character: Character, payload: { value: number, attribute: AttrKeys }) => {
  if(payload.value > 3) payload.value = 3

  if(payload.value < 0) payload.value = 0

  character.attributes[payload.attribute] = payload.value
}

export const addBackground = (character: Character, background: Background | null) => {
  if(background === null) return

  character.backgroundName = background.name
  character.powers.push(background.power)

  for(const skillName of background.skills) {
    const index = character.skills.findIndex((skill) => skill.name === skillName)
    character.skills[index].trainingDegree = 'T'
  }
}

export const addClass = (character: Character, charClass: Class | null) => {
  if(charClass === null) return

  character.className = charClass.name

  for(const abilitie of charClass.abilities) {
    character.powers.push(abilitie)
  }
}

export const updateDescription = (character: Character, payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  character.description[payload.key] = payload.value
}
