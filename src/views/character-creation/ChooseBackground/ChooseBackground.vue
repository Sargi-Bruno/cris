<script setup lang="ts">
import { ref } from 'vue'
import { Background } from '../../../types'
import CurrentBackground from './CurrentBackground.vue'
import BackgroundsList from './BackgroundsList.vue'

const emit = defineEmits(['handleAddBackground'])

const handleAddBackground = (background: Background) => {
  chosenBackground.value = background
  emit('handleAddBackground', background)
}

const chosenBackground = ref<Background>()
</script>

<template>
  <div v-if="chosenBackground">
    <CurrentBackground :background="chosenBackground" />
  </div>
  <div v-else>
    <BackgroundsList @handle-add-background="handleAddBackground" />
  </div>
</template>