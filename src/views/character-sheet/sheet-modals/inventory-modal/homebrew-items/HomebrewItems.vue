<script setup lang="ts">
import { ref } from 'vue'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import TabNav from '../../../../../components/TabNav.vue'
import ListHomebrewItems from './ListHomebrewItems.vue'
import CreateHomebrewItems from './CreateHomebrewItems.vue'
import EditHomebrewItems from './EditHomebreItems.vue'

const emit = defineEmits(['handleAddItem'])

const currentTab = ref(0)
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
const tabOptions = [
  {
    label: 'Armas',
    value: 0,
  },
  {
    label: 'Proteções',
    value: 1,
  },
  {
    label: 'Geral',
    value: 2,
  },
  {
    label: 'Itens Amaldiçoados',
    value: 3
  }
]

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)

const handleEditItem = (item: Weapon | Protection | Misc | CursedItem) => {
  editItem.value = item
  option.value = options.edit
}

const handleCreateOption = (createOption: string) => {
  currentCreateOption.value = createOption
  option.value = options.create
}
</script>

<template>
  <div class="class-abilities-container">
    <div :class="{ 'tab-margin': option !== options.list }">
      <TabNav
        :current-tab="currentTab"
        :tab-options="tabOptions"
        @handle-navigation="(value: number) => currentTab = value"
      />
    </div>
    <div v-if="option === options.list">
      <ListHomebrewItems
        :current-tab="currentTab"
        @handle-add-item="handleAddItem"
        @handle-edit-item="handleEditItem"
        @handle-create-weapon="handleCreateOption(createOptions.weapon)"
        @handle-create-protection="handleCreateOption(createOptions.protection)"
        @handle-create-misc="handleCreateOption(createOptions.misc)"
        @handle-create-cursed-item="handleCreateOption(createOptions.cursedItem)"
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
.tab-margin {
  margin-bottom: 1rem;
}
</style>