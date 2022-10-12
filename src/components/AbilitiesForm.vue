<script setup lang="ts">
import { computed,  PropType, ref } from 'vue'
import { powerDefault } from '../utils/default'
import { Power } from '../types'
import _ from 'lodash'

const props = defineProps({
  power: {
    type: Object as PropType<Power>,
    default: powerDefault
  },
  edit: Boolean,
  sheet: Boolean
})

const emit = defineEmits(['handleCreatePower', 'handleClose', 'handleEditPower'])

const power = ref<Power>(_.clone(props.power))

const disabled = computed(() => {
  if(power.value.name !== '' && power.value.description !== '') return false

  return true
})

const handleClose = () => {
  power.value = _.clone(powerDefault)
  emit('handleClose')
}

const handleCreate = () => {
  if(disabled.value) return

  emit('handleCreatePower', power.value)
  power.value = _.clone(powerDefault)
}

const handleEdit = () => {
  if(disabled.value) return

  const payload = {
    power: power.value,
    sheet: props.sheet
  }

  emit('handleEditPower', payload)
  power.value = _.clone(powerDefault)
}
</script>

<template>
  <div class="input-container">
    <div class="label">
      Nome*
    </div>
    <input 
      v-model="power.name"
      type="text" 
      class="input-primary dark"
    >
  </div>
  <div class="label">
    Descrição*
  </div>
  <p-editor v-model="power.description" editor-style="height: 160px" />
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
</style>