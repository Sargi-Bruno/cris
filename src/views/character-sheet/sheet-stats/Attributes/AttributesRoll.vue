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
      <img class="attr-image" src="../../../../assets/attributes.png" alt="atributos">
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
@import './attributes.css';
.attr {
  text-align: center;
  width: 2rem;
  font-size: 26px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  border: none;
  cursor: pointer;
}
.attr:hover {
  color: var(--color-primary);
}

</style>