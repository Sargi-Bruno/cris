<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  value: {
    type: String,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  up: Boolean,
  underline: Boolean
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
  <div ref="dropdown">
    <div class="dropdown-button-container">
      <span v-if="!underline" class="span">(</span>
      <button
        class="dropdown-button"
        :class="{ 'dropdown-underline': underline }"
        @click="open = !open"
      >
        {{ value }}
      </button>
      <span v-if="!underline" class="span">)</span>
      <div 
        class="dropdown-content"
        :class="[{'dropdown-content-active': open}, up ? 'dropdown-position-up' : 'dropdown-position-down']"
      >
        <div v-for="(option, i) in options" :key="i">
          <button 
            class="dropdown-content-button"
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
.dropdown-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
}
.span {
  color: v-bind(color);
  font-size: 14px;
}
.dropdown-button {
  width: 2.25rem;
  background-color: transparent;
  border: none;
  color: v-bind(color);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
.dropdown-underline {
  border-bottom: 1px solid v-bind(color);
}
.dropdown-button:hover {
  color: var(--color-primary);
}
.dropdown-content {
  z-index: 1;
  width: 3.25rem;
  position: absolute;
  left: 0;
  padding: .5rem;
  border-radius: 4px;
  background-color: var(--color-light-black);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
}
.dropdown-position-up {
  bottom: calc(100% + .25rem);
}
.dropdown-position-down {
  top: calc(100% + .25rem);
}
.dropdown-content-active {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
.dropdown-content-button {
  width: 100%;
  cursor: pointer;
  color: var(--color-white);
  font-size: 14px;
  background-color: transparent;
  border: none;
  height: 2.25rem;
  text-align: center;
}
.dropdown-content-button:hover {
  color: var(--color-primary);
}
</style>