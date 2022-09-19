<script setup lang="ts">
import { Skill } from '../../../../types'

defineProps<{skill: Skill}>()

defineEmits(['handleCloseModal'])
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>{{ skill.name }}</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body">
      <div v-html="skill.description" />
    </div>
  </div>
</template>

<style scoped>
.modal-width {
  width: 40rem;
}
</style>