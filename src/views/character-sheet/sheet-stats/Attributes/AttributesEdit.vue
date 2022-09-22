<script setup lang="ts">
import { Character } from '../../../../types'

defineProps<{character: Character}>()

defineEmits(['handleChangeAttribute'])
</script>

<template>
  <div class="attr-container">
    <div class="image-container">
      <img class="attr-image" src="../../../../assets/attributes.webp" alt="atributos">
      <input 
        type="number" 
        class="input str"
        :value="character.attributes.str"
        @blur="e => $emit('handleChangeAttribute', { e, attr: 'str' })"
      >
      <input 
        type="number" 
        class="input dex" 
        :value="character.attributes.dex"
        @blur="e => $emit('handleChangeAttribute', { e, attr: 'dex' })"
      >
      <input 
        type="number" 
        class="input int" 
        :value="character.attributes.int"
        @blur="e => $emit('handleChangeAttribute', { e, attr: 'int' })"
      >
      <input 
        type="number" 
        class="input con" 
        :value="character.attributes.con"
        @blur="e => $emit('handleChangeAttribute', { e, attr: 'con' })"
      >
      <input 
        type="number" 
        class="input pre" 
        :value="character.attributes.pre"
        @blur="e => $emit('handleChangeAttribute', { e, attr: 'pre' })"
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