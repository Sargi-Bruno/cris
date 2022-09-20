<script setup lang="ts">
import { ref } from 'vue'
import { Character, Power } from '../../../../types'
import TabNav from '../../../../components/TabNav.vue'
import ClassAbilities from './ClassAbilities.vue'
import ParanormalPowers from './ParanormalPowers.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleCloseModal', 'handleAddPower'])

const componentOptions = [ClassAbilities, ParanormalPowers]

const tabOptions = [
  {
    label: 'Classe',
    value: 0
  },
  {
    label: 'Poderes Paranormais',
    value: 1
  }
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleAddPower = (power: Power) => emit('handleAddPower', power)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Habilidades</h2>
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