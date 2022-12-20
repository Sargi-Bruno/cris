import { Character, Background, Class, AttrKeys } from "../../types"
import Skills from "../../data/skills"
import { v4 as uuidv4 } from 'uuid'

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
  peTurn: '1',
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
  patent: 'Recruta',
  prestigePoints: 0,
  inventory: [],
  itemsLimit: {
    I: 2,
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
  creditsLimit: 'Baixo',
  maxLoad: 0,
  currentLoad: 0,
  description: {
    physical: '',
    personal: '',
    history: '',
    goal: '',
  },
  deathMarks: [false, false, false],
  madnessMarks: [false, false, false],
  deathMode: false,
  madnessMode: false,
  sheetPictureURL: "",
  sheetPictureFullPath: ""
}

export const changeAttribute = (character: Character, payload: { value: number, attribute: AttrKeys }) => {
  if(payload.value > 3) payload.value = 3

  if(payload.value < 0) payload.value = 0

  character.attributes[payload.attribute] = payload.value
}

export const addBackground = (character: Character, background: Background | null) => {
  if(background === null) return

  character.backgroundName = background.name
  background.power.id = uuidv4()
  character.powers.push(background.power)

  // for(const skillName of background.skills) {
  //   const index = character.skills.findIndex((skill) => skill.name === skillName)
  //   character.skills[index].trainingDegree = 'T'
  // }
}

export const addClass = (character: Character, charClass: Class | null) => {
  if(charClass === null) return

  character.className = charClass.name

  for(const abilitie of charClass.abilities) {
    abilitie.id = uuidv4()
    character.powers.push(abilitie)
  }

  character.maxPv = charClass.initialPv + character.attributes.con
  character.currentPv = character.maxPv
  character.maxPe = charClass.initialPe + character.attributes.pre
  character.currentPe = character.maxPe
  character.maxSan = charClass.initialSan
  character.currentSan = character.maxSan
  character.proficiencies = charClass.proficiencies

  if(character.attributes.str === 0) character.maxLoad = 2
  else character.maxLoad = 5 * character.attributes.str

  character.ritualsDc = 11 + character.attributes.pre
}

export const updateDescription = (character: Character, payload: { value: string, key:  'physical' | 'personal' | 'history' | 'goal'}) => {
  character.description[payload.key] = payload.value
}
