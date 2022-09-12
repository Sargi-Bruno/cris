<script setup lang="ts">
import { PropType } from 'vue'
import ClassCard from './ClassCard.vue'
import { Class } from '../../../types'

const props = defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  }
})

const emit = defineEmits(['handleRemoveClass'])

const handleRemoveClass = () => {
  emit('handleRemoveClass', props.charClass)
}
</script>

<template>
  <div class="current-class-container">
    <button
      class="button button-primary"
      @click="handleRemoveClass"
    >
      Mudar Classe
    </button>
    <ClassCard 
      :char-class="charClass"
      only-view
    />
  </div>
</template>

<style scoped>
.current-class-container {
  width: 50%;
  margin: 0 auto;
}
.button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
</style>