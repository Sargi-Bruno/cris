<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

defineEmits(['dismiss'])

const greenColor = '#5cb85c'
const blueColor = '#5bc0de'
const redColor = '#d9534f'

const toastColor = computed(() => {
  if(props.type === 'success') return greenColor
  if(props.type === 'error') return redColor
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
          v-if="type === 'success'"
          class="toast-icon"
          src="../assets/check-icon.svg" 
          alt="sucesso"
        >
        <img
          v-if="type === 'info'"
          class="toast-icon"
          src="../assets/info-icon.svg" 
          alt="info"
        >
        <img
          v-if="type === 'error'"
          class="toast-icon"
          src="../assets/error-icon.svg" 
          alt="erro"
        >
        <h3>{{ value }}</h3>
        <img
          class="close-icon"
          src="../assets/close-icon.svg" 
          alt="fechar"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-wrapper {
  position: fixed;
  width: 18rem;
  height: 4rem;
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
  margin-left: auto;
  margin-bottom: auto;
}
</style>