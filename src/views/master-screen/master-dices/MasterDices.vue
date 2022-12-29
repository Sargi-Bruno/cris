<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['handleRollMasterDices'])

const rollDicesValue = ref('')

const handleRollDices = () => {
  emit('handleRollMasterDices', rollDicesValue.value)
  rollDicesValue.value = ''
}
</script>

<template>
  <div class="roll-dices-container">
    <button
      class="dice-button"
      @click="handleRollDices"
    >
      <img
        class="dice-icon"
        src="../../../assets/d20-icon.png" 
        alt="rolar"
      >
    </button>
    <input 
      v-model="rollDicesValue"
      type="text"
      class="roll-dice-input"
      placeholder="Rolar dados"
      @keyup.enter="handleRollDices"
    >
  </div>
</template>

<style scoped>
.roll-dices-container {
  width: 40rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.dice-button {
  background-color: transparent;
  border: none;
  width: 2rem;
  height: 2rem;
}
.dice-button:hover {
  cursor: pointer;
}
.roll-dice-input {
  width: 100%;
  background-color: transparent;
  color: var(--color-white);
  font-size: 16px;
  border: none;
  border-bottom: 1px solid var(--color-white);
  margin-left: .5rem;
}
.dice-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>