<script setup lang="ts">
import { PropType, ref, getCurrentInstance } from 'vue'
import { Attack } from '../types'
import DividerView from './DividerView.vue'
import DropdownSimple from './DropdownSimple.vue'

const props = defineProps({
  attack: {
    type: Object as PropType<Attack>,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  disabled: Boolean
})

const emit = defineEmits(['handleRemoveAttack', 'handleChangeAttackText', 'handleChangeAttackNumber', 'handleChangeAttackDropdown', 'handleRollAttack'])

const damageTypeOptions = ['-', 'Balístico', 'Conhecimento', 'Corte', 'Eletricidade', 'Energia', 'Fogo', 'Frio', 'Impacto', 'Mental', 'Morte', 'Perfuração', 'Sangue', 'Químico']
const rangeOptions = ['-', 'Curto', 'Médio', 'Longo', 'Extremo', 'Ilimitado']
const skillUsedOptions = ['Luta', 'Ocultismo', 'Pontaria']
const damageAttrOptions = ['Nenhum', 'Agilidade', 'Força', 'Intelecto', 'Presença', 'Vigor']

const showMore = ref(false)
const instance = getCurrentInstance()

const handleChangeAttackText = (e: Event, key: string) => {
  const id = props.id
  emit('handleChangeAttackText', {e, id, key})
  instance?.proxy?.$forceUpdate()
}

const handleChangeAttackNumber = (e: Event, key: string) => {
  const id = props.id
  emit('handleChangeAttackNumber', {e, id, key})
  instance?.proxy?.$forceUpdate()
}

const handleRollAttack = () => {
  if(props.disabled) return
  emit('handleRollAttack', props. attack)
}
</script>

<template>
  <div class="card">
    <div
      class="header"
    >
      <button 
        class="roll-button"
        :class="{ 'disabled': disabled}"
        :disabled="disabled"
        @click="handleRollAttack"
      >
        <img src="../assets/d20-icon.png" alt="rolar">
      </button>
      <input 
        type="text" 
        class="attack-input name" 
        autocomplete="nope"
        :disabled="disabled"
        :value="attack.name"
        @blur="e => handleChangeAttackText(e, 'name')"
      >
      <input 
        type="number" 
        class="attack-input number" 
        autocomplete="nope"
        :disabled="disabled"
        :value="attack.attackBonus"
        @blur="e => handleChangeAttackNumber(e, 'attackBonus')"
      >
      <input 
        type="text" 
        class="attack-input text" 
        autocomplete="nope"
        placeholder="-"
        :disabled="disabled"
        :value="attack.damage"
        @blur="e => handleChangeAttackText(e, 'damage')"
      >
      <input 
        type="text" 
        class="attack-input text" 
        autocomplete="nope"
        placeholder="-"
        :disabled="disabled"
        :value="attack.extraDamage"
        @blur="e => handleChangeAttackText(e, 'extraDamage')"
      > 
      <input 
        type="number" 
        class="attack-input crit" 
        autocomplete="nope"
        :disabled="disabled"
        :value="attack.criticalRange"
        @blur="e => handleChangeAttackNumber(e, 'criticalRange')"
      > 
      <span class="crit-span">/x</span>
      <input 
        type="number" 
        class="attack-input crit-mult" 
        autocomplete="nope"
        :disabled="disabled"
        :value="attack.criticalMult"
        @blur="e => handleChangeAttackNumber(e, 'criticalMult')"
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
              <DropdownSimple
                :value="attack.damageType"
                :options="damageTypeOptions"
                :disabled="disabled"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'damageType'})"
              />
            </div>
            <div class="dropdown-container">
              <h3>ALCANCE</h3>
              <DropdownSimple
                :value="attack.range"
                :options="rangeOptions"
                :disabled="disabled"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'range'})"
              />
            </div>
          </div>
          <div class="content-row">
            <div class="dropdown-container">
              <h3>PERÍCIA</h3>
              <DropdownSimple
                :value="attack.skillUsed"
                :options="skillUsedOptions"
                :disabled="disabled"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'skillUsed'})"
              />
            </div>
            <div class="dropdown-container">
              <h3>ATRIBUTO DANO</h3>
              <DropdownSimple
                :value="attack.damageAttribute"
                :options="damageAttrOptions"
                :disabled="disabled"
                @update-value="(value: string) => $emit('handleChangeAttackDropdown', {value, id, key: 'damageAttribute'})"
              />
            </div>
          </div>
          <div class="footer">
            <button
              v-if="!disabled"
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
  background-color: transparent;
  border: none;
  cursor: pointer;
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