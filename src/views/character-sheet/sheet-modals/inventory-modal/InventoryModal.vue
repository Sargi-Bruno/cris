<script setup lang="ts">
import { computed, ref } from 'vue'
import { Weapon, Protection, Misc } from '../../../../types'
import weapons from '../../../../data/weapons'
import protections from '../../../../data/protections'
import miscs from '../../../../data/miscs'
import TabNav from '../../../../components/TabNav.vue'
import WeaponCard from '../../../../components/WeaponCard.vue'
import ProtectionCard from '../../../../components/ProtectionCard.vue'
import MiscCard from '../../../../components/MiscCard.vue'
import SearchInput from '../../../../components/SearchInput.vue'
import { compare } from '../../../../utils/functions'

const emit = defineEmits(['handleAddItem', 'handleCloseModal'])

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
  }
]

const currentTab = ref(0)
const searchText = ref('')

const handleAddItem = (item: Weapon | Protection | Misc) => emit('handleAddItem', item)

const currentItems = computed<Weapon[] | Protection[] | Misc[]>(() => {
  if(currentTab.value === 0) 
    return weapons
            .filter((ele) => compare(ele.name, searchText.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 1) 
    return protections
            .filter((ele) => compare(ele.name, searchText.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 2) 
    return miscs
            .filter((ele) => compare(ele.name, searchText.value))
            .sort((a, b) => a.name.localeCompare(b.name))
  return []
})
</script>

<template>
  <div class="modal-content modal-width">
    <div class="modal-header">
      <h2>Itens</h2>
      <button @click="$emit('handleCloseModal')">
        <img
          class="close-icon"
          src="../../../../assets/close-icon.svg" 
          alt="fechar"
        >
      </button>
    </div>
    <div class="modal-body modal-height">
      <div class="class-abilities-container">
        <TabNav
          :current-tab="currentTab"
          :tab-options="tabOptions"
          @handle-navigation="(value: number) => currentTab = value"
        />
        <div
          v-if="currentTab !== 1"
          class="search-container"
        >
          <SearchInput 
            :value="searchText"
            dark
            @update="value => searchText = value"
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
            <div v-if="item.itemType === 'misc'">
              <MiscCard
                :misc="(item as Misc)"
                @handle-add="handleAddItem"
              />
            </div>
          </div>
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
.secondary-tab-container {
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