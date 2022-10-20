<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { ritualDefault } from '../utils/default'
import { Ritual } from '../types'
import { validateRitualForm } from '../utils/forms'
import _ from 'lodash'
import DropdownSimple from './DropdownSimple.vue'

const props = defineProps({
  ritual: {
    type: Object as PropType<Ritual>,
    default: ritualDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreateRitual', 'handleClose', 'handleEditRitual'])

const circleOptions = ['1', '2', '3', '4']
const elementOptions = ['Conhecimento', 'Energia', 'Medo', 'Morte', 'Sangue', 'Varia']
const executionOptions = ['Padrão', 'Movimento', 'Completa', 'Livre']
const rangeOptions = ['Pessoal', 'Toque', 'Curto', 'Médio', 'Longo', 'Extremo', 'Ilimitado']

const ritual = ref<Ritual>(_.clone(props.ritual))

const disabled = computed(() => {
  if(ritual.value.name !== '' && ritual.value.description !== '') return false

  return true
})

const handleClose = () => {
  ritual.value = _.clone(ritualDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return
  validateRitualForm(ritual.value)
  emit('handleCreateRitual', ritual.value)
  ritual.value = _.clone(ritualDefault)
}

const handleEdit = () => {
  if(disabled.value) return
  validateRitualForm(ritual.value)

  const payload = {
    ritual: ritual.value,
    sheet: props.sheet
  }

  emit('handleEditRitual', payload)
  ritual.value = _.clone(ritualDefault)
}
</script>

<template>
  <div class="input-container">
    <div class="label">
      Nome*
    </div>
    <input 
      v-model="ritual.name"
      type="text" 
      class="input-primary dark big-input"
    >
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Elemento
      </div>
      <DropdownSimple
        :value="ritual.element"
        :options="elementOptions"
        width="7.75rem"
        content-width="7.75rem"
        form-input
        @update-value="(value: string) => ritual.element = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Circulo
      </div>
      <DropdownSimple
        :value="ritual.circle"
        :options="circleOptions"
        width="2.75rem"
        content-width="2.75rem"
        form-input
        small-input
        @update-value="(value: string) => ritual.circle = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Execução
      </div>
      <DropdownSimple
        :value="ritual.execution"
        :options="executionOptions"
        width="12rem"
        content-width="12rem"
        form-input
        @update-value="(value: string) => ritual.execution = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Alcance
      </div>
      <DropdownSimple
        :value="ritual.range"
        :options="rangeOptions"
        width="12rem"
        content-width="12rem"
        form-input
        @update-value="(value: string) => ritual.range = value"
      />
    </div>
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Área
      </div>
      <input 
        v-model="ritual.area"
        type="text" 
        class="input-primary dark"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Alvo
      </div>
      <input 
        v-model="ritual.target"
        type="text" 
        class="input-primary dark"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Duração
      </div>
      <input 
        v-model="ritual.duration"
        type="text" 
        class="input-primary dark"
      >
    </div>
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Efeito
      </div>
      <input 
        v-model="ritual.effect"
        type="text" 
        class="input-primary dark"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Resistência
      </div>
      <input 
        v-model="ritual.save"
        type="text" 
        class="input-primary dark"
      >
    </div>
  </div>
  <div class="label">
    Descrição*<span> (utilize negrito para aplicar a cor roxo)</span>
  </div>
  <p-editor v-model="ritual.description" editor-style="height: 12rem">
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
</style>