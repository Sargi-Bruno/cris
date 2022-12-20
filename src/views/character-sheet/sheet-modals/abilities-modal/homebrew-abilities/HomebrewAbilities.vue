<script setup lang="ts">
import { ref } from 'vue'
import { Power } from '../../../../../types'
import ListHomebrewAbilities from './ListHomebrewAbilities.vue'
import CreateHomebrewAbilities from './CreateHomebrewAbilities.vue'
import EditHomebrewAbilities from './EditHomebrewAbilities.vue'

const emit = defineEmits(['handleAddPower'])

const editPower = ref<Power>()
const option = ref('list')
const options = {
  list: 'list',
  create: 'create',
  edit: 'edit'
}

const handleAddPower = (power: Power) => emit('handleAddPower', power)

const handleEditPower = (power: Power) => {
  editPower.value = power
  option.value = options.edit
}
</script>

<template>
  <div class="class-abilities-container">
    <div v-if="option === options.list">
      <button
        class="button-primary new-button"
        @click="option = options.create"
      >
        Adicionar
      </button>
    </div>
    <div v-if="option === options.list">
      <ListHomebrewAbilities 
        @handle-add-power="handleAddPower"
        @handle-edit-power="handleEditPower"
      />
    </div>
    <div v-if="option === options.create">
      <CreateHomebrewAbilities
        @handle-close="option = options.list"
      />
    </div>
    <div v-if="option === options.edit">
      <div v-if="editPower">
        <EditHomebrewAbilities
          :power="editPower"
          @handle-close="option = options.list"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-button {
  display: block;
  margin-left: auto;
}
.class-abilities-container {
  margin-top: 1rem;
}
</style>