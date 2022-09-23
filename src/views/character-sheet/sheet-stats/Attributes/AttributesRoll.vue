<script setup lang="ts">
import { Character, AttrKeys } from '../../../../types'

defineProps<{character: Character}>()

const emit = defineEmits(['handleRollAttribute'])

const handleRollAttribute = (attr: AttrKeys) => {
  emit('handleRollAttribute', attr)
}
</script>

<template>
  <div class="attr-container">
    <div class="image-container">
      <img class="attr-image" src="../../../../assets/attributes.webp" alt="atributos">
      <button 
        class="attr str"
        @click="handleRollAttribute('str')"
      >
        {{ character.attributes.str }}
      </button>
      <button 
        class="attr dex"
        @click="handleRollAttribute('dex')"
      >
        {{ character.attributes.dex }}
      </button>
      <button 
        class="attr int"
        @click="handleRollAttribute('int')"
      >
        {{ character.attributes.int }}
      </button>
      <button 
        class="attr con"
        @click="handleRollAttribute('con')"
      >
        {{ character.attributes.con }}
      </button>
      <button 
        class="attr pre"
        @click="handleRollAttribute('pre')"
      >
        {{ character.attributes.pre }}
      </button>
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
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.attr {
  text-align: center;
  width: 2rem;
  font-size: 28px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  border: none;
  cursor: pointer;
}
.attr:hover {
  color: var(--color-primary);
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