<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  title: {
    type: String,
    required: true
  },
  buttonWidth: {
    type: String,
    default: '3.25rem'
  },
  value: {
    type: String,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  },
  bold: Boolean
})

const emit = defineEmits(['updateValue'])

const dropdown = ref(null)
const open = ref(false)

onClickOutside(dropdown, () => open.value = false)

const handleUpdateValue = (option: string) => {
  open.value = false
  emit('updateValue', option)
}
</script>

<template>
  <div ref="dropdown" class="dropdown-container">
    <h4 class="sheet-subtitle">
      {{ title }}
    </h4>
    <div class="dropdown-button-container">
      <button
        class="dropdown-button"
        :class="{ 'bold': bold }"
        @click="open = !open"
      >
        {{ value }}
      </button>
      <div 
        class="dropdown-content"
        :class="{ 'dropdown-content-active': open }"
      >
        <div v-for="(option, i) in options" :key="i">
          <button 
            class="dropdown-content-button"
            :class="{ 'bold': bold }"
            @click="handleUpdateValue(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  align-items: center;
  gap: .5rem
}
.dropdown-button-container {
  width: v-bind(buttonWidth);
  position: relative;
}
.dropdown-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  border: 1px solid var(--color-white);
  cursor: pointer;
  background-color: transparent;
  font-size: 14px;
  margin: 0;
  color: var(--color-white);
}
.bold {
  font-weight: bold;
}
.dropdown-button:hover {
  color: var(--color-primary);
}
.dropdown-content {
  z-index: 1;
  width: inherit;
  max-height: 12.5rem;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: calc(100% + .25rem);
  padding: .5rem;
  border-radius: 4px;
  background-color: var(--color-light-black);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}
.dropdown-content-active {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.dropdown-content::-webkit-scrollbar {
  width: 4px;
}
.dropdown-content::-webkit-scrollbar-track {
  background: transparent;
  border: solid 3px transparent;
}
.dropdown-content::-webkit-scrollbar-thumb {
  background: var(--color-smoky-black);
  border-radius: 4px;
  border: solid 3px transparent;
}
.dropdown-content-button {
  width: 100%;
  cursor: pointer;
  color: var(--color-white);
  font-size: 14px;
  background-color: transparent;
  border: none;
  height: 2.25rem;
}
.dropdown-content-button:hover {
  color: var(--color-primary);
}
</style>