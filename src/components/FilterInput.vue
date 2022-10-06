<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update'])

const update = (e: Event) => {
  emit('update', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input 
    class="sheet-input filter-input" 
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="update"
  >
</template>

<style scoped>
.filter-input {
  width: 21.5rem;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid var(--color-white);
  margin-left: .5rem;
  margin-right: 1rem;
  text-align: left;
  font-weight: normal;
  font-size: 16px;
}
</style>