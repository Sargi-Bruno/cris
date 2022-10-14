<script setup lang="ts">
import { PropType } from 'vue'
import { Power, Ritual, Weapon, Protection, Misc, CursedItem } from '../../../../types'
import AbilitiesForm from '../../../../components/AbilitiesForm.vue'
import RitualsForm from '../../../../components/RitualsForm.vue'
import WeaponForm from '../../../../components/WeaponForm.vue'
import ProtectionForm from '../../../../components/ProtectionForm.vue'
import MiscForm from '../../../../components/MiscForm.vue'
import CursedItemForm from '../../../../components/CursedItemForm.vue'
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
  },
  editItem: {
    type: Object as PropType<Weapon | Protection | Misc | CursedItem>,
    required: true
  }
})

const emit = defineEmits(['handleCloseModal', 'handleEditPowerSheet', 'handleEditRitualSheet', 'handleEditItemSheet'])

const componentOptions = {
  power: 0,
  ritual: 1,
  item: 2
}

const handleEditPowerSheet = (payload: { power: Power }) => emit('handleEditPowerSheet', payload.power)
const handleEditRitualSheet = (payload: { ritual: Ritual }) => emit('handleEditRitualSheet', payload.ritual)
const handleEditItemSheet = (payload: { item: Weapon | Protection | Misc | CursedItem }) => emit('handleEditItemSheet', payload.item)
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
      <div v-if="currentEditOption === componentOptions.item">
        <div v-if="editItem.itemType === 'weapon'">
          <WeaponForm
            :weapon="(editItem as Weapon)"
            edit
            sheet
            @handle-edit-weapon="handleEditItemSheet"
            @handle-close="$emit('handleCloseModal')"
          />
        </div>
        <div v-if="editItem.itemType === 'protection'">
          <ProtectionForm
            :protection="(editItem as Protection)"
            edit
            sheet
            @handle-edit-protection="handleEditItemSheet"
            @handle-close="$emit('handleCloseModal')"
          />
        </div>
        <div v-if="editItem.itemType === 'misc'">
          <MiscForm
            :misc="(editItem as Misc)"
            edit
            sheet
            @handle-edit-misc="handleEditItemSheet"
            @handle-close="$emit('handleCloseModal')"
          />
        </div>
        <div v-if="editItem.itemType === 'cursedItem'">
          <CursedItemForm
            :cursed-item="(editItem as CursedItem)"
            edit
            sheet
            @handle-edit-cursed-item="handleEditItemSheet"
            @handle-close="$emit('handleCloseModal')"
          />
        </div>
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