<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  options: {
    type: Array<string>,
    required: true
  },
  width: {
    type: String,
    default: '6.25rem'
  },
  contentWidth: {
    type: String,
    default: '7.5rem'
  },
  formInput: Boolean,
  smallInput: Boolean,
  disabled: Boolean
})

const emit = defineEmits(['updateValue'])

const dropdown = ref(null)
const open = ref(false)

onClickOutside(dropdown, () => open.value = false)

const handleOpen = () => {
  if(props.disabled) return
  open.value = !open.value
}

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
        :disabled="disabled"
        :class="{'form-input-button': formInput, 'small-input-button': smallInput, 'disabled': disabled}"
        @click="handleOpen"
      >
        {{ value }}
      </button>
      <div 
        class="dropdown-content"
        :class="{'dropdown-content-active': open, 'form-input-content': formInput}"
      >
        <div v-for="(option, i) in options" :key="i">
          <button 
            class="dropdown-content-button"
            :class="{'form-input-button': formInput, 'small-input': smallInput}"
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
  width: v-bind(width);
  position: relative;
}
.dropdown-button {
  width: v-bind(width);
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-white);
  color: var(--color-white);
  padding: 0;
  font-size: 14px;
  text-align: center;
}
.dropdown-button:hover {
  color: var(--color-primary);
  cursor: pointer;
}
.form-input-button {
  height: 2rem;
  background: var(--color-smoky-black);
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  font-size: 16px;
  text-align: left;
  padding-left: .5rem;
}
.dropdown-content {
  z-index: 1;
  width: v-bind(contentWidth);
  max-height: 20rem;
  position: absolute;
  left: -0.75rem;
  top: calc(100% + .25rem);
  padding: .5rem;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  background-color: var(--color-light-black);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  overflow-y: auto;
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
.form-input-content {
  left: 0;
  background-color: var(--color-smoky-black);
  border: 1px solid var(--color-gray);
  padding-left: 0;
  padding-right: 0;
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
.form-input-button {
  text-align: left;
}
.dropdown-content-button:hover {
  color: var(--color-primary);
}
.small-input-button {
  text-align: center;
  padding-left: 0;
}
.small-input {
  text-align: center;
}
.disabled:hover {
  color: var(--color-white);
  cursor: default;
}
</style>