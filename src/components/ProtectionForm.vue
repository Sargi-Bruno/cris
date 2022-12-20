<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { protectionDefault } from '../utils/default'
import { Protection } from '../types'
import { validateProtectionForm } from '../utils/forms'
import _ from 'lodash'
import DropdownSimple from './DropdownSimple.vue'

const props = defineProps({
  protection: {
    type: Object as PropType<Protection>,
    default: protectionDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreateProtection', 'handleClose', 'handleEditProtection'])

const categoryOptions = ['0', 'I', 'II', 'III', 'IV']

const protection = ref<Protection>(_.clone(props.protection))

const disabled = computed(() => {
  if(protection.value.name === '') return true
  if(protection.value.category === '') return true
  if(protection.value.slots === '') return true
  if(protection.value.defense.toString() === '') return true

  return false
})

const handleClose = () => {
  protection.value = _.clone(protectionDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return
  validateProtectionForm(protection.value)
  emit('handleCreateProtection', protection.value)
  protection.value = _.clone(protectionDefault)
}

const handleEdit = () => {
  if(disabled.value) return
  validateProtectionForm(protection.value)

  const payload = {
    item: protection.value,
    sheet: props.sheet
  }

  emit('handleEditProtection', payload)
  protection.value = _.clone(protectionDefault)
}
</script>

<template>
  <div class="input-container">
    <div class="label">
      Nome*
    </div>
    <input 
      v-model="protection.name"
      type="text" 
      class="input-primary dark big-input"
    >
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Defesa*
      </div>
      <input 
        v-model="protection.defense"
        type="number" 
        class="input-primary dark small input-align-center"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Categoria*
      </div>
      <DropdownSimple
        :value="protection.category"
        :options="categoryOptions"
        width="2.75rem"
        content-width="2.75rem"
        form-input
        small-input
        @update-value="(value: string) => protection.category = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Espaços*
      </div>
      <input 
        v-model="protection.slots"
        type="text" 
        class="input-primary dark small input-align-center"
      >
    </div>
  </div>
  <div class="label">
    Descrição<span> (utilize negrito para aplicar a cor roxo)</span>
  </div>
  <p-editor v-model="protection.description" editor-style="height: 12rem">
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
.input-align-center {
  text-align: center;
  padding-left: .25rem;
  padding-right: .25rem;
}
</style>