<script setup lang="ts">
import { Character, AttrKeys } from '../../../types'
import InfoView from './InfoView.vue'
import AttributesView from './Attributes/AttributesView.vue'

defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits([
  'handleChangeCharText', 
  'handleChangeCharNumber', 
  'handleChangeAttribute', 
  'handleChangeCharDropdown', 
  'handleChangeMovementInSquares', 
  'handleRollAttribute',
  'handleChangeCharNumberButton',
  'handleChangeCharMark',
  'handleChangeMarkModeToTrue',
  'handleMarkHeal'
])

const handleRollAttribute = (attr: AttrKeys) => {
  emit('handleRollAttribute', attr)
}
</script>

<template>
  <div class="sheet-stats-container">
    <div class="char-attr">
      <AttributesView 
        :character="character"
        :disabled-sheet="disabledSheet"
        @handle-change-attribute="payload => $emit('handleChangeAttribute', payload)"
        @handle-roll-attribute="handleRollAttribute"
      />
    </div>
    <div class="char-info">
      <InfoView
        :character="character"
        :disabled-sheet="disabledSheet"
        @handle-change-char-text="payload => $emit('handleChangeCharText', payload)"
        @handle-change-char-number="payload => $emit('handleChangeCharNumber', payload)"
        @handle-change-char-dropdown="payload => $emit('handleChangeCharDropdown', payload)"
        @handle-change-movement-in-squares="e => $emit('handleChangeMovementInSquares', e)"
        @handle-change-char-number-button="(value: number, key: string) => $emit('handleChangeCharNumberButton', value, key)"
        @handle-change-char-mark="(type: 'pv' | 'pe' | 'san', i: number) => $emit('handleChangeCharMark', type, i)"
        @handle-change-mark-mode-to-true="(type: 'pv' | 'pe' | 'san') => $emit('handleChangeMarkModeToTrue', type)"
        @handle-mark-heal="(type: 'pv' | 'pe' | 'san') => $emit('handleMarkHeal', type)"
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