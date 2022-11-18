<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import ToastNotification from '../../components/ToastNotification.vue'
import ToastDice from '../../components/ToastDice.vue'
import ToastAttack from '../../components/ToastAttack.vue'
import SheetStats from './sheet-stats/SheetStats.vue'
import SkillsView from './sheet-skills/SkillsView.vue'
import SheetTabView from './sheet-tab/SheetTabView.vue'
import AbilitiesModal from './sheet-modals/abilities-modal/AbilitiesModal.vue'
import InventoryModal from './sheet-modals/inventory-modal/InventoryModal.vue'
import RitualsModal from './sheet-modals/rituals-modal/RitualsModal.vue'
import SkillModal from './sheet-modals/skill-modal/SkillModal.vue'
import EditModal from './sheet-modals/edit-modal/EditModal.vue'
import LoadingView from '../../components/LoadingView.vue'
import SheetTools from './sheet-tools/SheetTools.vue'
import {
  Character,
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
  Attack,
  ToastInfo,
  ToastRoll,
  ToastAttackInterface,
  CursedItem,
  NexKeys,
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
  addItem,
  attrDic,
  updateSkillBonus,
  rollSkill,
  formatRollResult,
  formatRollNotation,
  rollDices,
  rollAttack,
  changeRitualDc,
  updateCharNexStats,
  editItemSheet,
  peOptions,
} from './characterSheetUtils'
import { useSound } from '@vueuse/sound'
import diceSound from '../../assets/dice-roll.mp3'
import router from '../../router'

const { play } = useSound(diceSound)

const modalOptions = [AbilitiesModal, InventoryModal, RitualsModal, SkillModal, EditModal]
const modals = {
  abilities: 0,
  inventory: 1,
  rituals: 2,
  skill: 3,
  edit: 4
}
const editModalOptions = {
  power: 0,
  ritual: 1,
  item: 2,
}

const auth = getAuth()
const firestore = getFirestore()
const route = useRoute()
const characterId = route.params.id as string
const loading = ref(true)
const editPower = ref<Power>()
const editRitual = ref<Ritual>()
const editItem = ref<Weapon | Protection | Misc | CursedItem>()
const character = ref<Character>(characterDefaultValue)
const disabledSheet = ref(true)

const toastInfo = ref<ToastInfo>({
  message: '',
  type: '',
  alive: false,
  timeout: 0
})

const toastRoll = ref<ToastRoll>({
  title: '',
  total: 0,
  output: '',
  notation: '',
  alive: false
})

const toastAttack = ref<ToastAttackInterface>({
  title: '',
  totalAttack: 0,
  totalDamage: 0,
  critical: 0,
  attackTooltip: '',
  damageTooltip: '',
  criticalTooltip: '',
  attackRollTooltip: '',
  damageRollTooltip: '',
  alive: false
})

const showModal = ref(false)
const currentModal = ref(0)
const currentEditModal = ref(0)
const currentSkill = ref<Skill>()

onMounted(async() => {
  const querySnapshot = await getDoc(doc(firestore, 'characters', characterId))

  if(!querySnapshot.data()) router.push({ name: 'home' })

  if((querySnapshot?.data()?.uid as string) === auth?.currentUser?.uid) disabledSheet.value = false

  character.value = querySnapshot.data() as Character
  character.value.id = querySnapshot?.id

  // Remove in the future
  if(!character.value.currentItemsLimit) {
    const defaultCurrentItemsLimit = {
      I: 0,
      II: 0,
      III: 0,
      IV: 0
    }

    character.value.currentItemsLimit = defaultCurrentItemsLimit
  }

  if(!character.value.peTurn) character.value.peTurn = peOptions[character.value.nex as NexKeys]

  loading.value = false
})

const updateCharacter = () => {
  if(disabledSheet.value) return
  updateDoc(doc(firestore, 'characters', character.value.id as string), character.value)
}

const dismissToastInfo = () => {
  toastInfo.value.alive = false
  clearTimeout(toastInfo.value.timeout)
}

const dismissToastRoll = () => toastRoll.value.alive = false

const dismissToastAttack = () => toastAttack.value.alive = false

