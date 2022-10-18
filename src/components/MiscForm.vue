<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { miscDefault } from '../utils/default'
import { Misc } from '../types'
import { validateMiscForm } from '../utils/forms'
import _ from 'lodash'
import DropdownSimple from './DropdownSimple.vue'

const props = defineProps({
  misc: {
    type: Object as PropType<Misc>,
    default: miscDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreateMisc', 'handleClose', 'handleEditMisc'])

const categoryOptions = ['0', 'I', 'II', 'III', 'IV']
const tagOptions = ['Acessórios', 'Explosivos', 'Itens Operacionais', 'Itens Paranormais']

const misc = ref<Misc>(_.clone(props.misc))

const disabled = computed(() => {
  if(misc.value.name === '') return true
  if(misc.value.description === '') return true
  if(misc.value.category === '') return true
  if(misc.value.slots === '') return true

  return false
})

const handleClose = () => {
  misc.value = _.clone(miscDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return
  validateMiscForm(misc.value)
  emit('handleCreateMisc', misc.value)
  misc.value = _.clone(miscDefault)
}

const handleEdit = () => {
  if(disabled.value) return

  validateMiscForm(misc.value)
  const payload = {
    item: misc.value,
    sheet: props.sheet
  }

  emit('handleEditMisc', payload)
  misc.value = _.clone(miscDefault)
}
</script>

<template>
  <div class="input-container">
    <div class="label">
      Nome*
    </div>
    <input 
      v-model="misc.name"
      type="text" 
      class="input-primary dark big-input"
    >
  </div>
  <div class="input-row">
    <div class="input-container">
      <div class="label">
        Categoria*
      </div>
      <DropdownSimple
        :value="misc.category"
        :options="categoryOptions"
        width="2.75rem"
        content-width="2.75rem"
        form-input
        small-input
        @update-value="(value: string) => misc.category = value"
      />
    </div>
    <div class="input-container">
      <div class="label">
        Espaços*
      </div>
      <input 
        v-model="misc.slots"
        type="text" 
        class="input-primary dark small"
      >
    </div>
    <div class="input-container">
      <div class="label">
        Tag
      </div>
      <DropdownSimple
        :value="misc.tag"
        :options="tagOptions"
        width="10rem"
        content-width="10rem"
        form-input
        @update-value="(value: string) => misc.tag = value"
      />
    </div>
  </div>
  <div class="label">
    Descrição*<span> (utilize negrito para aplicar a cor roxo)</span>
  </div>
  <p-editor v-model="misc.description" editor-style="height: 12rem">
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
  padding-left: .25rem;
  padding-right: .25rem;
}
</style>