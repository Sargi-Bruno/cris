<script setup lang="ts">
import { ref } from 'vue'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import ListHomebrewItems from './ListHomebrewItems.vue'
import CreateHomebrewItems from './CreateHomebrewItems.vue'
import EditHomebrewItems from './EditHomebrewItems.vue'

const emit = defineEmits(['handleAddItem'])

const editItem = ref<Weapon | Protection | Misc | CursedItem>()
const option = ref('list')
const options = {
  list: 'list',
  create: 'create',
  edit: 'edit'
}
const currentCreateOption = ref('weapon')
const createOptions = {
  weapon: 'weapon',
  protection: 'protection',
  misc: 'misc',
  cursedItem: 'cursedItem'
}

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)

const handleEditItem = (item: Weapon | Protection | Misc | CursedItem) => {
  editItem.value = item
  option.value = options.edit
}
</script>

<template>
  <div class="class-abilities-container">
    <div v-if="option === options.list">
      <ListHomebrewItems 
        @handle-add-item="handleAddItem"
        @handle-edit-ritual="handleEditItem"
        @handle-create-weapon="currentCreateOption = createOptions.weapon"
        @handle-create-protection="currentCreateOption = createOptions.protection"
        @handle-create-misc="currentCreateOption = createOptions.misc"
        @handle-create-cursed-item="currentCreateOption = createOptions.cursedItem"
      />
    </div>
    <div v-if="option === options.create">
      <CreateHomebrewItems
        :current-create-option="currentCreateOption"
        @handle-close="option = options.list"
      />
    </div>
    <div v-if="option === options.edit">
      <div v-if="editItem">
        <EditHomebrewItems
          :item="editItem"
          @handle-close="option = options.list"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-abilities-container {
  margin-top: 1rem;
}
</style>