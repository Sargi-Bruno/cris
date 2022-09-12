<script setup lang="ts">
import { ref } from 'vue'
import { Class } from '../../../types'
import CurrentClass from './CurrentClass.vue'
import ClassList from './ClassList.vue'

const chosenClass = ref<Class | null>(null)

const emit = defineEmits(['handleAddClass', 'handleRemoveClass'])

const handleAddClass = (charClass: Class) => {
  chosenClass.value = charClass
  emit('handleAddClass', charClass)
}

const handleRemoveClass = (charClass: Class) => {
  chosenClass.value = null
  emit('handleRemoveClass', charClass)
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