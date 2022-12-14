<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { Character } from '../../../types'
import { nexOptions } from '../../character-sheet/characterSheetUtils'
import SheetDropdown from '../../../components/SheetDropdown.vue'
import InfoBar from './InfoBar.vue'

const props = defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits([
  'handleChangeCharText', 
  'handleChangeCharNumber', 
  'handleChangeCharDropdown', 
  'handleChangeMovementInSquares', 
  'handleChangeCharNumberButton',
  'handleChangeCharMark',
  'handleChangeMarkModeToTrue',
  'handleMarkHeal'
])

const instance = getCurrentInstance()

const movementInSquares = computed(() => {
  if(props.character.movement === 0) return 0
  return props.character.movement/1.5
})

const defense = computed(() => {
  const result = 10 + props.character.attributes.dex + props.character.protectionDefense + props.character.bonusDefense

  if(result > 0) return result
  else return 0
})

const block = computed(() => {
  return props.character.skills[9].bonus
})

const evade = computed(() => {
  return props.character.skills[22].bonus + defense.value
})

const handleChangeCharNumber = (e: Event, key: string) => {
  emit('handleChangeCharNumber', {e, key})
  instance?.proxy?.$forceUpdate()
}

const handleChangeMovementInSquares = (e: Event) => {
  emit('handleChangeMovementInSquares', e)
  instance?.proxy?.$forceUpdate()
}
</script>

