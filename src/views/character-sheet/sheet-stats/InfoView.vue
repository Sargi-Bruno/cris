<script setup lang="ts">
import { computed } from 'vue'
import { Character } from '../../../types'
import SheetDropdown from '../../../components/SheetDropdown.vue'

const props = defineProps<{character: Character}>()

defineEmits(['handleChangeCharText', 'handleChangeCharNumber', 'handleChangeCharDropdown', 'handleChangeMovementInSquares'])

const nexOptions = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '99%']
const nexList = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '99%'] as const
type NexKeys = typeof nexList[number]
const peOptions = {
  '5%': '1',
  '10%': '2',
  '15%': '3',
  '20%': '4',
  '25%': '5',
  '30%': '6',
  '35%': '7',
  '40%': '8',
  '45%': '9',
  '50%': '10',
  '55%': '11',
  '60%': '12',
  '65%': '13',
  '70%': '14',
  '75%': '15',
  '80%': '16',
  '85%': '17',
  '90%': '18',
  '95%': '19',
  '99%': '20',
}

const pe = computed(() => {
  return peOptions[props.character.nex as NexKeys]
})

const movementInSquares = computed(() => {
  if(props.character.movement === 0) return 0
  return props.character.movement/1.5
})

const defense = computed(() => {
  return 10 + props.character.attributes.dex + props.character.protectionDefense + props.character.bonusDefense
})
</script>

<template>
  <div class="info-view">
    <div class="info-container">
      <h3 class="info-container-title">
        ORIGEM
      </h3>
      <div>
        <h3>{{ character.backgroundName }}</h3>
      </div>
    </div>
    <div class="info-container">
      <h3 class="info-container-title">
        CLASSE
      </h3>
      <div>
        <h3>{{ character.className }}</h3>
      </div>
    </div>
    <div class="info-row">
      <div class="nex-container">
        <SheetDropdown
          title="NEX"
          :value="character.nex"
          :options="nexOptions"
          bold
          @update-value="(option: string) => $emit('handleChangeCharDropdown', { value: option, key: 'nex' })"
        />
        <div class="pe-container">
          <div class="pe">
            <h3>{{ pe }}</h3>
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
            :value="character.movement"
            @blur="e => $emit('handleChangeCharNumber', {e, key: 'movement'})"
          >
          <h4>m /</h4>
          <input 
            class="sheet-input" 
            type="number"
            :value="movementInSquares"
            @blur="e => $emit('handleChangeMovementInSquares', e)"
          >
          <h4>q</h4>
        </div>
      </div>
    </div>
    <div class="info-row">
      <div class="info-block-container">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :value="character.maxPv"
            @blur="e => $emit('handleChangeCharNumber', {e, key: 'maxPv'})"
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
              :value="character.currentPv"
              @blur="e => $emit('handleChangeCharNumber', {e, key: 'currentPv'})"
            >
          </div>
        </div>
      </div>
      <div class="info-block-container second">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :value="character.maxPe"
            @blur="e => $emit('handleChangeCharNumber', {e, key: 'maxPe'})"
          >
          <h3>PE</h3>
          <div class="second-subtitle">
            <h4>PONTOS DE ESFORÇO</h4>
          </div>
        </div>
        <div>
          <div class="info-block-content">
            <h4>Atuais</h4>
            <input 
              class="sheet-input" 
              type="number"
              :value="character.currentPe"
              @blur="e => $emit('handleChangeCharNumber', {e, key: 'currentPe'})"
            >
          </div>
        </div>
      </div>
    </div>
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
              :value="character.protectionDefense"
              @blur="e => $emit('handleChangeCharNumber', {e, key: 'protectionDefense'})"
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
              :value="character.bonusDefense"
              @blur="e => $emit('handleChangeCharNumber', {e, key: 'bonusDefense'})"
            >
            <h5>Outros.</h5>
          </div>
        </div>
      </div>
      <div class="info-block-container second">
        <div class="info-block-header">
          <input 
            class="sheet-input-size sheet-input" 
            type="number"
            :value="character.maxSan"
            @blur="e => $emit('handleChangeCharNumber', {e, key: 'maxSan'})"
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
              :value="character.currentSan"
              @blur="e => $emit('handleChangeCharNumber', {e, key: 'currentSan'})"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="info-line">
      <h3>PROTEÇÃO</h3>
      <input 
        class="sheet-input" 
        type="text"
        :value="character.currentProtection"
        @blur="e => $emit('handleChangeCharText', {e, key: 'currentProtection'})"
      >
    </div>
    <div class="info-line">
      <h3>RESISTÊNCIAS</h3>
      <input 
        class="sheet-input" 
        type="text"
        :value="character.resistances"
        @blur="e => $emit('handleChangeCharText', {e, key: 'resistances'})"
      >
    </div>
  </div>
</template>

<style scoped>
.info-view {
  margin: 0 auto;
}
.info-container {
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
}
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
.pe h3 {
  text-align: center;
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-white);
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
.info-block-container {
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
}
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
  top: 15px;
  left: 30%;
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
</style>