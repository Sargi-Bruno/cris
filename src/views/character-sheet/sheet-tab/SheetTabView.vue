<script setup lang="ts">
import { ref } from 'vue'
import { Character } from '../../../types'
import TabNav from '../../../components/TabNav.vue'
import AttacksTab from './AttacksTab.vue'
import AbilitiesTab from './AbilitiesTab.vue'
import RitualsTab from './RitualsTab.vue'
import InventoryTab from './InventoryTab.vue'
import DescriptionTab from './DescriptionTab.vue'

defineProps<{character: Character}>()

defineEmits([
  'handleOpenAbilitiesModal', 
  'handleOpenRitualsModal', 
  'handleOpenItemsModal', 
  'handleAddAttack', 
  'handleRemoveAttack',
  'handleRemovePower',
  'handleRemoveRitual',
  'handleRemoveItem'
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