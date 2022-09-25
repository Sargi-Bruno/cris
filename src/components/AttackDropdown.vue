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
  }
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
      <button
        class="dropdown-button"
        @click="open = !open"
      >
        {{ value }}
      </button>
      <div 
        class="dropdown-content"
        :class="{'dropdown-content-active': open}"
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
  width: 6rem;
  position: relative;
}
.dropdown-button {
  width: 6rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-white);
  color: var(--color-white);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}
.dropdown-button:hover {
  color: var(--color-primary);
}
.dropdown-content {
  z-index: 1;
  width: 6rem;
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