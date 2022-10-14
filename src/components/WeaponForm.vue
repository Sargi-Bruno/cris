<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { weaponDefault } from '../utils/default'
import { Weapon } from '../types'
import _ from 'lodash'
import DropdownSimple from './DropdownSimple.vue'

const props = defineProps({
  weapon: {
    type: Object as PropType<Weapon>,
    default: weaponDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreateWeapon', 'handleClose', 'handleEditWeapon'])

const proficienceOptions = ['Armas Simples', 'Armas Táticas', 'Armas Pesadas']
const typeOptions = ['Corpo a Corpo', 'Arma de Arremesso', 'Arma de Disparo', 'Arma de Fogo']
const handlingOptions = ['Leve', 'Uma Mão', 'Duas Mãos']
const damageTypeOptions = ['Balístico', 'Corte', 'Energia', 'Fogo', 'Impacto']
const rangeOptions = ['-', 'Curto', 'Médio', 'Longo']
const categoryOptions = ['0', 'I', 'II', 'III', 'IV']

const weapon = ref<Weapon>(_.clone(props.weapon))

const disabled = computed(() => {
  if(weapon.value.name === '') return true
  if(weapon.value.category === '') return true
  if(weapon.value.slots === '') return true
  if(weapon.value.damage === '') return true
  if(weapon.value.criticalRange.toString() === '') return true
  if(weapon.value.criticalMult.toString() === '') return true

  return false
})

const handleClose = () => {
  weapon.value = _.clone(weaponDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return

  emit('handleCreateWeapon', weapon.value)
  weapon.value = _.clone(weaponDefault)
}

const handleEdit = () => {
  if(disabled.value) return

  const payload = {
    item: weapon.value,
    sheet: props.sheet
  }

  emit('handleEditWeapon', payload)
  weapon.value = _.clone(weaponDefault)
}
</script>

<template>
  <div class="input-container">
    <div class="label">
      Nome*
    </div>
    <input 
      v-model="weapon.name"
      type="text" 
      class="input-primary dark big-input"
    >
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Proficiência
      </div>
      <DropdownSimple
        :value="weapon.proficiencie"
        :options="proficienceOptions"
        width="8.5rem"
        content-width="8.5rem"
        form-input
        @update-value="(value: string) => weapon.proficiencie = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Tipo
      </div>
      <DropdownSimple
        :value="weapon.type"
        :options="typeOptions"
        width="10rem"
        content-width="10rem"
        form-input
        @update-value="(value: string) => weapon.type = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Empunhadura
      </div>
      <DropdownSimple
        :value="weapon.handling"
        :options="handlingOptions"
        width="6.5rem"
        content-width="6.5rem"
        form-input
        @update-value="(value: string) => weapon.handling = value"
      />
    </div>
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Dano*
      </div>
      <input 
        v-model="weapon.damage"
        type="text" 
        class="input-primary dark medium"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Dano secundário
      </div>
      <input 
        v-model="weapon.secondaryDamage"
        type="text" 
        class="input-primary dark medium"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Crítico*
      </div>
      <input 
        v-model="weapon.criticalRange"
        type="number" 
        class="input-primary dark small input-align-center"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Multiplicador*
      </div>
      <input 
        v-model="weapon.criticalMult"
        type="number" 
        class="input-primary dark small input-align-center"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Tipo de Dano
      </div>
      <DropdownSimple
        :value="weapon.damageType"
        :options="damageTypeOptions"
        width="6.5rem"
        content-width="6.5rem"
        form-input
        @update-value="(value: string) => weapon.damageType = value"
      />
    </div>
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Alcance
      </div>
      <DropdownSimple
        :value="weapon.range"
        :options="rangeOptions"
        width="5rem"
        content-width="5rem"
        form-input
        @update-value="(value: string) => weapon.range = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Categoria
      </div>
      <DropdownSimple
        :value="weapon.category"
        :options="categoryOptions"
        width="2.75rem"
        content-width="2.75rem"
        form-input
        small-input
        @update-value="(value: string) => weapon.category = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Espaços*
      </div>
      <input 
        v-model="weapon.slots"
        type="text" 
        class="input-primary dark small input-align-center"
      >
    </div>
  </div>
  <div class="label">
    Descrição<span> (utilize negrito para aplicar a cor roxo)</span>
  </div>
  <p-editor v-model="weapon.description" editor-style="height: 15rem">
    <template #toolbar>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
      </span>
    </template>
  </p-editor>
  <div class="buttons-container">
    <button 
      class="button-cancel"
      @click="handleClose"
    >
      Cancelar
    </button>
    <div v-if="edit">
      <button
        class="button-primary big"
        :disabled="disabled"
        @click="handleEdit"
      >
        Editar
      </button>
    </div>
    <div v-else>
      <button 
        class="button-primary big"
        :disabled="disabled"
        @click="handleCreate"
      >
        Adicionar
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  margin-bottom: .5rem;
}
.label {
  color: var(--color-white);
  font-size: 16px;
}
.dark {
  background: var(--color-smoky-black)
}
.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  margin-top: 1rem;
}
.big {
  width: 6rem;
}
.input-row {
  display: flex;
  gap: 1.5rem;
}
.big-input {
  width: 20rem;
}
.label span {
  font-size: 12px;
}
.small {
  width: 2.75rem;
  text-align: center;
}
.medium {
  width: 5rem;
}
.input-align-center {
  text-align: center;
  padding-left: .25rem;
  padding-right: .25rem;
}
</style>