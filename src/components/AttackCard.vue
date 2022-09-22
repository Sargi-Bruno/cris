<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Attack } from '../types'
import DividerView from './DividerView.vue'
import AttackDropdown from '../components/AttackDropdown.vue'

defineProps({
  attack: {
    type: Object as PropType<Attack>,
    required: true
  },
  id: {
    type: String,
    default: ''
  }
})

defineEmits(['handleRemoveAttack', 'handleChangeAttackText', 'handleChangeAttackNumber', 'handleChangeAttackDropdown'])

const damageTypeOptions = ['-', 'Balístico', 'Corte', 'Fogo', 'Impacto', 'Perfuração']
const rangeOptions = ['-', 'Curto', 'Médio', 'Longo']
const skillUsedOptions = ['Luta', 'Pontaria']
const damageAttrOptions = ['Nenhum', 'Agilidate', 'Força', 'Intelecto', 'Presença', 'Vigor']


const showMore = ref(false)
</script>

<template>
  <div class="card">
    <div
      class="header"
    >
      <button class="button-primary roll-button">
        <img src="../assets/d20-icon.png" alt="rolar">
      </button>
      <input 
        type="text" 
        class="attack-input name" 
        autocomplete="nope"
        :value="attack.name"
        @blur="e => $emit('handleChangeAttackText', {e, id, key: 'name'})"
      >
      <input 
        type="number" 
        class="attack-input number" 
        autocomplete="nope"
        :value="attack.attackBonus"
        @blur="e => $emit('handleChangeAttackNumber', {e, id, key: 'attackBonus'})"
      >
      <input 
        type="text" 
        class="attack-input text" 
        autocomplete="nope"
        :value="attack.damage"
        @blur="e => $emit('handleChangeAttackText', {e, id, key: 'damage'})"
      >
      <input 
        type="text" 
        class="attack-input text" 
        autocomplete="nope"
        :value="attack.extraDamage"
        @blur="e => $emit('handleChangeAttackText', {e, id, key: 'extraDamage'})"
      > 
      <input 
        type="number" 
        class="attack-input crit" 
        autocomplete="nope"
        :value="attack.criticalRange"
        @blur="e => $emit('handleChangeAttackNumber', {e, id, key: 'criticalRange'})"
      > 
      <span class="crit-span">/x</span>
      <input 
        type="number" 
        class="attack-input crit-mult" 
        autocomplete="nope"
        :value="attack.criticalMult"
        @blur="e => $emit('handleChangeAttackNumber', {e, id, key: 'criticalMult'})"
      > 
      <button
        class="show-more"
        @click="showMore = !showMore"
      >
        <img src="../assets/show-more-icon.svg" :class="{ rotate: showMore }" alt="ver mais">
      </button>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <div class="content">
          <DividerView no-margin />
          <div class="content-row">
            <div class="dropdown-container">
              <h3>TIPO DE DANO</h3>
              <AttackDropdown
                :value="attack.damageType"
                :options="damageTypeOptions"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'damageType'})"
              />
            </div>
            <div class="dropdown-container">
              <h3>ALCANCE</h3>
              <AttackDropdown
                :value="attack.range"
                :options="rangeOptions"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'range'})"
              />
            </div>
          </div>
          <div class="content-row">
            <div class="dropdown-container">
              <h3>PERÍCIA</h3>
              <AttackDropdown
                :value="attack.skillUsed"
                :options="skillUsedOptions"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'skillUsed'})"
              />
            </div>
            <div class="dropdown-container">
              <h3>ATRIBUTO</h3>
              <AttackDropdown
                :value="attack.damageAttribute"
                :options="damageAttrOptions"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'damageAttribute'})"
              />
            </div>
          </div>
          <div class="footer">
            <button 
              class="button-remove"
              @click.stop="$emit('handleRemoveAttack', id)"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.attack-input {
  color: var(--color-white);
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-white);
  font-size: 14px;
}
.name {
  margin-left: .5rem;
  margin-right: .5rem;
  width: 10rem;
}
.text {
  margin-right: .5rem;
  width: 3rem;
}
.number {
  margin-right: .5rem;
  width: 2.5rem;
}
.crit {
  width: 1.5rem;
}
.crit-mult {
  width: 1.25rem;
  margin-right: .25rem;
}
.crit-span {
  color: var(--color-white);
  font-size: 14px;
}
.roll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}
.roll-button img {
  width: 1.5rem;
  height: 1.5rem;
}
.show-more {
  transition: 0.3s ease-in-out;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  border: none;
}
.show-more img {
  height: 2rem;
  transition: all 300ms;
}
.rotate {
  transform: rotate(-180deg);
}
.content {
  margin-top: .5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.content-row {
  display: flex;
  margin-top: 1.5rem;
  gap: 3rem;
}
.dropdown-container {
  display: flex;
  align-items: center;
}
.dropdown-container h3 {
  width: 6rem;
  margin: 0;
  font-size: 10px;
  font-weight: normal;
}
.footer {
  display: flex;
  margin-top: 1.25rem;
}
</style>