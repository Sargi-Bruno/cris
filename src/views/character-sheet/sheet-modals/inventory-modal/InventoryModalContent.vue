<script setup lang="ts">
import { computed, ref } from 'vue'
import { Weapon, Protection, Misc, CursedItem, Ammunition } from '../../../../types'
import weapons from '../../../../data/weapons'
import ammunitions from '../../../../data/ammunitions'
import protections from '../../../../data/protections'
import miscs from '../../../../data/miscs'
import cursedItems from '../../../../data/cursedItems'
import TabNav from '../../../../components/TabNav.vue'
import WeaponCard from '../../../../components/WeaponCard.vue'
import ProtectionCard from '../../../../components/ProtectionCard.vue'
import MiscCard from '../../../../components/MiscCard.vue'
import CursedItemCard from '../../../../components/CursedItemCard.vue'
import SearchInput from '../../../../components/SearchInput.vue'
import { compare } from '../../../../utils/functions'

const emit = defineEmits(['handleAddItem', 'handleCloseModal'])

const tabOptions = [
  {
    label: 'Armas',
    value: 0,
  },
  {
    label: 'Munições',
    value: 1,
  },
  {
    label: 'Proteções',
    value: 2,
  },
  {
    label: 'Geral',
    value: 3,
  },
  {
    label: 'Itens Amaldiçoados',
    value: 4
  }
]

const currentTab = ref(0)
const searchTextWeapons = ref('')
const searchTextMisc = ref('')
const searchTextCursedItems = ref('')

const handleAddItem = (item: Weapon | Protection | Misc) => emit('handleAddItem', item)

const currentItems = computed<Weapon[] | Protection[] | Misc[] | CursedItem[]>(() => {
  if(currentTab.value === 0) 
    return weapons
            .filter((ele) => compare(ele.name, searchTextWeapons.value))
            .sort((a, b) => a.name.localeCompare(b.name))
  
  if(currentTab.value === 1) 
    return ammunitions
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 2) 
    return protections
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 3) 
    return miscs
            .filter((ele) => compare(ele.name, searchTextMisc.value))
            .sort((a, b) => a.name.localeCompare(b.name))
 
  if(currentTab.value === 4) 
    return cursedItems
            .filter((ele) => compare(ele.name, searchTextCursedItems.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  return []
})
</script>

<template>
  <div class="class-abilities-container">
    <TabNav
      :current-tab="currentTab"
      :tab-options="tabOptions"
      @handle-navigation="(value: number) => currentTab = value"
    />
    <div
      v-if="currentTab === 0"
      class="search-container"
    >
      <SearchInput 
        :value="searchTextWeapons"
        dark
        @update="value => searchTextWeapons = value"
      />
    </div>
    <div
      v-if="currentTab === 3"
      class="search-container"
    >
      <SearchInput 
        :value="searchTextMisc"
        dark
        @update="value => searchTextMisc = value"
      />
    </div>
    <div
      v-if="currentTab === 4"
      class="search-container"
    >
      <SearchInput 
        :value="searchTextCursedItems"
        dark
        @update="value => searchTextCursedItems = value"
      />
    </div>
    <div
      v-if="currentItems.length > 0"
      class="class-abilities-content"
    >
      <div
        v-for="item in currentItems"
        :key="item.name"
        class="class-abilitie-card"
      >
        <div v-if="item.itemType === 'weapon'">
          <WeaponCard
            :weapon="(item as Weapon)"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'protection'">
          <ProtectionCard
            :protection="(item as Protection)"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'misc' || item.itemType === 'ammunition'">
          <MiscCard
            :misc="(item as Misc | Ammunition)"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'cursedItem'">
          <CursedItemCard
            :cursed-item="(item as CursedItem)"
            @handle-add="handleAddItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-abilities-container {
  margin-top: 1rem;
}
.search-container {
  margin-top: 1rem;
}
.class-abilities-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
.class-abilitie-card:not(:last-of-type) {
  margin-bottom: .5rem;
}
</style>