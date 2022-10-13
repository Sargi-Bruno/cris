<script setup lang="ts">
import { ref } from 'vue'
import { Character, Ritual } from '../../../../types'
import TabNav from '../../../../components/TabNav.vue'
import RitualsModalContent from './RitualsModalContent.vue'
import HomebrewRituals from './homebrew-rituals/HomebrewRituals.vue'

defineProps<{character: Character}>()

const emit = defineEmits(['handleAddRitual', 'handleCloseModal'])

const componentOptions = [RitualsModalContent, HomebrewRituals]

const tabOptions = [
  {
    label: 'Rituais',
    value: 0
  },
  {
    label: 'Meus Rituais',
    value: 1
  }
]

const currentTab = ref(0)

const handleNavigation = (value: number) => currentTab.value = value

const handleAddRitual = (ritual: Ritual) => emit('handleAddRitual', ritual)
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
      <TabNav
        :current-tab="currentTab"
        :tab-options="tabOptions"
        @handle-navigation="handleNavigation"
      />
      <KeepAlive>
        <component
          :is="componentOptions[currentTab]"
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