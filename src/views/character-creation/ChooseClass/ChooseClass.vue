<script setup lang="ts">
import { Class } from '../../../types'
import CurrentClass from './CurrentClass.vue'
import ClassList from './ClassList.vue'

defineProps<{chosenClass: Class | null}>()

const emit = defineEmits(['handleAddClass', 'handleRemoveClass'])

const handleAddClass = (charClass: Class) => {
  emit('handleAddClass', charClass)
}

const handleRemoveClass = () => {
  emit('handleRemoveClass')
}
</script>

<template>
  <div v-if="chosenClass">
    <CurrentClass
      :char-class="chosenClass"
      @handle-remove-class="handleRemoveClass"
    />
  </div>
  <div v-else>
    <ClassList @handle-add-class="handleAddClass" />
  </div>
</template>