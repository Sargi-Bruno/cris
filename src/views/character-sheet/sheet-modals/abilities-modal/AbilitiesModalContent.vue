<script setup lang="ts">
import { ref } from 'vue'
import { Character, Power } from '../../../../types'
import TabNav from '../../../../components/TabNav.vue'
import ClassAbilities from './ClassAbilities.vue'
import BackgroundPower from './BackgroundPower.vue'
import ParanormalPowers from './ParanormalPowers.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleCloseModal', 'handleAddPower'])

const componentOptions = [ClassAbilities, BackgroundPower, ParanormalPowers]

const tabOptions = [
  {
    label: 'Classe',
    value: 0
  },
  {
    label: 'Origem',
    value: 1
  },
  {
    label: 'Poderes Paranormais',
    value: 2
  }
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleAddPower = (power: Power) => emit('handleAddPower', power)
</script>

<template>
  <div class="abilities-modal-content">
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
</template>

<style scoped>
.abilities-modal-content {
  margin-top: 1rem;
}
</style>