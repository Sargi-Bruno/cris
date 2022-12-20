<script setup lang="ts">
import { ref } from 'vue'
import { Character, Ritual } from '../../../../types'
import SwitchButton from '../../../../components/SwitchButton.vue'
import RitualsModalContent from './RitualsModalContent.vue'
import HomebrewRituals from './homebrew-rituals/HomebrewRituals.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleAddRitual', 'handleCloseModal'])

const componentOptions = [RitualsModalContent, HomebrewRituals]

const options = [
  {
    label: 'Rituais',
    value: 0
  },
  {
    label: 'Meus Rituais',
    value: 1
  }
]

const currentButtonValue = ref(0)

const handleNavigation = (value: number) => currentButtonValue.value = value

const handleAddRitual = (ritual: Ritual) => emit('handleAddRitual', ritual)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Adicionar Rituais</h2>
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
          @handle-add-ritual="handleAddRitual"
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