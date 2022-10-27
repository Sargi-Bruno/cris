<script setup lang="ts">
import { computed } from 'vue'
import { ToastInfo } from '../types'

const props =  defineProps<{toast: ToastInfo}>()

defineEmits(['dismiss'])

const greenColor = '#5cb85c'
const blueColor = '#5bc0de'
const redColor = '#d9534f'
const grayColor = '#1F1F1F'

const toastColor = computed(() => {
  if(props.toast.type === 'success') return greenColor
  if(props.toast.type === 'error') return redColor
  if(props.toast.type === 'dice') return grayColor
  return blueColor
})
</script>

<template>
  <div 
    class="toast-wrapper"
    @click="$emit('dismiss')"
  >
    <div class="toast">
      <div class="toast-content">
        <img
          v-if="toast.type === 'success'"
          class="toast-icon"
          src="../assets/check-icon.svg" 
          alt="sucesso"
        >
        <img
          v-if="toast.type === 'info'"
          class="toast-icon"
          src="../assets/info-icon.svg" 
          alt="info"
        >
        <img
          v-if="toast.type === 'error'"
          class="toast-icon"
          src="../assets/error-icon.svg" 
          alt="erro"
        >
        <h3>{{ toast.message }}</h3>
        <button 
          class="close-icon"
          @click="$emit('dismiss')"
        >
          <img
            src="../assets/close-icon.svg" 
            alt="fechar"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-wrapper {
  z-index: 1000;
  position: fixed;
  width: 18rem;
  bottom: 3rem;
  right: 3rem;
}
.toast {
  padding: .5rem;
  background-color: v-bind(toastColor);
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  cursor: pointer;
}
.toast-content {
  display: flex;
  align-items: center;
}
.toast-content h3 {
  font-size: 16px;
}
.toast-icon {
  height: 2rem;
  margin-right: .5rem;
}
.close-icon {
  height: 1.25rem;
  background-color: transparent;
  border: none;
  margin-left: auto;
  margin-bottom: auto;
  cursor: pointer;
}
</style>