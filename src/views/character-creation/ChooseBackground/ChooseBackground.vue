<script setup lang="ts">
import { Background } from '../../../types'
import CurrentBackground from './CurrentBackground.vue'
import BackgroundsList from './BackgroundsList.vue'

defineProps<{chosenBackground: Background | null}>()

const emit = defineEmits(['handleAddBackground', 'handleRemoveBackground'])

const handleAddBackground = (background: Background) => {
  
  emit('handleAddBackground', background)
}

const handleRemoveBackground = () => {
  emit('handleRemoveBackground')
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