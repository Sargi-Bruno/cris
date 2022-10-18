<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { cursedItemDefault } from '../utils/default'
import { CursedItem } from '../types'
import _ from 'lodash'
import DropdownSimple from './DropdownSimple.vue'
import { validateCursedItemForm } from '../utils/forms'

const props = defineProps({
  cursedItem: {
    type: Object as PropType<CursedItem>,
    default: cursedItemDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreateCursedItem', 'handleClose', 'handleEditCursedItem'])

const elementOptions = ['Conhecimento', 'Energia', 'Morte', 'Sangue', 'Varia']

const cursedItem = ref<CursedItem>(_.clone(props.cursedItem))

const disabled = computed(() => {
  if(cursedItem.value.name === '') return true
  if(cursedItem.value.description === '') return true

  return false
})

const handleClose = () => {
  cursedItem.value = _.clone(cursedItemDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return
  validateCursedItemForm(cursedItem.value)
  emit('handleCreateCursedItem', cursedItem.value)
  cursedItem.value = _.clone(cursedItemDefault)
}

const handleEdit = () => {
  if(disabled.value) return
  validateCursedItemForm(cursedItem.value)

  const payload = {
    item: cursedItem.value,
    sheet: props.sheet
  }

  emit('handleEditCursedItem', payload)
  cursedItem.value = _.clone(cursedItemDefault)
}
</script>

<template>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Nome*
      </div>
      <input 
        v-model="cursedItem.name"
        type="text" 
        class="input-primary dark big-input"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Elemento
      </div>
      <DropdownSimple
        :value="cursedItem.element"
        :options="elementOptions"
        width="7.75rem"
        content-width="7.75rem"
        form-input
        @update-value="(value: string) => cursedItem.element = value"
      />
    </div>
  </div>
  <div class="label">
    Descrição*<span> (utilize negrito para aplicar a cor roxo)</span>
  </div>
  <p-editor v-model="cursedItem.description" editor-style="height: 12rem">
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