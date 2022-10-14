<script setup lang="ts">
import { ref } from 'vue'
import { Character, Weapon, Protection, Misc, CursedItem } from '../../../../types'
import TabNav from '../../../../components/TabNav.vue'
import InventoryModalContent from './InventoryModalContent.vue'
import HomebrewItems from './homebrew-items/HomebrewItems.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleAddItem', 'handleCloseModal'])

const componentOptions = [InventoryModalContent, HomebrewItems]

const tabOptions = [
  {
    label: 'Itens',
    value: 0
  },
  {
    label: 'Meus Itens',
    value: 1
  }
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Itens</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body modal-height">
      <TabNav
        :current-tab="currentTab"
        :tab-options="tabOptions"
        @handle-navigation="handleNavigation"
      />
      <KeepAlive>
        <component
          :is="componentOptions[currentTab]"
          :character="character"
          @handle-add-item="handleAddItem"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped>
.modal-width {
  width: 60rem;
}
.modal-height {
  height: 32rem;
}
</style>