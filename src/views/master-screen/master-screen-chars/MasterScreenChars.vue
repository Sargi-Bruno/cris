<script setup lang="ts">
import { Character } from '../../../types'
import CharStatusCard from './CharStatusCard.vue'

interface Props {
  characters: Character[]
}

defineProps<Props>()
</script>

<template>
  <div class="master-screen-chars-container">
    <div 
      v-for="character in characters"
      :key="character.id"
    >
      <CharStatusCard :character="character" />
    </div>
  </div>
</template>

<style scoped>
.master-screen-chars-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  max-height: 54rem;
  overflow: auto;
  overflow-x: hidden;
}
.master-screen-chars-container::-webkit-scrollbar {
  display: none;
}
@media only screen and (max-width: 1280px) {
  .master-screen-chars-container {
    max-height: 36rem;
  }
}
</style>