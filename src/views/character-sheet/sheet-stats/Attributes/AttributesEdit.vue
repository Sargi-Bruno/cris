<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { Character } from '../../../../types'

defineProps<{character: Character}>()

const emit = defineEmits(['handleChangeAttribute', 'handleEdit'])

const instance = getCurrentInstance()

const handleChangeAttribute = (e: Event, key: string) => {
  emit('handleChangeAttribute', {e, key})
  instance?.proxy?.$forceUpdate()
}
</script>

<template>
  <div class="attr-container">
    <div class="image-container">
      <img class="attr-image" src="../../../../assets/attributes.png" alt="atributos">
      <input 
        type="number" 
        class="input str"
        :value="character.attributes.str"
        @blur="e => handleChangeAttribute(e, 'str')"
      >
      <input 
        type="number" 
        class="input dex" 
        :value="character.attributes.dex"
        @blur="e => handleChangeAttribute(e, 'dex')"
      >
      <input 
        type="number" 
        class="input int" 
        :value="character.attributes.int"
        @blur="e => handleChangeAttribute(e, 'int')"
      >
      <input 
        type="number" 
        class="input con" 
        :value="character.attributes.con"
        @blur="e => handleChangeAttribute(e, 'con')"
      >
      <input 
        type="number" 
        class="input pre" 
        :value="character.attributes.pre"
        @blur="e => handleChangeAttribute(e, 'pre')"
      >
    </div>
    <button class="change-button" @click="$emit('handleEdit')">
      <img 
        src="../../../../assets/done-icon.svg" 
        alt="concluir"
      >
    </button>
  </div>
</template>

<style scoped>
@import './attributes.css';
.attr-container {
  position: relative;
}
.input {
  text-align: center;
  width: 2rem;
  font-size: 26px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--color-white);
}
.change-button {
  display: block;
  background: transparent;
  border: none;
  margin: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>