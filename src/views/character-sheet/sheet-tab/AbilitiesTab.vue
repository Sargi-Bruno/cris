<script setup lang="ts">
import { computed } from 'vue'
import { Character } from '../../../types'
import PowerCard from '../../../components/PowerCard.vue'

const props = defineProps<{character: Character}>()

defineEmits(['handleOpenAbilitiesModal', 'handleRemovePower'])

const powersOrdered = computed(() => {
  const powers = [...props.character.powers]
  return powers.sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div class="abilities-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenAbilitiesModal')"
    >
      Adicionar
    </button>
    <div v-if="character.powers.length > 0" class="sheet-cards-container">
      <div 
        v-for="power in powersOrdered" 
        :key="power.id"
        class="sheet-card-list"
      >
        <PowerCard 
          :id="power.id"
          :power="power"
          only-show
          sheet
          @handle-remove="(id: string) => $emit('handleRemovePower', id)"
        />
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possue habilidades</h3>
    </div>
  </div>
</template>

<style scoped>
.no-content h3 {
  text-align: center;
  margin-top: 10rem;
}
.add-button {
  display: block;
  margin-left: auto;
} 
.sheet-cards-container {
  margin-top: 1rem;
}
.sheet-card-list {
  margin-bottom: .5rem;
}
</style>