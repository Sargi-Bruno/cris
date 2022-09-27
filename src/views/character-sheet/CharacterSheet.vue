<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
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
  Attack
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
  changeRitualDc
} from './characterSheetUtils'
import { useSound } from '@vueuse/sound'
import diceSound from '../../assets/dice-roll.mp3'
import router from '../../router'

const AbilitiesModal =  defineAsyncComponent(() => import('./sheet-modals/abilities-modal/AbilitiesModal.vue'))
const InventoryModal =  defineAsyncComponent(() => import('./sheet-modals/inventory-modal/InventoryModal.vue'))
const RitualsModal =  defineAsyncComponent(() => import('./sheet-modals/rituals-modal/RitualsModal.vue'))
const SkillModal =  defineAsyncComponent(() => import('./sheet-modals/skill-modal/SkillModal.vue'))

const { play } = useSound(diceSound)

interface ToastInfo {
  message: string
  type: string
  alive: boolean
  timeout: number
}

interface ToastRoll {
  title: string 
  total: number
  output: string
  notation: string
  alive: boolean
}

interface ToastAttackInterface {
  title: string
  totalAttack: number
  totalDamage: number
  critical: number
  attackTooltip: string
  damageTooltip: string
  criticalTooltip: string
  alive: boolean
}

const modalOptions = [AbilitiesModal, InventoryModal, RitualsModal, SkillModal]
const modals = {
  abilities: 0,
  inventory: 1,
  rituals: 2,
  skill: 3
}

const auth = getAuth()
const firestore = getFirestore()
const route = useRoute()
const characterId = route.params.id as string
const loading = ref(true)
const character = ref<Character>(characterDefaultValue)

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
  alive: false
})

const showModal = ref(false)
const currentModal = ref(0)
const currentSkill = ref<Skill>()

onMounted(async() => {
  const querySnapshot = await getDoc(doc(firestore, 'characters', characterId))

  if(!querySnapshot.data()) router.push({ name: 'home' })

  if((querySnapshot?.data()?.uid as string) !== auth?.currentUser?.uid) router.push({ name: 'home' })

  character.value = querySnapshot.data() as Character
  character.value.id = querySnapshot?.id

  loading.value = false
})

const updateCharacter = () => {
  updateDoc(doc(firestore, 'characters', character.value.id as string), character.value)
}

onBeforeUnmount(() => {
  updateCharacter()
})

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
  toast.criticalTooltip = criticalTooltip
  toast.alive = true
}

const handleChangeCharText = (payload: { e: Event, key: CharacterStringKeys }) => {
  const value = (payload.e.target as HTMLInputElement).value
  character.value[payload.key] = value
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
  character.value[payload.key] = payload.value
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
    const { attackTotal, damageTotal, critical, attackTooltipInfo, damageTooltipInfo, criticalTooltipInfo } = rollAttack(character.value, attack)
    handleShowAttackToast(toastAttack.value, attack.name, attackTotal, damageTotal, critical, attackTooltipInfo, damageTooltipInfo, criticalTooltipInfo)
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

watch(() => toastInfo.value.alive, () => {
  if(toastInfo.value.alive === true) {
    toastInfo.value.timeout = window.setTimeout(() => toastInfo.value.alive = false, 3000)
  }
})
</script>

<template>
  <div
    v-if="!loading"
    class="character-sheet"
  >
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
        @handle-roll-skill="handleRollSkill"
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
        @handle-roll-dices="handleRollDices"
        @handle-roll-attack="handleRollAttack"
        @handle-change-ritual-dc="handleChangeRitualDc"
      />
    </div>
    <div v-if="showModal">
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
    </div>
    <transition name="toast">
      <ToastNotification
        v-if="toastInfo.alive"
        :value="toastInfo.message"
        :type="toastInfo.type"
        @dismiss="dismissToastInfo"
      />
    </transition>
    <transition name="toast">
      <ToastDice
        v-if="toastRoll.alive"
        :title="toastRoll.title"
        :total="toastRoll.total"
        :output="toastRoll.output"
        :notation="toastRoll.notation"
        @dismiss="dismissToastRoll"
      />
    </transition>
    <transition name="toast">
      <ToastAttack
        v-if="toastAttack.alive"
        :title="toastAttack.title"
        :total-attack="toastAttack.totalAttack"
        :total-damage="toastAttack.totalDamage"
        :critical="toastAttack.critical"
        :attack-tooltip="toastAttack.attackTooltip"
        :damage-tooltip="toastAttack.damageTooltip"
        :critical-tooltip="toastAttack.criticalTooltip"
        @dismiss="dismissToastAttack"
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
  width: 31.25rem;
  max-height: 56.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>