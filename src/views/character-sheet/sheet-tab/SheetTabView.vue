<script setup lang="ts">
  import { ref } from 'vue'
import { Character } from '../../../types'
import TabNav from '../../../components/TabNav.vue'
import AttacksTab from './AttacksTab.vue'
import AbilitiesTab from './AbilitiesTab.vue'
import InventoryTab from './InventoryTab.vue'
import DescriptionTab from './DescriptionTab.vue'

defineProps<{character: Character}>()

const tabOptions = [
  { label: 'ATAQUES', value: 0 },
  { label: 'HABILIDADES & RITUAIS', value: 1 },
  { label: 'INVENTÁRIO', value: 2 },
  { label: 'DESCRIÇÃO', value: 3 }
]

const componentOptions = [
  AttacksTab,
  AbilitiesTab,
  InventoryTab,
  DescriptionTab
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value
</script>

<template>
  <div class="sheet-tab-container">
    <TabNav
      :tab-options="tabOptions"
      :current-tab="currentTab"
      @handle-navigation="handleNavigation"
    />
    <KeepAlive>
      <component
        :is="componentOptions[currentTab]"
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
</style>