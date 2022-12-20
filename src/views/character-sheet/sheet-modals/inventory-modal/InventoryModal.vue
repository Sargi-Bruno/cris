<script setup lang="ts">
import { ref } from 'vue'
import { Character, Weapon, Protection, Misc, CursedItem } from '../../../../types'
import SwitchButton from '../../../../components/SwitchButton.vue'
import InventoryModalContent from './InventoryModalContent.vue'
import HomebrewItems from './homebrew-items/HomebrewItems.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleAddItem', 'handleCloseModal'])

const componentOptions = [InventoryModalContent, HomebrewItems]

const options = [
  {
    label: 'Itens',
    value: 0
  },
  {
    label: 'Meus Itens',
    value: 1
  }
]

const currentButtonValue = ref(0)

const handleNavigation = (value: number) => currentButtonValue.value = value

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Adicionar Itens</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body modal-height">
      <SwitchButton
        :value="currentButtonValue"
        :options="options"
        @handle-navigation="handleNavigation"
      />
      <KeepAlive>
        <component
          :is="componentOptions[currentButtonValue]"
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