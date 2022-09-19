<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true
  },
  dark: Boolean
})

const emit = defineEmits(['update'])

const update = (e: Event) => {
  emit('update', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="container" :class="{ 'dark': dark }">
    <img class="icon" src="../assets/search-icon.png" alt="buscar">
    <input 
      class="input" 
      type="text"
      placeholder="Buscar"
      :value="value"
      @input="update"
    >
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  background-color: var(--color-dark-gray);
  border-radius: 4px;
}
.dark {
  background-color: var(--color-smoky-black);
}
.icon {
  margin-left: .25rem;
  margin-right: .5rem;
  height: 2rem;
}
.input {
  width: 100%;
  height: 2.5rem;
  background-color: transparent;
  color: var(--color-white);
  border: none;
  font-size: 18px;
}
.input:focus {
  outline: none;
}
</style>