<template>
  <div class="info-view">
    <div class="info-row">
      <div class="nex-container">
        <SheetDropdown
          title="NEX"
          :disabled="disabledSheet"
          :value="character.nex"
          :options="nexOptions"
          bold
          @update-value="(option: string) => $emit('handleChangeCharDropdown', { value: option, key: 'nex' })"
        />
        <div class="pe-container">
          <div class="pe">
            <input 
              class="sheet-input pe-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.peTurn"
              @blur="e => handleChangeCharNumber(e, 'peTurn')"
            >
          </div>
          <h4>PE / RODADA</h4>
        </div>
      </div>
      <div class="desl-container">
        <h3>DESL</h3>
        <div class="desl-input-container">
          <input 
            class="sheet-input" 
            type="number"
            :disabled="disabledSheet"
            :value="character.movement"
            @blur="e => handleChangeCharNumber(e, 'movement')"
          >
          <h4>m /</h4>
          <input 
            class="sheet-input" 
            type="number"
            :disabled="disabledSheet"
            :value="movementInSquares"
            @blur="handleChangeMovementInSquares"
          >
          <h4>q</h4>
        </div>
      </div>
    </div>
    <div class="info-bar-wrapper">
      <InfoBar
        type="pv"
        :max-value="character.maxPv"
        :current-value="character.currentPv"
        :marks="character.deathMarks"
        :mark-mode="character.deathMode"
        :disabled-sheet="disabledSheet"
        @handle-change-char-number="(e: Event, key: string) => handleChangeCharNumber(e, key)"
        @handle-change-char-number-button="(value: number, key: string) => $emit('handleChangeCharNumberButton', value, key)"
        @handle-change-char-mark="(type: 'pv' | 'pe' | 'san', i: number) => $emit('handleChangeCharMark', type, i)"
        @handle-change-mark-mode-to-true="(type: 'pv' | 'pe' | 'san') => $emit('handleChangeMarkModeToTrue', type)"
        @handle-mark-heal="(type: 'pv' | 'pe' | 'san') => $emit('handleMarkHeal', type)"
      />
      <InfoBar
        type="san"
        :character="character"
        :max-value="character.maxSan"
        :current-value="character.currentSan"
        :marks="character.madnessMarks"
        :mark-mode="character.madnessMode"
        :disabled-sheet="disabledSheet"
        @handle-change-char-number="(e: Event, key: string) => handleChangeCharNumber(e, key)"
        @handle-change-char-number-button="(value: number, key: string) => $emit('handleChangeCharNumberButton', value, key)"
        @handle-change-char-mark="(type: 'pv' | 'pe' | 'san', i: number) => $emit('handleChangeCharMark', type, i)"
        @handle-change-mark-mode-to-true="(type: 'pv' | 'pe' | 'san') => $emit('handleChangeMarkModeToTrue', type)"
        @handle-mark-heal="(type: 'pv' | 'pe' | 'san') => $emit('handleMarkHeal', type)"
      />
      <InfoBar
        type="pe"
        :character="character"
        :max-value="character.maxPe"
        :current-value="character.currentPe"
        :disabled-sheet="disabledSheet"
        @handle-change-char-number="(e: Event, key: string) => handleChangeCharNumber(e, key)"
        @handle-change-char-number-button="(value: number, key: string) => $emit('handleChangeCharNumberButton', value, key)"
      />
    </div>
    <!-- <div class="info-row">
      <div class="info-block-container">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :disabled="disabledSheet"
            :value="character.maxPv"
            @blur="e => handleChangeCharNumber(e, 'maxPv')"
          >
          <h3>PV</h3>
          <h4>PONTOS DE VIDA</h4>
        </div>
        <div>
          <div class="info-block-content">
            <h4>Atuais</h4>
            <input 
              class="sheet-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.currentPv"
              @blur="e => handleChangeCharNumber(e, 'currentPv')"
            >
          </div>
        </div>
      </div>
      <div class="info-block-container second">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :disabled="disabledSheet"
            :value="character.maxPe"
            @blur="e => handleChangeCharNumber(e, 'maxPe')"
          >
          <h3>PE</h3>
          <div class="second-subtitle">
            <h4>PONTOS DE ESFOR??O</h4>
          </div>
        </div>
        <div>
          <div class="info-block-content">
            <h4>Atuais</h4>
            <input 
              class="sheet-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.currentPe"
              @blur="e => handleChangeCharNumber(e, 'currentPe')"
            >
          </div>
        </div>
      </div>
    </div> -->
    <div class="info-row">
      <div class="defense-container">
        <div class="defense-img-container">
          <img class="defense-img" src="../../../assets/shield-icon.png" alt="defense">
          <div class="defense-value">
            <h3>{{ defense }}</h3>
          </div>
        </div>
        <div class="defense-content">
          <div class="defense-text">
            <h3>DEFESA</h3>
            <h4>= 10 + AGI + </h4>
          </div>
          <div class="defense-input">
            <input 
              class="sheet-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.protectionDefense"
              @blur="e => handleChangeCharNumber(e, 'protectionDefense')"
            >
            <h5>Equip.</h5>
          </div>
          <h4 class="defense-plus">
            +
          </h4>
          <div class="defense-input">
            <input 
              class="sheet-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.bonusDefense"
              @blur="e => handleChangeCharNumber(e, 'bonusDefense')"
            >
            <h5>Outros.</h5>
          </div>
        </div>
      </div>
      <div class="other-defenses-container">
        <div class="other-defense-div">
          <div class="other-defense-label">
            BLOQUEIO
          </div>
          <div class="other-defense-value">
            {{ block }}
          </div>
        </div>
        <div class="other-defense-div">
          <div class="other-defense-label">
            ESQUIVA
          </div>
          <div class="other-defense-value">
            {{ evade }}
          </div>
        </div>
      </div>
      <!-- <div class="info-block-container second">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :disabled="disabledSheet"
            :value="character.maxSan"
            @blur="e => handleChangeCharNumber(e, 'maxSan')"
          >
          <div>
            <h3>SAN</h3>
            <h4>SANIDADE</h4>
          </div>
        </div>
        <div>
          <div class="info-block-content">
            <h4>Atuais</h4>
            <input 
              class="sheet-input" 
              type="number"
              :disabled="disabledSheet"
              :value="character.currentSan"
              @blur="e => handleChangeCharNumber(e, 'currentSan')"
            >
          </div>
        </div>
      </div> -->
    </div>
    <div class="info-line">
      <h3>PROTE????O</h3>
      <input 
        class="sheet-input" 
        type="text"
        :disabled="disabledSheet"
        :value="character.currentProtection"
        @blur="e => $emit('handleChangeCharText', {e, key: 'currentProtection'})"
      >
    </div>
    <div class="info-line">
      <h3>RESIST??NCIAS</h3>
      <input 
        class="sheet-input" 
        type="text"
        :disabled="disabledSheet"
        :value="character.resistances"
        @blur="e => $emit('handleChangeCharText', {e, key: 'resistances'})"
      >
    </div>
    <div class="info-line">
      <h3>PROFICI??NCIAS</h3>
      <input 
        class="sheet-input" 
        type="text"
        :disabled="disabledSheet"
        :value="character.proficiencies"
        @blur="e => $emit('handleChangeCharText', {e, key: 'proficiencies'})"
      >
    </div>
  </div>