const handleShowInfoToast = (toast: ToastInfo, name: string) => {
  dismissToastRoll()
  dismissToastAttack()
  toast.message = `${name} adicionado`
  toast.type = 'info'
  toast.alive = true
}

const handleShowErrorToast = (toast: ToastInfo) => {
  dismissToastRoll()
  dismissToastAttack()
  toast.message = 'Valor incorreto nos dados'
  toast.type = 'error'
  toast.alive = true
}

const handleShowDiceToast = (toast: ToastRoll, title: string, total: number, output: string, notation: string) => {
  dismissToastInfo()
  dismissToastAttack()
  toast.title = title
  toast.total = total
  toast.output = output
  toast.notation = notation
  toast.alive = true
}

const handleShowAttackToast = (
  toast: ToastAttackInterface, 
  title: string, 
  totalAttack: number, 
  totalDamage: number, 
  critical: number,
  attackTooltip: string,
  damageTooltip: string,
  attackRollTooltip: string,
  damageRollTooltip: string,
  criticalTooltip: string
) => {
  dismissToastInfo()
  dismissToastRoll()
  toast.title = title
  toast.totalAttack = totalAttack
  toast.totalDamage = totalDamage
  toast.critical = critical
  toast.attackTooltip = attackTooltip
  toast.damageTooltip = damageTooltip
  toast.attackRollTooltip = attackRollTooltip
  toast.damageRollTooltip = damageRollTooltip
  toast.criticalTooltip = criticalTooltip
  toast.alive = true
}

const handleChangeCharText = (payload: { e: Event, key: CharacterStringKeys }) => {
  const value = (payload.e.target as HTMLInputElement).value
  character.value[payload.key] = value.trim()
  updateCharacter()
}

const handleChangeCharNumber = (payload: { e: Event, key: CharacterNumberKeys }) => {
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeCharNumber(character.value, value, payload.key)
  updateCharacter()
}

const handleChangeAttributes = (payload: { e: Event, key: AttrKeys }) => {
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeCharAttributes(character.value, value, payload.key)
  updateCharacter()
}

const handleChangeCharDropdown = (payload: { value: string, key: CharacterDropdownKeys }) => {
  const previousNex = character.value.nex
  character.value[payload.key] = payload.value
  updateCharNexStats(character.value, previousNex)
  updateCharacter()
}

const handleChangeMovementInSquares = (e: Event) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  changeMovementInSquares(character.value, value)
  updateCharacter()
}

const handleRollAttribute = (attr: AttrKeys) => {
  try {
    const title = attrDic[attr]
    const roll = rollAttribute(character.value, attr)
    const output = formatRollResult(roll.output)
    const notation = formatRollNotation(roll.output)
    handleShowDiceToast(toastRoll.value, title, roll.total, output, notation)
    play()

  } catch(error) {
    handleShowErrorToast(toastInfo.value)
  }
}

const handleOpenSkillModal = (skill: Skill) => {
  currentSkill.value = skill
  currentModal.value = modals.skill
  showModal.value = true
}

const handleChangeSkillDropdown = (payload: { value: string, skillName: string, key: SkillDropdownKeys}) => {
  const index = character.value.skills.findIndex((e) => e.name === payload.skillName)
  character.value.skills[index][payload.key] = payload.value
  updateSkillBonus(character.value, payload.skillName)
  updateCharacter()
}

const handleChangeSkillOtherBonus = (payload: {value: number, skillName: string}) => {
  changeSkillOtherBonus(character.value, payload.value, payload.skillName)
  updateSkillBonus(character.value, payload.skillName)
  updateCharacter()
}

const handleRollSkill = (skill: Skill) => {
  try {
    const title = skill.name
    const roll = rollSkill(character.value, skill)
    const output = formatRollResult(roll.output)
    const notation = formatRollNotation(roll.output)
    handleShowDiceToast(toastRoll.value, title, roll.total, output, notation)
    play()
    
  } catch(error) {
    handleShowErrorToast(toastInfo.value)
  }
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
  updateCharacter()
}

const handleRemoveAttack = (id: string) => {
  removeAttack(character.value, id)
  updateCharacter()
}

const handleRemovePower = (id: string) => {
  const index = character.value.powers.findIndex((e) => e.id === id)
  character.value.powers.splice(index, 1)
  updateCharacter()
}

