<script setup lang="ts">
import { computed } from 'vue'
import { ToastRoll } from '../types'

const props =  defineProps<{toast: ToastRoll}>()

const greenColor = '#5cb85c'
const redColor = '#d9534f'
const whiteColor = '#fff'

const totalColor = computed(() => {
  let color = whiteColor

  if(props.toast.title === 'Resultado') return color
  
  const outputArray = props.toast.output.substring(props.toast.output.indexOf('[') + 1, props.toast.output.indexOf(']')).split(',')

  if(outputArray.length > 1) {
    outputArray.map(value => {
      if(!value.includes('d')) {
        if(parseInt(value) === 20) color = greenColor
        if(parseInt(value) === 1) color = redColor
      }
    })
  } else {
    const outputSubstring = props.toast.output.substring(props.toast.output.indexOf('[') + 1, props.toast.output.indexOf(']'))

    if(parseInt(outputSubstring) === 20) color = greenColor
    if(parseInt(outputSubstring) === 1) color = redColor
  }
  
  return color
})
</script>

<template>
  <div class="toast">
    <div class="toast-content">
      <img
        class="toast-icon"
        src="../assets/d20-icon.png" 
        alt="d20"
      >
      <div class="text">
        <h3 class="title">
          {{ toast.title }}
        </h3>
        <div class="result">
          <div class="result-container">
            <h4>{{ toast.output }}</h4>
            <h4 v-if="toast.title === 'Resultado'">
              {{ toast.notation }}
            </h4>
          </div>
          <span>=</span>
          <div class="total-container">
            <h3>{{ toast.total }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  padding: .5rem;
  background-color: var(--color-dark-gray);
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border: 1px solid var(--color-primary);
  border-radius: 4px;
}
.toast-content {
  display: flex;
  align-items: center;
  height: 4.5rem;
}
.text {
  margin-left: .5rem;
}
.title {
  font-size: 16px;
  color: var(--color-white);
  margin: 0;
}
.result {
  display: flex;
  align-items: center;
}
.result span {
  color: var(--color-white);
  font-size: 16px;
}
.result-container {
  margin-right: .5rem;
}
.result-container h4 {
  margin: 0;
  font-size: 12px;
  color: var(--color-off-white);
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.total-container {
  margin-left: 1rem;

}
.total-container h3 {
  width: 2.25rem;
  text-align: center;
  margin: 0;
  font-size: 24px;
  color: v-bind(totalColor);
}
.toast-icon {
  height: 1.5rem;
  margin-right: .5rem;
}
</style>