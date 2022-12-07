<script setup lang="ts">
import { ref } from 'vue'
import { Character, Power } from '../../../../types'
import TabNav from '../../../../components/TabNav.vue'
import classes from '../../../../data/classes'
import ClassAbilities from './ClassAbilities.vue'
import BackgroundPower from './BackgroundPower.vue'
import ParanormalPowers from './ParanormalPowers.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleCloseModal', 'handleAddPower'])

const tabOptions = [
  {
    label: 'Combatente',
    value: 0
  },
  {
    label: 'Especialista',
    value: 1
  },
  {
    label: 'Ocultista',
    value: 2
  },
  {
    label: 'Origens',
    value: 3
  },
  {
    label: 'Poderes Paranormais',
    value: 4
  }
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleAddPower = (power: Power) => emit('handleAddPower', power)

console.log(classes[0])
</script>

<template>
  <div class="abilities-modal-content">
    <TabNav
      :current-tab="currentTab"
      :tab-options="tabOptions"
      @handle-navigation="handleNavigation"
    />
    <div v-if="(currentTab === 0)">
      <ClassAbilities :class-value="classes[0]" @handle-add-power="handleAddPower" />
    </div>
    <div v-if="(currentTab === 1)">
      <ClassAbilities :class-value="classes[1]" @handle-add-power="handleAddPower" />
    </div>
    <div v-if="(currentTab === 2)">
      <ClassAbilities :class-value="classes[2]" @handle-add-power="handleAddPower" />
    </div>
    <div v-if="(currentTab === 3)">
      <BackgroundPower @handle-add-power="handleAddPower" />
    </div>
    <div v-if="(currentTab === 4)">
      <ParanormalPowers @handle-add-power="handleAddPower" />
    </div>
  </div>
</template>

<style scoped>
.abilities-modal-content {
  margin-top: 1rem;
}
</style>