<script setup lang="ts">
import { Character } from '../../../../types'

defineProps<{character: Character}>()

const emit = defineEmits(['handleChangeAttribute'])

const handleChangeAttribute = (e: Event, attribute: 'str' | 'dex' | 'int' | 'con' | 'pre') => {
  const payload = {
    value: (e.target as HTMLInputElement).valueAsNumber,
    attribute
  }
  emit('handleChangeAttribute', payload)
}
</script>

<template>
  <div class="attr-container">
    <div class="image-container">
      <img class="attr-image" src="../../../../assets/attributes.webp" alt="atributos">
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
  </div>
</template>

<style scoped>
.attr-container {
  display: flex;
}
.image-container {
  margin: 0 auto;
  position: relative;
}
.attr-image {
  height: 20rem;
  pointer-events: none;
}
.input {
  text-align: center;
  width: 2rem;
  font-size: 28px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--color-white);
}
.input:hover {
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-primary);
}
.str {
  position: absolute;
  top: 30%;
  left: 14%;
}
.dex {
  position: absolute;
  top: 10%;
  left: 45%;
}
.int {
  position: absolute;
  top: 30%;
  left: 76%;
}
.con {
  position: absolute;
  top: 67%;
  left: 67%;
}
.pre {
  position: absolute;
  top: 67%;
  left: 23%;
}
</style>