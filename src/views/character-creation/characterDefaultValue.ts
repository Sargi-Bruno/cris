import { Character } from "../../types"
import Skills from "../../data/skills"

const characterDefaultValue: Character = {
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

export default characterDefaultValue
