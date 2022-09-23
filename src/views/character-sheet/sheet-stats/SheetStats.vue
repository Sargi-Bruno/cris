<script setup lang="ts">
import { Character, AttrKeys } from '../../../types'
import InfoView from './InfoView.vue'
import AttributesView from './Attributes/AttributesView.vue'

defineProps<{character: Character}>()

const emit = defineEmits([
  'handleChangeCharText', 
  'handleChangeCharNumber', 
  'handleChangeAttribute', 
  'handleChangeCharDropdown', 
  'handleChangeMovementInSquares', 
  'handleRollAttribute'
])

const handleRollAttribute = (attr: AttrKeys) => {
  emit('handleRollAttribute', attr)
}
</script>

<template>
  <div class="sheet-stats-container">
    <div class="char-name">
      <div class="input-container">
        <input 
          type="text" 
          class="sheet-input-title"
          placeholder="Nome do personagem"
          autocomplete="nope"
          :value="character.name"
          @blur="e => $emit('handleChangeCharText', {e, key: 'name'})"
        >
        <h3>PERSONAGEM</h3>
      </div>
      <div class="input-container">
        <input 
          type="text" 
          class="sheet-input-title"
          placeholder="Nome do jogador"
          autocomplete="nope"
          :value="character.player"
          @blur="e => $emit('handleChangeCharText', {e, key: 'player'})"
        >
        <h3>JOGADOR</h3>
      </div>
    </div>
    <div class="char-attr">
      <AttributesView 
        :character="character"
        @handle-change-attribute="(payload) => $emit('handleChangeAttribute', payload)"
        @handle-roll-attribute="handleRollAttribute"
      />
    </div>
    <div class="char-info">
      <InfoView
        :character="character"
        @handle-change-char-text="payload => $emit('handleChangeCharText', payload)"
        @handle-change-char-number="payload => $emit('handleChangeCharNumber', payload)"
        @handle-change-char-dropdown="payload => $emit('handleChangeCharDropdown', payload)"
        @handle-change-movement-in-squares="e => $emit('handleChangeMovementInSquares', e)"
      />
    </div>
  </div>
</template>

<style scoped>
.sheet-stats-container {
  width: 26.5rem;
  padding-left: .5rem;
}
.char-name {
  display: flex;
  gap: 3rem;
}
.input-container h3 {
  font-size: 14px;
  font-weight: normal;
  margin-top: .25rem;
  margin-left: .25rem;
  margin-bottom: 0;
  color: var(--color-off-white);
}
.input-container input {
  width: 11.25rem;
  height: 2rem;
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--color-white);
  font-size: 18px;
  color: var(--color-white);
  padding-left: .25rem;
}
</style>