<script setup lang="ts">
defineProps({
  currentStep: {
    type: Number,
    default: 0
  }
})

defineEmits(['handleNavigation'])

const stepperOptions = [
  { label: 'Atributos', value: 0 },
  { label: 'Origem', value: 1 },
  { label: 'Classe', value: 2 },
  { label: 'Toques Finais', value: 3 }
]
</script>

<template>
  <div class="container">
    <div 
      v-for="option in stepperOptions" 
      :key="option.value"
      @click="$emit('handleNavigation', option.value)"
    >
      <h1 class="title" :class="{ active: option.value === currentStep }">
        {{ option.label }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 2rem
}
.title {
  color: var(--color-white);
  cursor: pointer;
}
.active {
  color: var(--color-primary);
}
</style>