const handleRemoveRitual = (id: string) => {
  const index = character.value.rituals.findIndex((e) => e.id === id)
  character.value.rituals.splice(index, 1)
  updateCharacter()
}

const handleRemoveItem = (id: string) => {
  removeItem(character.value, id)
  updateCharacter()
}

const handleEquipItem = (id: string) => {
  handleItem(character.value, id)
  updateCharacter()
}

const handleChangeAttackText = (payload: {e: Event, id: string, key: AttackStringKeys}) => {
  const value = (payload.e.target as HTMLInputElement).value
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = value
  updateCharacter()
}

const handleChangeAttackNumber = (payload: {e: Event, id: string, key: AttackNumberKeys}) => {
  const value = (payload.e.target as HTMLInputElement).valueAsNumber
  changeAttackNumber(character.value, value, payload.id, payload.key)
  updateCharacter()
}

const handleChangeAttackDropdown = (payload: {value: string, id: string, key: AttackDropdownKeys}) => {
  const index = character.value.attacks.findIndex((e) => e.id === payload.id)
  character.value.attacks[index][payload.key] = payload.value
  updateCharacter()
}

const handleChangeDescription = (payload: {value: string, key: DescriptionKeys}) => {
  character.value.description[payload.key] = payload.value
  updateCharacter()
}

const handleChangeInventoryDropdown = (payload: {value: string, key: InventoryDropdownKeys}) => {
  character.value[payload.key] = payload.value
  updateCharacter()
}

const handleChangeInventoryNumber = (payload: {value: number, key: InventoryNumberKeys}) => {
  changeInventoryNumber(character.value, payload.value, payload.key)
  updateCharacter()
}

const handleChangeItemsLimit = (payload: {value: number, key: ItemsLimitKeys}) => {
  changeItemsLimit(character.value, payload.value, payload.key)
  updateCharacter()
}

const handleRollDices = (value: string) => {
  try {
    const title = 'Resultado'
    const roll = rollDices(value)
    const output = formatRollResult(roll.output)
    const notation = formatRollNotation(roll.output)
    handleShowDiceToast(toastRoll.value, title, roll.total, output, notation)
    play()

  } catch(error) {
    handleShowErrorToast(toastInfo.value)
  }
}

const handleRollAttack = (attack: Attack) => {
  try {
    const payload = rollAttack(character.value, attack)
    handleShowAttackToast(
      toastAttack.value, 
      attack.name, 
      payload.attackTotal, 
      payload.damageTotal, 
      payload.critical, 
      payload.attackInfo, 
      payload.damageInfo, 
      payload.attackRollInfo,
      payload.damageRollInfo,
      payload.criticalInfo
    )
    play()

  } catch(error) {
    handleShowErrorToast(toastInfo.value)
  }
}

const handleChangeRitualDc = (e: Event) => {
  const value = (e.target as HTMLInputElement).valueAsNumber
  changeRitualDc(character.value, value)
  updateCharacter()
}

const handleAddPower = (power: Power) => {
  addPower(character.value, power)
  handleShowInfoToast(toastInfo.value, power.name)
  updateCharacter()
}

const handleAddRitual = (ritual: Ritual) => {
  addRitual(character.value, ritual)
  handleShowInfoToast(toastInfo.value, ritual.name)
  updateCharacter()
}

const handleAddItem = (item: Weapon | Protection | Misc) => {
  addItem(character.value, item)
  handleShowInfoToast(toastInfo.value, item.name)
  updateCharacter()
}

const handleEditPower = (power: Power) => {
  currentModal.value = modals.edit
  currentEditModal.value = editModalOptions.power
  showModal.value = true
  editPower.value = power
}

const handleEditRitual = (ritual: Ritual) => {
  currentModal.value = modals.edit
  currentEditModal.value = editModalOptions.ritual
  showModal.value = true
  editRitual.value = ritual
}

const handleEditItem = (item: Weapon | Protection | Misc | CursedItem) => {
  currentModal.value = modals.edit
  currentEditModal.value = editModalOptions.item
  showModal.value = true
  editItem.value = item
}

