<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  totalAttack: {
    type: Number,
    required: true
  },
  totalDamage: {
    type: Number,
    required: true
  },
  critical: {
    type: Number,
    required: true
  }
})

defineEmits(['dismiss'])

const greenColor = '#5cb85c'
const redColor = '#d9534f'
const whiteColor = '#fff'

const attackColor = computed(() => {
  if(props.critical === 1) return greenColor
  if(props.critical === -1) return redColor
  return whiteColor
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
            <div class="attack-container">
              <h3>{{ totalAttack }}</h3>
              <h4>ATAQUE</h4>
            </div>
            <div class="divider" />
            <div class="damage-container">
              <h3>{{ totalDamage }}</h3>
              <h4>DANO</h4>
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
  width: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.result h3 {
  width: 2.25rem;
  margin: 0;
  font-size: 32px;
  text-align: center;
}
.result h4 {
  margin: 0;
  font-size: 14px;
  color: var(--color-off-white);
  text-align: center;
}
.attack-container {
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.attack-container h3 {
  color: v-bind(attackColor);
}
.damage-container {
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.divider {
  height: 2.75rem;
  margin-bottom: auto;
  border-left: 1px solid var(--color-off-white);
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