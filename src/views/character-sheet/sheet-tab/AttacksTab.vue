<script setup lang="ts">
import { Character } from '../../../types'
import AttackCard from '../../../components/AttackCard.vue'

defineProps<{character: Character}>()

defineEmits(['handleOpenAttacksModal'])
</script>
  
<template>
  <div class="attacks-tab">
    <button 
      class="button-primary add-button"
      @click="$emit('handleOpenAttacksModal')"
    >
      Adicionar
    </button>
    <div v-if="character.attacks.length > 0">
      <div v-for="(attack, index) in character.attacks" :key="index">
        <AttackCard :attack="attack" />
      </div>
    </div>
    <div v-else>
      <h3>Você ainda não possue ataques</h3>
    </div>
  </div>
</template>
  
<style scoped>
.add-button {
  display: block;
  margin-left: auto;
} 
</style>