<script setup lang="ts">
import { PropType } from 'vue'
import { Power } from '../../../../types'
import AbilitiesForm from '../../../../components/AbilitiesForm.vue'
import { powerDefault } from '../../../../utils/default'

defineProps({
  currentEditOption: {
    type: Number,
    required: true
  },
  editPower: {
    type: Object as PropType<Power>,
    default: powerDefault
  }
})

const emit = defineEmits(['handleCloseModal', 'handleEditPowerSheet'])

const componentOptions = [AbilitiesForm]

const handleEditPowerSheet = (payload: { power: Power }) => emit('handleEditPowerSheet', payload.power)
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Editar</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body modal-height">
      <component
        :is="componentOptions[currentEditOption]"
        :power="editPower"
        edit
        sheet
        @handle-edit-power="handleEditPowerSheet"
        @handle-close="$emit('handleCloseModal')"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-width {
  width: 60rem;
}
.modal-height {
  height: 32rem;
}
</style>