<script setup lang="ts">
import { Character } from '../../types'

defineProps<{character: Character}>()

const emit = defineEmits(['handleChangeAttribute'])

const handleChangeAttribute = (e: Event, attribute: string) => {
  const payload = {
    value: (e.target as HTMLInputElement).valueAsNumber,
    attribute
  }
  emit('handleChangeAttribute', payload)
}
</script>

<template>
  <div class="container">
    <div class="text-container">
      <p>
        Quando você cria um personagem, todos os seus atributos começam em 1 e você recebe 4 pontos 
        para distribuir entre eles como quiser. Você também pode reduzir um atributo para 0 para receber 
        1 ponto adicional. O valor máximo inicial que 
        você pode ter em cada atributo é 3.
      </p>
    </div>
    <div class="image-container">
      <img src="../../assets/attributes.webp" alt="atributos">
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
.container {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}
.text-container {
  width: 40%;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 3rem;
}
.text-container p {
  font-size: 26px;
  text-align: justify;
}
.image-container {
  position: relative;
}
.input {
  text-align: center;
  width: 3rem;
  font-size: 42px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--color-white);
}
.input:focus {
  outline: none;
}
.str {
  position: absolute;
  top: 31%;
  left: 14%;
}
.dex {
  position: absolute;
  top: 11%;
  left: 45%;
}
.int {
  position: absolute;
  top: 31%;
  left: 76%;
}
.con {
  position: absolute;
  top: 68%;
  left: 67%;
}
.pre {
  position: absolute;
  top: 68%;
  left: 23%;
}
</style>