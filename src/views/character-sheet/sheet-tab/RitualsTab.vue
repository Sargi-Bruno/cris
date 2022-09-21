<script setup lang="ts">
import { Character } from '../../../types'
import RitualCard from '../../../components/RitualCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenRitualsModal', 'handleRemoveRitual'])
</script>
  
<template>
  <div class="rituals-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenRitualsModal')"
    >
      Adicionar
    </button>
    <div v-if="character.rituals.length > 0" class="sheet-cards-container">
      <div 
        v-for="ritual in character.rituals" 
        :key="ritual.id"
        class="sheet-card-list"
      >
        <RitualCard 
          :id="ritual.id"
          :ritual="ritual"
          only-show
          sheet
          @handle-remove="(id: string) => $emit('handleRemoveRitual', id)"
        />
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possue rituais</h3>
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