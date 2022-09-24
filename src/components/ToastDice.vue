<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  notation: {
    type: String,
    required: true
  }
})

defineEmits(['dismiss'])

const greenColor = '#5cb85c'
const redColor = '#d9534f'
const whiteColor = '#fff'

const totalColor = computed(() => {
  let color = whiteColor

  if(props.title === 'Resultado') return color
  
  const resultArray = props.result.substring(props.result.indexOf('['), props.result.indexOf(']')).split(',')

  if(resultArray.length > 1) {
    resultArray.map(value => {
      if(!value.includes('d')) {
        if(parseInt(value) === 20) color = greenColor
        if(parseInt(value) === 1) color = redColor
      }
    })
  } else {
    const resultSubstring = props.result.substring(props.result.indexOf('[') + 1, props.result.indexOf(']'))

    if(parseInt(resultSubstring) === 20) color = greenColor
    if(parseInt(resultSubstring) === 1) color = redColor
  }
  
  return color
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
          class="toast-icon"
          src="../assets/d20-icon.png" 
          alt="d20"
        >
        <div class="text">
          <h3 class="title">
            {{ title }}
          </h3>
          <div class="result">
            <div class="result-container">
              <h4>{{ result }}</h4>
              <h4 v-if="title === 'Resultado'">
                {{ notation }}
              </h4>
            </div>
            <span>=</span>
            <div class="total-container">
              <h3>{{ total }}</h3>
            </div>
          </div>
        </div>
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
  position: fixed;
  width: 18rem;
  bottom: 3rem;
  right: 3rem;
}
.toast {
  padding: .5rem;
  background-color: var(--color-dark-gray);
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  cursor: pointer;
}
.toast-content {
  display: flex;
  align-items: center;
}
.text {
  margin-left: .5rem;
}
.title {
  font-size: 20px;
  color: var(--color-white);
  margin: 0;
}
.result {
  display: flex;
  align-items: center;
}
.result span {
  color: var(--color-white);
  font-size: 14px;
}
.result-container {
  margin-right: .5rem;
}
.result-container h4 {
  margin: 0;
  font-size: 14px;
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
  text-align: right;
  margin: 0;
  font-size: 32px;
  color: v-bind(totalColor);
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