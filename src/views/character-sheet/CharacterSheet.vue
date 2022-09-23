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
  AttackDropdownKeys,
  SkillDropdownKeys,
  DescriptionKeys,
  InventoryDropdownKeys,
  InventoryNumberKeys,
  ItemsLimitKeys,
} from '../../types'
import { 
  characterDefaultValue, 
  attackDefaultValue,
  changeCharNumber,
  changeCharAttributes,
  changeMovementInSquares,
  rollAttribute,
  changeSkillOtherBonus,
  removeAttack,
  handleItem,
  changeAttackNumber,
  removeItem,
  changeInventoryNumber,
  changeItemsLimit,
  addPower,
  addRitual,
  addItem
} from './characterSheetUtils'
import { useSound } from '@vueuse/sound'
import diceSound from '../../assets/dice-roll.mp3'

const { play } = useSound(diceSound)

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
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeCharNumber(character.value, value, payload.key)
}

const handleChangeAttributes = (payload: { e: Event, key: AttrKeys }) => {
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeCharAttributes(character.value, value, payload.key)
}

const handleChangeCharDropdown = (payload: { value: string, key: CharacterDropdownKeys }) => {
  character.value[payload.key] = payload.value
}

const handleChangeMovementInSquares = (e: Event) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  changeMovementInSquares(character.value, value)
}

const handleRollAttribute = (attr: AttrKeys) => {
  play()
  rollAttribute(character.value, attr)
}

const handleOpenSkillModal = (skill: Skill) => {
  currentSkill.value = skill
  currentModal.value = modals.skill
  showModal.value = true
}

const handleChangeSkillDropdown = (payload: { value: string, skillName: string, key: SkillDropdownKeys}) => {
  const index = character.value.skills.findIndex((e) => e.name === payload.skillName)
  character.value.skills[index][payload.key] = payload.value
}

const handleChangeSkillOtherBonus = (payload: {value: number, skillName: string}) => {
  changeSkillOtherBonus(character.value, payload.value, payload.skillName)
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
  removeAttack(character.value, id)
}

const handleRemovePower = (id: string) => {
  const index = character.value.powers.findIndex((e) => e.id === id)
  character.value.powers.splice(index, 1)
}

const handleRemoveRitual = (id: string) => {
  const index = character.value.rituals.findIndex((e) => e.id === id)
  character.value.rituals.splice(index, 1)
}

const handleRemoveItem = (id: string) => {
  removeItem(character.value, id)
}

const handleEquipItem = (id: string) => {
  handleItem(character.value, id)
}

const handleChangeAttackText = (payload: {e: Event, id: string, key: AttackStringKeys}) => {
  const value = (payload.e.target as HTMLInputElement).value
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = value
}

const handleChangeAttackNumber = (payload: {e: Event, id: string, key: AttackNumberKeys}) => {
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeAttackNumber(character.value, value, payload.id, payload.key)
}

const handleChangeAttackDropdown = (payload: {value: string, id: string, key: AttackDropdownKeys}) => {
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = payload.value
}

const handleChangeDescription = (payload: {value: string, key: DescriptionKeys}) => {
  character.value.description[payload.key] = payload.value
}

const handleChangeInventoryDropdown = (payload: {value: string, key: InventoryDropdownKeys}) => {
  character.value[payload.key] = payload.value
}

const handleChangeInventoryNumber = (payload: {value: number, key: InventoryNumberKeys}) => {
  changeInventoryNumber(character.value, payload.value, payload.key)
}

const handleChangeItemsLimit = (payload: {value: number, key: ItemsLimitKeys}) => {
  changeItemsLimit(character.value, payload.value, payload.key)
}

const handleAddPower = (power: Power) => {
  addPower(character.value, power)
  handleShowInfoToast(toast.value, power.name)
}

const handleAddRitual = (ritual: Ritual) => {
  addRitual(character.value, ritual)
  handleShowInfoToast(toast.value, ritual.name)
}

const handleAddItem = (item: Weapon | Protection | Misc) => {
  addItem(character.value, item)
  handleShowInfoToast(toast.value, item.name)
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
        @handle-roll-attribute="handleRollAttribute"
      />
    </div>
    <div class="sheet-skills">
      <SkillsView
        :character="character"
        @handle-open-skill-modal="handleOpenSkillModal"
        @handle-change-skill-dropdown="handleChangeSkillDropdown"
        @handle-change-skill-other-bonus="handleChangeSkillOtherBonus"
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
        @handle-change-description="handleChangeDescription"
        @handle-change-inventory-dropdown="handleChangeInventoryDropdown"
        @handle-change-inventory-number="handleChangeInventoryNumber"
        @handle-change-items-limit="handleChangeItemsLimit"
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