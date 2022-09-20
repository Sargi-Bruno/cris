<script setup lang="ts">
import { computed, ref } from 'vue'
import { Ritual } from '../../../../types'
import rituals from '../../../../data/rituals'
import TabNav from '../../../../components/TabNav.vue'
import RitualCard from '../../../../components/RitualCard.vue'

const emit = defineEmits(['handleAddRitual', 'handleCloseModal'])

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
    label: 'Medo',
    value: 4,
  },
  {
    label: 'Varia',
    value: 5,
  }
]

const secondaryTabOptions = [
  {
    label: '1º Círculo',
    circle: '1',
    value: 0
  },
  {
    label: '2º Círculo',
    circle: '2',
    value: 1
  },
  {
    label: '3º Círculo',
    circle: '3',
    value: 2
  },
  {
    label: '4º Círculo',
    circle: '4',
    value: 3
  }
]

const currentTab = ref(0)
const currentSecondaryTab = ref(0)

const handleAddRitual = (ritual: Ritual) => emit('handleAddRitual', ritual)

const currentRituals = computed<Ritual[]>(() => {
  return rituals.filter((ritual) => ritual.element === tabOptions[currentTab.value].label)
          .filter((ritual) => ritual.circle === secondaryTabOptions[currentSecondaryTab.value].circle)
})
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Rituais</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body modal-height">
      <div class="class-abilities-container">
        <TabNav
          :current-tab="currentTab"
          :tab-options="tabOptions"
          @handle-navigation="(value: number) => currentTab = value"
        />
        <div class="secondary-tab-container">
          <TabNav
            :current-tab="currentSecondaryTab"
            :tab-options="secondaryTabOptions"
            secondary
            @handle-navigation="(value: number) => currentSecondaryTab = value"
          />
        </div>
        <div
          v-if="currentRituals.length > 0"
          class="class-abilities-content"
        >
          <div
            v-for="ritual in currentRituals"
            :key="ritual.name"
            class="class-abilitie-card"
          >
            <RitualCard
              :ritual="ritual"
              @handle-add="handleAddRitual"
            />
          </div>
        </div>
      </div>
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
.secondary-tab-container {
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