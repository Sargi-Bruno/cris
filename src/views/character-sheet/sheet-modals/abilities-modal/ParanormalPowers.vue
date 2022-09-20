<script setup lang="ts">
import { computed, ref } from 'vue'
import { Power } from '../../../../types'
import paranormalPowers from '../../../../data/paranormalPowers'
import TabNav from '../../../../components/TabNav.vue'
import PowerCard from '../../../../components/PowerCard.vue'

const emit = defineEmits(['handleAddPower'])

const tabOptions = [
  {
    label: 'Conhecimento',
    value: 0,
  },
  {
    label: 'Energia',
    value: 1,
  },
  {
    label: 'Morte',
    value: 2,
  },
  {
    label: 'Sangue',
    value: 3,
  },
  {
    label: 'Varia',
    value: 4,
  }
]

const currentTab = ref(0)

const handleAddPower = (power: Power) => emit('handleAddPower', power)

const currentPowers = computed<Power[]>(() => {
  return paranormalPowers.filter((power) => power.element === tabOptions[currentTab.value].label)
})
</script>

<template>
  <div class="class-abilities-container">
    <TabNav
      :current-tab="currentTab"
      :tab-options="tabOptions"
      secondary
      @handle-navigation="(value: number) => currentTab = value"
    />
    <div
      v-if="currentPowers.length > 0"
      class="class-abilities-content"
    >
      <div
        v-for="power in currentPowers"
        :key="power.name"
        class="class-abilitie-card"
      >
        <PowerCard
          :power="power"
          @handle-add="handleAddPower"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-abilities-container {
  margin-top: 1rem;
}
.class-abilities-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
.class-abilitie-card:not(:last-of-type) {
  margin-bottom: .5rem;
}
</style>