const handleEditPowerSheet = (editPower: Power) => {
  const index = character.value.powers.findIndex((e) => e.id === editPower.id)
  character.value.powers[index] = editPower
  updateCharacter()
  handleCloseModal()
}

const handleEditRitualSheet = (editRitual: Ritual) => {
  const index = character.value.rituals.findIndex((e) => e.id === editRitual.id)
  character.value.rituals[index] = editRitual
  updateCharacter()
  handleCloseModal()
}

const handleEditItemSheet = (editItem: Weapon | Protection | Misc | CursedItem) => {
  editItemSheet(character.value, editItem)
  updateCharacter()
  handleCloseModal()
}

const handleCloseModal = () => showModal.value = false

const handleShareSheet = async () => {
  await navigator.clipboard.writeText(import.meta.env.VITE_BASE_URL + 'agente/' + character.value.id)
  dismissToastRoll()
  dismissToastAttack()
  toastInfo.value.message = 'Link copiado'
  toastInfo.value.type = 'info'
  toastInfo.value.alive = true
}

watch(() => toastInfo.value.alive, () => {
  if(toastInfo.value.alive === true) {
    toastInfo.value.timeout = window.setTimeout(() => toastInfo.value.alive = false, 3000)
  }
})
</script>

<template>
  <div v-if="!loading" class="sheet-wrapper">
    <div v-if="!disabledSheet">
      <SheetTools @handle-share-sheet="handleShareSheet" />
    </div>
    <div class="character-sheet">
      <div class="sheet-stats">
        <SheetStats
          :character="character"
          :disabled-sheet="disabledSheet"
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
          :disabled-sheet="disabledSheet"
          @handle-open-skill-modal="handleOpenSkillModal"
          @handle-change-skill-dropdown="handleChangeSkillDropdown"
          @handle-change-skill-other-bonus="handleChangeSkillOtherBonus"
          @handle-roll-skill="handleRollSkill"
        />
      </div>
      <div class="sheet-tab">
        <SheetTabView
          :character="character"
          :disabled-sheet="disabledSheet"
          @handle-open-abilities-modal="handleOpenAbilitiesModal"
          @handle-open-rituals-modal="handleOpenRitualsModal"
          @handle-open-items-modal="handleOpenItemsModal"
          @handle-add-attack="handleAddAttack"
          @handle-remove-attack="handleRemoveAttack"
          @handle-remove-power="handleRemovePower"
          @handle-edit-power="handleEditPower"
          @handle-edit-ritual="handleEditRitual"
          @handle-edit-item="handleEditItem"
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
          @handle-roll-dices="handleRollDices"
          @handle-roll-attack="handleRollAttack"
          @handle-change-ritual-dc="handleChangeRitualDc"
        />
      </div>
      <div v-if="showModal">
        <vue-final-modal 
          v-model="showModal"
          classes="modal-container"
        >
          <component 
            :is="modalOptions[currentModal]"
            :current-edit-option="currentEditModal"
            :character="character"
            :skill="currentSkill"
            :edit-power="editPower"
            :edit-ritual="editRitual"
            :edit-item="editItem"
            @handle-edit-power-sheet="handleEditPowerSheet"
            @handle-edit-ritual-sheet="handleEditRitualSheet"
            @handle-edit-item-sheet="handleEditItemSheet"
            @handle-add-power="handleAddPower"
            @handle-add-ritual="handleAddRitual"
            @handle-add-item="handleAddItem"
            @handle-close-modal="handleCloseModal"
          />
        </vue-final-modal>
      </div>
      <transition name="toast">
        <ToastNotification
          v-if="toastInfo.alive"
          :toast="toastInfo"
          @dismiss="dismissToastInfo"
        />
      </transition>
      <transition name="toast">
        <ToastDice
          v-if="toastRoll.alive"
          :toast="toastRoll"
          @dismiss="dismissToastRoll"
        />
      </transition>
      <transition name="toast">
        <ToastAttack
          v-if="toastAttack.alive"
          :toast="toastAttack"
          @dismiss="dismissToastAttack"
        />
      </transition>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.sheet-wrapper {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}
.character-sheet {
  display: flex;
  justify-content: space-between;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sheet-tab {
  width: 31.25rem;
  max-height: 56.25rem;
}
</style>