</template>

<style scoped>
/* .sheet-input-text {
  background-color: transparent;
  font-size: 14px;
  color: var(--color-white);
  font-weight: bold;
  border: none;
  width: 15rem;
} */
.info-view {
  margin: 0 auto;
}
.info-bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: .5rem;
}
/* .info-container {
  display: flex;
  align-items: center;
  margin-left: 2rem;
  gap: 2rem;
}
.info-container div {
  display: flex;
  align-items: center;
  width: 16rem;
  height: 2.5rem;
  border: 1px solid var(--color-white);
  padding-left: .5rem;
}
.info-container div h3 {
  font-size: 14px;
}
.info-container-title {
  width: 3rem;
  font-size: 14px;
  color: var(--color-off-white);
} */
.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  margin-bottom: .5rem;
}
.nex-container {
  display: flex;
  align-items: center;
}
.pe-container h4 {
  font-size: 10px;
  color: var(--color-off-white);
  margin-top: 0;
  margin-bottom: 0;
  margin-left: .5rem;
}
.pe {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-left: .5rem;
  width: 3.25rem;
  height: 2.25rem;
  background-color: transparent;
  border: 1px solid var(--color-white);
}
.pe-input {
  width: 3.25rem;
  height: 2.25rem;
  border: none;
}
.desl-container {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.desl-container h3 {
  font-size: 14px;
  margin-left: .5rem;
  width: 3rem;
  color: var(--color-off-white);
  margin: 0;
}
.desl-input-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-white);
  height: 2.25rem;
  width: 8rem;
  padding-left: .5rem;
}
.desl-input-container input {
  height: 2rem;
  width: 1.75rem;
  border: none;
  text-align: center;
}
/* .info-block-container {
  margin-top: .25rem;
}
.info-block-header {
  display: flex;
  align-items: center;
}
.info-block-header h3 {
  margin: 0;
  margin-left: .5rem;
  font-size: 16px;
  color: var(--color-off-white);
}
.info-block-header h4 {
  width: 2.5rem;
  font-size: 10px;
  margin: 0;
  margin-left: .25rem;
  color: var(--color-off-white);
}
.info-block-content {
  display: flex;
  align-items: center;
  margin-left: .5rem;
}
.info-block-content h4 {
  margin: 0;
  color: var(--color-off-white);
  font-size: 10px;
}
.info-block-content input {
  width: 5rem;
  height: 2rem;
  border: none;
  border-bottom: 1px solid var(--color-white);
}
.second {
  margin-right: 2.5rem;
}
.second-subtitle h4 {
  width: 4rem;
} */
.defense-container {
  display: flex;
  margin-top: 1rem;
}
.defense-img-container {
  position: relative;
}
.defense-img {
  height: 4rem;
}
.defense-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: .5rem;
}
.defense-value h3 {
  margin: 0;
}
.defense-content {
  display: flex;
  margin-top: .5rem;
}
.defense-content h3, h4, h5 {
  margin: 0;
}
.defense-text {
  margin-left: .5rem;
}
.defense-text h3 {
  font-size: 16px;
  color: var(--color-off-white);
}
.defense-text h4 {
  font-size: 10px;
  color: var(--color-off-white);
}
.defense-input {
  margin-top: 1.25rem;
}
.defense-input input {
  width: 2rem;
  height: 1rem;
  border: none;
  border-bottom: 1px solid var(--color-white);
}
.defense-input h5 {
  font-size: 10px;
  color: var(--color-off-white);
}
.defense-plus {
  margin-top: 1.5rem;
  font-size: 10px;
  color: var(--color-off-white);
}
.info-line {
  margin-left: 2rem;
  margin-top: .5rem;
  display: flex;
}
.info-line h3 {
  margin: 0;
  font-size: 12px;
  color: var(--color-off-white);
}
.info-line input {
  border: none;
  border-bottom: 1px solid var(--color-white);
  margin-left: .5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
  font-weight: normal;
}
.other-defenses-container {
  display: flex;
  gap: 1rem;
  margin-right: 1.25rem;
}
.other-defense-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.other-defense-label {
  color: var(--color-off-white);
  font-weight: bold;
  font-size: 14px;
}
.other-defense-value {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid var(--color-off-white);
  color: var(--color-white);
  height: 2.25rem;
  width: 3.25rem;
  margin: 0 auto;
}
</style>