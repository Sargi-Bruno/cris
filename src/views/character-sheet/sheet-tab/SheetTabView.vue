<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { Character, Attack } from '../../../types'
import TabNav from '../../../components/TabNav.vue'
import AttacksTab from './AttacksTab.vue'

const AbilitiesTab =  defineAsyncComponent(() => import('./AbilitiesTab.vue'))
const RitualsTab =  defineAsyncComponent(() => import('./RitualsTab.vue'))
const InventoryTab =  defineAsyncComponent(() => import('./InventoryTab.vue'))
const DescriptionTab =  defineAsyncComponent(() => import('./DescriptionTab.vue'))

interface PayloadEvent {
  e: Event
  id: string
  key: string
}

interface PayloadValue {
  value: string
  id: string
  key: string
}

defineProps<{character: Character}>()

const emit = defineEmits([
  'handleOpenAbilitiesModal', 
  'handleOpenRitualsModal', 
  'handleOpenItemsModal', 
  'handleAddAttack', 
  'handleRemoveAttack',
  'handleRemovePower',
  'handleRemoveRitual',
  'handleRemoveItem',
  'handleEquipItem',
  'handleChangeAttackText', 
  'handleChangeAttackNumber', 
  'handleChangeAttackDropdown',
  'handleChangeDescription',
  'handleChangeInventoryNumber',
  'handleChangeItemsLimit', 
  'handleChangeInventoryDropdown',
  'handleRollDices',
  'handleRollAttack',
  'handleChangeRitualDc'
])

const tabOptions = [
  { label: 'ATAQUES', value: 0 },
  { label: 'HABILIDADES', value: 1 },
  { label: 'RITUAIS', value: 2 },
  { label: 'INVENTÁRIO', value: 3 },
  { label: 'DESCRIÇÃO', value: 4 }
]

const componentOptions = [
  AttacksTab,
  AbilitiesTab,
  RitualsTab,
  InventoryTab,
  DescriptionTab
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleChangeAttackText = (payload: PayloadEvent) => emit('handleChangeAttackText', payload)

const handleChangeAttackNumber = (payload: PayloadEvent) => emit('handleChangeAttackNumber', payload)

const handleChangeAttackDropdown = (payload: PayloadValue) => emit('handleChangeAttackDropdown', payload)

const handleChangeDescription = (payload: {value: string, key: string}) => emit('handleChangeDescription', payload)

const handleChangeInventoryNumber = (payload: {value: number, key: string}) => emit('handleChangeInventoryNumber', payload)

const handleChangeItemsLimit  = (payload: {value: number, key: string}) => emit('handleChangeItemsLimit', payload)

const handleChangeInventoryDropdown = (payload: {value: string, key: string}) => emit('handleChangeInventoryDropdown', payload)

const handleRollAttack = (attack: Attack) => emit('handleRollAttack', attack)

const handleChangeRitualDc = (e: Event) => emit('handleChangeRitualDc', e)
</script>

<template>
  <div class="sheet-tab-container">
    <div class="tab-nav-container">
      <TabNav
        :tab-options="tabOptions"
        :current-tab="currentTab"
        @handle-navigation="handleNavigation"
      />
    </div>
    <KeepAlive>
      <component
        :is="componentOptions[currentTab]"
        :character="character"
        @handle-open-abilities-modal="$emit('handleOpenAbilitiesModal')"
        @handle-open-rituals-modal="$emit('handleOpenRitualsModal')"
        @handle-open-items-modal="$emit('handleOpenItemsModal')"
        @handle-add-attack="$emit('handleAddAttack')"
        @handle-remove-attack="(id: string) => $emit('handleRemoveAttack', id)"
        @handle-remove-power="(id: string) => $emit('handleRemovePower', id)"
        @handle-remove-ritual="(id: string) => $emit('handleRemoveRitual', id)"
        @handle-remove-item="(id: string) => $emit('handleRemoveItem', id)"
        @handle-equip-item="(id: string) => $emit('handleEquipItem', id)"
        @handle-change-attack-text="handleChangeAttackText"
        @handle-change-attack-number="handleChangeAttackNumber"
        @handle-change-attack-dropdown="handleChangeAttackDropdown"
        @handle-change-description="handleChangeDescription"
        @handle-change-inventory-number="handleChangeInventoryNumber"
        @handle-change-items-limit="handleChangeItemsLimit"
        @handle-change-inventory-dropdown="handleChangeInventoryDropdown"
        @handle-roll-dices="(value: string) => $emit('handleRollDices', value)"
        @handle-roll-attack="handleRollAttack"
        @handle-change-ritual-dc="handleChangeRitualDc"
      />
    </KeepAlive>
  </div>
</template>

<style scoped>
.sheet-tab-container {
  margin-top: .5rem;
  padding-left: .5rem;
  padding-right: .5rem;
}
.tab-nav-container {
  margin-bottom: 1.5rem;
}
</style>