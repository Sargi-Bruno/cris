<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import TabNav from '../../../../../components/TabNav.vue'
import WeaponCard from '../../../../../components/WeaponCard.vue'
import ProtectionCard from '../../../../../components/ProtectionCard.vue'
import MiscCard from '../../../../../components/MiscCard.vue'
import CursedItemCard from '../../../../../components/CursedItemCard.vue'
import SearchInput from '../../../../../components/SearchInput.vue'
import { compare } from '../../../../../utils/functions'
import LoadingView from '../../../../../components/LoadingView.vue'

const emit = defineEmits([
  'handleAddItem',
  'handleCreateWeapon',
  'handleCreateProtection',
  'handleCreateMisc',
  'handleCreateCursedItem',
  'handleEditWeapon',
  'handleEditProtection',
  'handleEditMisc',
  'handleEditCursedItem',
])

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

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(true)
const weapons = ref<Weapon[]>([])
const protections = ref<Protection[]>([])
const miscs = ref<Misc[]>([])
const cursedItems = ref<CursedItem[]>([])
const currentTab = ref(0)
const searchTextWeapons = ref('')
const searchTextProtections = ref('')
const searchTextMisc = ref('')
const searchTextCursedItems = ref('')

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)
const handleEditWeapon = (weapon: Weapon) => emit('handleEditWeapon', weapon)
const handleEditProtection = (protection: Protection) => emit('handleEditProtection', protection)
const handleEditMisc = (misc: Misc) => emit('handleEditMisc', misc)
const handleEditCursedItem = (cursedItem: CursedItem) => emit('handleEditCursedItem', cursedItem)

onMounted(async () => {
  if(!auth.currentUser) return

  const homebrewPowersCollection = collection(firestore, 'homebrewItems')
  const homebrewPowers = query(homebrewPowersCollection, where('uid', '==', auth.currentUser?.uid))
  const querySnapshot = await getDocs(homebrewPowers)

  const weaponsDocs: Weapon[] = []
  const protectionsDocs: Protection[] = []
  const miscsDocs: Misc[] = []
  const cursedItemsDocs: CursedItem[] = []

  querySnapshot.docs.forEach((doc) => {
    const data: Weapon | Protection | Misc | CursedItem = doc.data() as  Weapon | Protection | Misc | CursedItem
    data.id = doc.id

    if(data.itemType === 'weapon') weaponsDocs.push(data as Weapon)
    if(data.itemType === 'protection') protectionsDocs.push(data as Protection)
    if(data.itemType === 'misc') miscsDocs.push(data as Misc)
    if(data.itemType === 'cursedItem') cursedItemsDocs.push(data as CursedItem)
  })

  weapons.value = weaponsDocs
  protections.value = protectionsDocs
  miscs.value = miscsDocs
  cursedItems.value = cursedItemsDocs
  loading.value = false
})

const currentItems = computed(() => {
  if(currentTab.value === 0) 
    return weapons.value
            .filter((ele) => compare(ele.name, searchTextWeapons.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 1) 
    return protections.value
            .filter((ele) => compare(ele.name, searchTextProtections.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 2) 
    return miscs.value
            .filter((ele) => compare(ele.name, searchTextMisc.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(currentTab.value === 3) 
    return cursedItems.value
            .filter((ele) => compare(ele.name, searchTextCursedItems.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  return []
})

const handleDelete = (payload: { id: string, itemType: string }) => {
  deleteDoc(doc(firestore, 'homebrewItems', payload.id))
  
  if(payload.itemType === 'weapon') {
    const index = weapons.value.findIndex((e) => e.id === payload.id)
    weapons.value.splice(index, 1)
  }

  if(payload.itemType === 'protection') {
    const index = protections.value.findIndex((e) => e.id === payload.id)
    protections.value.splice(index, 1)
  }

  if(payload.itemType === 'misc') {
    const index = miscs.value.findIndex((e) => e.id === payload.id)
    miscs.value.splice(index, 1)
  }

  if(payload.itemType === 'cursedItem') {
    const index = currentItems.value.findIndex((e) => e.id === payload.id)
    currentItems.value.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="!loading">
    <div class="list-ritual-header">
      <div>
        <TabNav
          :current-tab="currentTab"
          :tab-options="tabOptions"
          @handle-navigation="(value: number) => currentTab = value"
        />
      </div>
      <div v-if="currentTab === 0">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateWeapon')"
        >
          Adicionar Arma
        </button>
      </div>
      <div v-if="currentTab === 1">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateProtection')"
        >
          Adicionar Proteção
        </button>
      </div>
      <div v-if="currentTab === 2">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateMisc')"
        >
          Adicionar Item Geral
        </button>
      </div>
      <div v-if="currentTab === 3">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateCursedItem')"
        >
          Adicionar Item Amaldiçoado
        </button>
      </div>
    </div>
    <div v-if="currentItems.length > 0">
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
    </div>
    <div v-if="currentItems.length > 0">
      <div
        v-if="currentTab === 1"
        class="search-container"
      >
        <SearchInput 
          :value="searchTextProtections"
          dark
          @update="value => searchTextProtections = value"
        />
      </div>
    </div>
    <div v-if="currentItems.length > 0">
      <div
        v-if="currentTab === 2"
        class="search-container"
      >
        <SearchInput 
          :value="searchTextMisc"
          dark
          @update="value => searchTextMisc = value"
        />
      </div>
    </div>
    <div v-if="currentItems.length > 0">
      <div
        v-if="currentTab === 3"
        class="search-container"
      >
        <SearchInput 
          :value="searchTextCursedItems"
          dark
          @update="value => searchTextCursedItems = value"
        />
      </div>
    </div>
    <div
      v-if="currentItems.length > 0"
      class="class-abilities-content"
    >
      <div
        v-for="item in currentItems"
        :key="item.id"
        class="class-abilitie-card"
      >
        <div v-if="item.itemType === 'weapon'">
          <WeaponCard
            :weapon="(item as Weapon)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditWeapon"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'protection'">
          <ProtectionCard
            :protection="(item as Protection)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditProtection"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'misc'">
          <MiscCard
            :misc="(item as Misc)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditMisc"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'cursedItem'">
          <CursedItemCard
            :cursed-item="(item as CursedItem)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditCursedItem"
            @handle-add="handleAddItem"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="no-content">
        Você ainda não criou nova
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.class-abilities-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
.class-abilitie-card:not(:last-of-type) {
  margin-bottom: .5rem;
}
.no-content {
  margin-top: 10rem;
  color: var(--color-white);
  font-size: 24px;
  text-align: center;
}
.search-container {
  margin-top: 1rem;
}
</style>