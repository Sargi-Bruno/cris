<script setup lang="ts">
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ToastNotification from '../../components/ToastNotification.vue'
import SheetStats from './sheet-stats/SheetStats.vue'
import SkillsView from './sheet-skills/SkillsView.vue'
import SheetTabView from './sheet-tab/SheetTabView.vue'
import AbilitiesModal from './sheet-modals/abilities-modal/AbilitiesModal.vue'
import AttackModal from './sheet-modals/attack-modal/AttackModal.vue'
import InventoryModal from './sheet-modals/inventory-modal/InventoryModal.vue'
import RitualsModal from './sheet-modals/rituals-modal/RitualsModal.vue'
import SkillModal from './sheet-modals/skill-modal/SkillModal.vue'
import { 
  Skill, 
  Power, 
  Ritual, 
  Weapon, 
  Protection, 
  Misc, 
  AttrKeys, 
  CharacterStringKeys, 
  CharacterNumberKeys, 
  CharacterDropdownKeys,
  AttackStringKeys,
  AttackNumberKeys,
  AttackDropdownKeys
} from '../../types'
import { 
  characterDefaultValue, 
  attackDefaultValue,
  equipItem,
  unequipItem 
} from './characterSheetUtils'

interface Toast {
  message: string,
  type: string,
  alive: boolean,
  timeout: number
}

const modalOptions = [AbilitiesModal, AttackModal, InventoryModal, RitualsModal, SkillModal]
const modals = {
  abilities: 0,
  attack: 1,
  inventory: 2,
  rituals: 3,
  skill: 4
}

const character = ref(characterDefaultValue)

const toast = ref<Toast>({
  message: '',
  type: '',
  alive: false,
  timeout: 0
})

const showModal = ref(false)
const currentModal = ref(0)
const currentSkill = ref<Skill>()

const formatValueNumbers = (value: number) => {
  if(value > 99) return 99
  if(value < -99) return -99
  return value
}

const handleShowInfoToast = (toast: Toast, name: string) => {
  toast.message = `${name} adicionado`
  toast.type = 'info'
  toast.alive = true
}

const handleChangeCharText = (payload: { e: Event, key: CharacterStringKeys }) => {
  const value = (payload.e.target as HTMLInputElement).value
  character.value[payload.key] = value
}

const handleChangeCharNumber = (payload: { e: Event, key: CharacterNumberKeys }) => {
  let value = (payload.e.target as HTMLInputElement).valueAsNumber

  if(isNaN(value)) value = 0

  if(payload.key === 'movement') {

    if(value > 999) value = 999
    if(value < 0) value = 0

    character.value[payload.key] = parseFloat(value.toFixed(2))

  } else {
    value = formatValueNumbers(value)
    character.value[payload.key] = Math.floor(value)
  } 
}

const handleChangeAttributes = (payload: { e: Event, attr: AttrKeys }) => {
  let value = (payload.e.target as HTMLInputElement).valueAsNumber

  if(value > 9) value = 9
  if(value < -9) value = -9

  character.value.attributes[payload.attr] = Math.floor(value)
}

const handleChangeCharDropdown = (payload: { value: string, key: CharacterDropdownKeys }) => {
  character.value[payload.key] = payload.value
}

const handleChangeMovementInSquares = (e: Event) => {
  let value = (e.target as HTMLInputElement).valueAsNumber

  if(value > 666) value = 666
  if(value < 0) value = 0

  if(value === 0) character.value.movement = 0
  else character.value.movement = Math.floor(value) * 1.5
}

const handleOpenSkillModal = (skill: Skill) => {
  currentSkill.value = skill
  currentModal.value = modals.skill
  showModal.value = true
}

const handleOpenAbilitiesModal = () => {
  currentModal.value = modals.abilities
  showModal.value = true
}

const handleOpenRitualsModal = () => {
  currentModal.value = modals.rituals
  showModal.value = true
}

const handleOpenItemsModal = () => {
  currentModal.value = modals.inventory
  showModal.value = true
}

const handleAddAttack = () => {
  const aux = {...attackDefaultValue}
  aux.id = uuidv4()
  character.value.attacks.push(aux)
}

const handleRemoveAttack = (id: string) => {
  const index = character.value.attacks.findIndex((e) => e.id === id)

  if(character.value.attacks[index].itemId) {
    const itemIndex = character.value.inventory.findIndex((e) => e.id === character.value.attacks[index].itemId)
    character.value.inventory[itemIndex].equipped = false
  }
  
  character.value.attacks.splice(index, 1)
}

const handleChangeAttackText = (payload: {e: Event, id: string, key: AttackStringKeys}) => {
  const value = (payload.e.target as HTMLInputElement).value
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = value
}

