<script setup lang="ts">
import { Character, AttrKeys } from '../../../../types'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleRollAttribute', 'handleEdit'])

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
    <div v-if="!disabledSheet">
      <button class="change-button" @click="$emit('handleEdit')">
        <img 
          src="../../../../assets/edit-icon.svg" 
          alt="editar"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
@import './attributes.css';
.attr-container {
  position: relative;
}
.attr {
  text-align: center;
  width: 2rem;
  font-size: 26px;
  color: var(--color-white);
  background-color: var(--color-smoky-black);
  padding: 0;
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