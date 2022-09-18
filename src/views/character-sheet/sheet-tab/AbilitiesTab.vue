<script setup lang="ts">
import { Character } from '../../../types'
import PowerCard from '../../../components/PowerCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenAbilitiesModal'])
</script>

<template>
  <div class="abilities-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenAbilitiesModal')"
    >
      Adicionar
    </button>
    <div v-if="character.powers.length > 0">
      <div v-for="(power, index) in character.powers" :key="index">
        <PowerCard :power="power" />
      </div>
    </div>
    <div v-else>
      <h3>Você ainda não possue habilidades</h3>
    </div>
  </div>
</template>

<style scoped>
.add-button {
  display: block;
  margin-left: auto;
} 
</style>