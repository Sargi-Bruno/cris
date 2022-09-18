<script setup lang="ts">
import { Character } from '../../../types'
import RitualCard from '../../../components/RitualCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenRitualsModal'])
</script>
  
<template>
  <div class="rituals-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenRitualsModal')"
    >
      Adicionar
    </button>
    <div v-if="character.rituals.length > 0">
      <div v-for="(ritual, index) in character.rituals" :key="index">
        <RitualCard :ritual="ritual" />
      </div>
    </div>
    <div v-else>
      <h3>Você ainda não possue rituais</h3>
    </div>
  </div>
</template>
  
<style scoped>
.add-button {
  display: block;
  margin-left: auto;
} 
</style>