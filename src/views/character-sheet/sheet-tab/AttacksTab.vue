<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character, Attack } from '../../../types'
import AttackCard from '../../../components/AttackCard.vue'
import FilterInput from '../../../components/FilterInput.vue'
import { compare } from '../../../utils/functions'

const props = defineProps<{character: Character}>()

const emit = defineEmits([
  'handleAddAttack', 
  'handleRemoveAttack', 
  'handleChangeAttackText', 
  'handleChangeAttackNumber', 
  'handleChangeAttackDropdown',
  'handleRollDices',
  'handleRollAttack'
])

const rollDicesValue = ref('')
const filterText = ref('')

const handleRollDices = () => {
  emit('handleRollDices', rollDicesValue.value)
  rollDicesValue.value = ''
}

const handleRollAttack = (attack: Attack) => {
  emit('handleRollAttack', attack)
}

const attacksFiltered = computed(() => {
  const attacks = [...props.character.attacks]
  return attacks.filter((ele) => compare(ele.name, filterText.value))
})
</script>
  
<template>
  <div class="attacks-tab">
    <div class="tab-header">
      <div v-if="character.attacks.length > 0">
        <FilterInput
          :value="filterText"
          placeholder="Filtrar ataques"
          @update="(value: string) => filterText = value"
        />
      </div>
      <button 
        class="button-primary add-button"
        @click="$emit('handleAddAttack')"
      >
        Adicionar
      </button>
    </div>
    <div class="roll-dices-container">
      <button
        class="dice-button"
        @click="handleRollDices"
      >
        <img
          class="dice-icon"
          src="../../../assets/d20-icon.png" 
          alt="rolar"
        >
      </button>
      <input 
        v-model="rollDicesValue"
        type="text"
        class="roll-dice-input"
        placeholder="Rolar dados"
        @keyup.enter="handleRollDices"
      >
    </div>
    <div v-if="character.attacks.length > 0">
      <div class="attacks-info-row">
        <h3 class="name-label">
          NOME
        </h3>
        <h3 class="number-label">
          ATAQUE BÔNUS
        </h3>
        <h3 class="text-label">
          DANO
        </h3>
        <div class="second-text-label">
          <h3>
            DANO EXTRA
          </h3>
        </div>
        <h3 class="crit-label">
          CRÍTICO
        </h3>
      </div>
      <div v-if="attacksFiltered.length > 0">
        <div 
          v-for="attack in attacksFiltered" 
          :key="attack.id"
          class="align-card"
        >
          <AttackCard 
            :id="attack.id"
            :attack="attack"
            @handle-remove-attack="(id: string) => $emit('handleRemoveAttack', id)"
            @handle-change-attack-text="payload => $emit('handleChangeAttackText', payload)"
            @handle-change-attack-number="payload => $emit('handleChangeAttackNumber', payload)"
            @handle-change-attack-dropdown="payload => $emit('handleChangeAttackDropdown', payload)"
            @handle-roll-attack="handleRollAttack"
          />
        </div>
      </div>
      <div v-else class="no-content">
        <h3>Nenhum ataque encontrado</h3>
      </div>
    </div>
    <div v-else class="no-content">
      <h3>Você ainda não possui ataques</h3>
    </div>
  </div>
</template>
  
<style scoped>
.tab-header {
  display: flex;
  align-items: flex-end;
}
.roll-dices-container {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.dice-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
}
.roll-dice-input {
  width: 100%;
  background-color: transparent;
  color: var(--color-white);
  font-size: 16px;
  border: none;
  border-bottom: 1px solid var(--color-white);
  margin-left: .5rem;
}
.dice-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.no-content h3 {
  text-align: center;
  margin-top: 10rem;
}
.add-button {
  display: block;
  margin-left: auto;
}
.attacks-info-row {
  display: flex;
  margin-top: 1rem;
  margin-left: 3rem;
}
.name-label {
  width: 9rem;
}
.number-label {
  width: 4.25rem;
}
.text-label {
  width: 2.5rem;
}
.second-text-label {
  display: flex;
  align-items: center;
  width: 2.5rem;
  margin-left: 1rem;
  margin-right: 1.25rem;
}
.crit-label {
  width: 2.5rem;
}
.attacks-info-row h3 {
  font-size: 10px;
  color: var(--color-white);
  margin: 0;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}
.align-card {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>