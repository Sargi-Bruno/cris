<script setup lang="ts">
import { Character, AttrKeys } from '../../../../types'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleRollAttribute'])

const handleRollAttribute = (attr: AttrKeys) => {
  if(props.disabledSheet) return
  emit('handleRollAttribute', attr)
}
</script>

<template>
  <div class="attr-container">
    <div class="image-container">
      <img class="attr-image" src="../../../../assets/attributes.png" alt="atributos">
      <button 
        class="attr str"
        :class="{ 'disabled': disabledSheet }"
        @click="handleRollAttribute('str')"
      >
        {{ character.attributes.str }}
      </button>
      <button 
        class="attr dex"
        :class="{ 'disabled': disabledSheet }"
        @click="handleRollAttribute('dex')"
      >
        {{ character.attributes.dex }}
      </button>
      <button 
        class="attr int"
        :class="{ 'disabled': disabledSheet }"
        @click="handleRollAttribute('int')"
      >
        {{ character.attributes.int }}
      </button>
      <button 
        class="attr con"
        :class="{ 'disabled': disabledSheet }"
        @click="handleRollAttribute('con')"
      >
        {{ character.attributes.con }}
      </button>
      <button 
        class="attr pre"
        :class="{ 'disabled': disabledSheet }"
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
.disabled {
  cursor: auto;
}
.disabled:hover {
  color: var(--color-white);
}
</style>