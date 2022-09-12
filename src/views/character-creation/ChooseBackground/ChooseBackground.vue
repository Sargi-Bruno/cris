<script setup lang="ts">
import { ref } from 'vue'
import { Background } from '../../../types'
import CurrentBackground from './CurrentBackground.vue'
import BackgroundsList from './BackgroundsList.vue'

const chosenBackground = ref<Background | null>(null)

const emit = defineEmits(['handleAddBackground', 'handleRemoveBackground'])

const handleAddBackground = (background: Background) => {
  chosenBackground.value = background
  emit('handleAddBackground', background)
}

const handleRemoveBackground = (background: Background) => {
  chosenBackground.value = null
  emit('handleRemoveBackground', background)
}
</script>

<template>
  <div v-if="chosenBackground">
    <CurrentBackground 
      :background="chosenBackground"
      @handle-remove-background="handleRemoveBackground"
    />
  </div>
  <div v-else>
    <BackgroundsList @handle-add-background="handleAddBackground" />
  </div>
</template>