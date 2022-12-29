import { Campaign } from './../types';
import { Power, Ritual, Misc, Protection, CursedItem, Weapon } from "../types"

const maxTextLength = 100
const maxSmallInputLength = 3
const maxDescriptionLength = 5000
const campaignMaxDescriptionLength = 10000

const trimAndSubstring = (text: string, maxLength = maxTextLength) => {
  text = text.trim()
  text = text.substring(0, maxLength)

  return text
}

export const validateAbilitiesForm = (power: Power) => {
  power.name = trimAndSubstring(power.name)
  power.description = power.description.substring(0, maxDescriptionLength)
}

export const validateRitualForm = (ritual: Ritual) => {
  ritual.name = trimAndSubstring(ritual.name)
  ritual.description = ritual.description.substring(0, maxDescriptionLength)
  if(ritual.area) ritual.area = trimAndSubstring(ritual.area)
  if(ritual.target) ritual.target = trimAndSubstring(ritual.target)
  if(ritual.duration) ritual.duration = trimAndSubstring(ritual.duration)
  if(ritual.effect) ritual.effect = trimAndSubstring(ritual.effect)
  if(ritual.save) ritual.save = trimAndSubstring(ritual.save)
}

export const validateMiscForm = (misc: Misc) => {
  misc.name = trimAndSubstring(misc.name)
  misc.description = misc.description.substring(0, maxDescriptionLength)
  misc.slots = trimAndSubstring((misc.slots.toString()), maxSmallInputLength)
}

export const validateProtectionForm = (protection: Protection) => {
  protection.name = trimAndSubstring(protection.name)
  protection.description = protection.description.substring(0, maxDescriptionLength)
  protection.slots = trimAndSubstring((protection.slots.toString()), maxSmallInputLength)
  protection.defense = parseInt(trimAndSubstring((protection.defense.toString()), maxSmallInputLength))
}

export const validateCursedItemForm = (cursedItem: CursedItem) => {
  cursedItem.name = trimAndSubstring(cursedItem.name)
  cursedItem.description = cursedItem.description.substring(0, maxDescriptionLength)
}

export const validateWeaponForm = (weapon: Weapon) => {
  weapon.name = trimAndSubstring(weapon.name)
  weapon.description = weapon.description.substring(0, maxDescriptionLength)
  weapon.damage = trimAndSubstring(weapon.damage)
  if(weapon.secondaryDamage) weapon.secondaryDamage = trimAndSubstring(weapon.secondaryDamage)
  if(weapon.criticalRange > 20) weapon.criticalRange = 20
  if(weapon.criticalRange < 1) weapon.criticalRange = 1
  weapon.criticalMult = parseInt(trimAndSubstring(weapon.criticalMult.toString(), maxSmallInputLength))
  weapon.slots = trimAndSubstring((weapon.slots.toString()), maxSmallInputLength)
}

export const validadeCampaignForm = (campaign: Campaign) => {
  campaign.name = trimAndSubstring(campaign.name)
  campaign.description = campaign.description.substring(0, campaignMaxDescriptionLength)
}
