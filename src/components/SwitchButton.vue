<script setup lang="ts">
interface Option {
  label: string,
  value: number
}

defineProps({
  value: {
    type: Number,
    required: true
  },
  options: {
    type: Array<Option>,
    required: true
  }
})

defineEmits(['handleNavigation'])
</script>

<template>
  <div class="switch-container">
    <button 
      v-for="option in options" 
      :key="option.value"
      class="switch-button"
      :class="{ active: option.value === value }"
      @click="$emit('handleNavigation', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.switch-container {
  display: flex;
}
.switch-button {
  min-width: 9rem;
  height: 2rem;
  padding-left: .5rem;
  padding-right: .5rem;
  background-color: transparent;
  font-size: 14px;
  border: 1px solid var(--color-primary);
  color: var(--color-off-white);
  cursor: pointer;
  transition: background-color .1s ease-in-out;
}
.active {
  background-color: var(--color-primary);
  color: var(--color-white);
}
.switch-button:first-of-type {
  border-radius: 4px 0 0 4px;
}
.switch-button:last-of-type {
  border-radius: 0 4px 4px 0;
}
</style>