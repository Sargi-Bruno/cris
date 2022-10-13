<script setup lang="ts">
import { ref } from 'vue'
import { Ritual } from '../../../../../types'
import ListHomebrewRituals from './ListHomebrewRituals.vue'
import CreateHomebrewRituals from './CreateHomebrewRituals.vue'
import EditHomebrewRituals from './EditHomebrewRituals.vue'

const emit = defineEmits(['handleAddRitual'])

const editRitual = ref<Ritual>()
const option = ref('list')
const options = {
  list: 'list',
  create: 'create',
  edit: 'edit'
}

const handleAddRitual = (ritual: Ritual) => emit('handleAddRitual', ritual)

const handleEditRitual = (ritual: Ritual) => {
  editRitual.value = ritual
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
      <ListHomebrewRituals 
        @handle-add-ritual="handleAddRitual"
        @handle-edit-ritual="handleEditRitual"
      />
    </div>
    <div v-if="option === options.create">
      <CreateHomebrewRituals
        @handle-close="option = options.list"
      />
    </div>
    <div v-if="option === options.edit">
      <div v-if="editRitual">
        <EditHomebrewRituals
          :ritual="editRitual"
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