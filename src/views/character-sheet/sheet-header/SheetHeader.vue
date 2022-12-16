<script setup lang="ts">
import { Character } from '../../../types'

defineEmits([
  'handleChangeCharText'
])

defineProps<{character: Character, disabledSheet: boolean}>()
</script>

<template>
  <div class="sheet-header-container">
    <div class="profile-picture-container">
    </div>
    <div class="header-info-container">
      <div class="header-info-row">
        <div class="info-line">
          <h3>PERSONAGEM</h3>
          <input 
            type="text" 
            class="sheet-input"
            autocomplete="nope"
            :disabled="disabledSheet"
            :value="character.name"
            @blur="e => $emit('handleChangeCharText', {e, key: 'name'})"
          >
        </div>
        <div class="info-line">
          <h3>JOGADOR</h3>
          <input 
            type="text" 
            class="sheet-input"
            autocomplete="nope"
            :disabled="disabledSheet"
            :value="character.player"
            @blur="e => $emit('handleChangeCharText', {e, key: 'player'})"
          >
        </div>
      </div>
      <div class="header-info-row">
        <div class="info-line">
          <h3>ORIGEM</h3>
          <input 
            type="text" 
            class="sheet-input"
            autocomplete="nope"
            :disabled="disabledSheet"
            :value="character.backgroundName"
            @blur="e => $emit('handleChangeCharText', {e, key: 'backgroundName'})"
          >
        </div>
        <div class="info-line">
          <h3>CLASSE</h3>
          <input 
            type="text" 
            class="sheet-input"
            autocomplete="nope"
            :disabled="disabledSheet"
            :value="character.className"
            @blur="e => $emit('handleChangeCharText', {e, key: 'className'})"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sheet-header-container {
  display: flex;
  margin-top: .75rem;
}
.profile-picture-container {
  width: 3.75rem;
  height: 3.75rem;
  border: 1px solid var(--color-off-white);
  margin-top: auto;
  margin-right: 1.5rem;
}
.header-info-container {
  margin-top: auto;
  margin-bottom: .5rem;
}
.header-info-row {
  display: flex;
  gap: 1.5rem;
}
.header-info-row:last-of-type {
  margin-top: .5rem;
}
.info-line {
  display: flex;
  align-items: flex-end;
}
.info-line h3 {
  width: 4.25rem;
  margin: 0;
  font-size: 10px;
  color: var(--color-off-white);
}
.info-line input {
  width: 15.5rem;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid var(--color-white);
  margin-left: .5rem;
  margin-right: 0;
  margin-bottom: 0;
  text-align: left;
  font-weight: normal;
}
</style>