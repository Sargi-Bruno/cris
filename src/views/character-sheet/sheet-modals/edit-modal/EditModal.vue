<script setup lang="ts">
import { PropType } from 'vue'
import { Power, Ritual } from '../../../../types'
import AbilitiesForm from '../../../../components/AbilitiesForm.vue'
import RitualsForm from '../../../../components/RitualsForm.vue'
import { powerDefault, ritualDefault } from '../../../../utils/default'

defineProps({
  currentEditOption: {
    type: Number,
    required: true
  },
  editPower: {
    type: Object as PropType<Power>,
    default: powerDefault
  },
  editRitual: {
    type: Object as PropType<Ritual>,
    default: ritualDefault
  }
})

const emit = defineEmits(['handleCloseModal', 'handleEditPowerSheet', 'handleEditRitualSheet'])

const componentOptions = {
  power: 0,
  ritual: 1
}

const handleEditPowerSheet = (payload: { power: Power }) => emit('handleEditPowerSheet', payload.power)

const handleEditRitualSheet = (payload: { ritual: Ritual }) => emit('handleEditRitualSheet', payload.ritual)
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
      <div v-if="currentEditOption === componentOptions.power">
        <AbilitiesForm
          :power="editPower"
          edit
          sheet
          @handle-edit-power="handleEditPowerSheet"
          @handle-close="$emit('handleCloseModal')"
        />
      </div>
      <div v-if="currentEditOption === componentOptions.ritual">
        <RitualsForm
          :ritual="editRitual"
          edit
          sheet
          @handle-edit-ritual="handleEditRitualSheet"
          @handle-close="$emit('handleCloseModal')"
        />
      </div>
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