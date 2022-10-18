<script setup lang="ts">
import { ref } from 'vue'
import { Character, Power } from '../../../../types'
import SwitchButton from '../../../../components/SwitchButton.vue'
import AbilitiesModalContentVue from './AbilitiesModalContent.vue'
import HomebrewAbilities from './homebrew-abilities/HomebrewAbilities.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleAddPower', 'handleCloseModal'])

const componentOptions = [AbilitiesModalContentVue, HomebrewAbilities]

const options = [
  {
    label: 'Habilidades',
    value: 0
  },
  {
    label: 'Minhas Habilidades',
    value: 1
  }
]

const currentButtonValue = ref(0)

const handleNavigation = (value: number) => currentButtonValue.value = value

const handleAddPower = (power: Power) => emit('handleAddPower', power)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Adicionar Habilidades</h2>
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
          @handle-add-power="handleAddPower"
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