const handleChangeAttackNumber = (payload: {e: Event, id: string, key: AttackNumberKeys}) => {
  let value = (payload.e.target as HTMLInputElement).valueAsNumber
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  console.log('a')

  if(isNaN(value)) value = 0

  if(payload.key === 'criticalRange') {
    console.log('b')
    if(value > 20) value = 20
    if(value < 1) value = 1
  } else {
    console.log('c')
    value = formatValueNumbers(value)
  }

  character.value.attacks[index][payload.key] = Math.floor(value)
  console.log(character.value.attacks[index])
}

const handleChangeAttackDropdown = (payload: {value: string, id: string, key: AttackDropdownKeys}) => {
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = payload.value
}

const handleAddPower = (power: Power) => {
  const aux = {...power}
  aux.id = uuidv4()
  character.value.powers.push(aux)
  handleShowInfoToast(toast.value, aux.name)
}

const handleRemovePower = (id: string) => {
  const index = character.value.powers.findIndex((e) => e.id === id)
  character.value.powers.splice(index, 1)
}

const handleAddRitual = (ritual: Ritual) => {
  const aux = {...ritual}
  aux.id = uuidv4()
  character.value.rituals.push(aux)
  handleShowInfoToast(toast.value, aux.name)
}

const handleRemoveRitual = (id: string) => {
  const index = character.value.rituals.findIndex((e) => e.id === id)
  character.value.rituals.splice(index, 1)
}

const handleAddItem = (item: Weapon | Protection | Misc) => {
  const aux = {...item}
  aux.id = uuidv4()
  aux.equipped = false
  character.value.inventory.push(aux)
  handleShowInfoToast(toast.value, aux.name)
}

const handleRemoveItem = (id: string) => {
  const index = character.value.inventory.findIndex((e) => e.id === id)
  character.value.inventory.splice(index, 1)
}

const handleEquipItem = (id: string) => {
  const index = character.value.inventory.findIndex((e) => e.id === id)
  character.value.inventory[index].equipped = !character.value.inventory[index].equipped

  if(character.value.inventory[index].equipped) equipItem(character.value, index)
  else unequipItem(character.value, index)
}

watch(() => toast.value.alive, () => {
  if(toast.value.alive === true) {
    toast.value.timeout = setTimeout(() => toast.value.alive = false, 3000)
  }
})

const dismissToast = () => {
  toast.value.alive = false
  clearTimeout(toast.value.timeout)
}
</script>

<template>
  <div class="character-sheet">
    <div class="sheet-stats">
      <SheetStats
        :character="character"
        @handle-change-char-text="handleChangeCharText"
        @handle-change-char-number="handleChangeCharNumber"
        @handle-change-attribute="handleChangeAttributes"
        @handle-change-char-dropdown="handleChangeCharDropdown"
        @handle-change-movement-in-squares="handleChangeMovementInSquares"
      />
    </div>
    <div class="sheet-skills">
      <SkillsView
        :character="character"
        @handle-open-skill-modal="handleOpenSkillModal"
      />
    </div>
    <div class="sheet-tab">
      <SheetTabView
        :character="character"
        @handle-open-abilities-modal="handleOpenAbilitiesModal"
        @handle-open-rituals-modal="handleOpenRitualsModal"
        @handle-open-items-modal="handleOpenItemsModal"
        @handle-add-attack="handleAddAttack"
        @handle-remove-attack="handleRemoveAttack"
        @handle-remove-power="handleRemovePower"
        @handle-remove-ritual="handleRemoveRitual"
        @handle-remove-item="handleRemoveItem"
        @handle-equip-item="handleEquipItem"
        @handle-change-attack-text="handleChangeAttackText"
        @handle-change-attack-number="handleChangeAttackNumber"
        @handle-change-attack-dropdown="handleChangeAttackDropdown"
      />
    </div>
    <vue-final-modal 
      v-model="showModal"
      :lock-scroll="false" 
      classes="modal-container"
    >
      <component 
        :is="modalOptions[currentModal]"
        :character="character"
        :skill="currentSkill"
        @handle-close-modal="showModal = false"
        @handle-add-power="handleAddPower"
        @handle-add-ritual="handleAddRitual"
        @handle-add-item="handleAddItem"
      />
    </vue-final-modal>
    <transition name="toast">
      <ToastNotification
        v-if="toast.alive"
        :value="toast.message"
        :type="toast.type"
        @dismiss="dismissToast"
      />
    </transition>
  </div>
</template>

<style scoped>
.character-sheet {
  display: flex;
  justify-content: space-between;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sheet-tab {
  max-width: 31.25rem;
  max-height: 56.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>