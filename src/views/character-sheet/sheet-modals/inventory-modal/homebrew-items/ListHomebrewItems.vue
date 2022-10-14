<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Weapon, Protection, Misc, CursedItem } from '../../../../../types'
import WeaponCard from '../../../../../components/WeaponCard.vue'
import ProtectionCard from '../../../../../components/ProtectionCard.vue'
import MiscCard from '../../../../../components/MiscCard.vue'
import CursedItemCard from '../../../../../components/CursedItemCard.vue'
import SearchInput from '../../../../../components/SearchInput.vue'
import { compare } from '../../../../../utils/functions'
import LoadingView from '../../../../../components/LoadingView.vue'

const props = defineProps({
  currentTab: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  'handleAddItem',
  'handleCreateWeapon',
  'handleCreateProtection',
  'handleCreateMisc',
  'handleCreateCursedItem',
  'handleEditItem',
])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(true)
const weapons = ref<Weapon[]>([])
const protections = ref<Protection[]>([])
const miscs = ref<Misc[]>([])
const cursedItems = ref<CursedItem[]>([])
const searchTextWeapons = ref('')
const searchTextProtections = ref('')
const searchTextMisc = ref('')
const searchTextCursedItems = ref('')

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)
const handleEditItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleEditItem', item)

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
  if(props.currentTab === 0) 
    return weapons.value
            .filter((ele) => compare(ele.name, searchTextWeapons.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 1) 
    return protections.value
            .filter((ele) => compare(ele.name, searchTextProtections.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 2) 
    return miscs.value
            .filter((ele) => compare(ele.name, searchTextMisc.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 3) 
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
    const index = cursedItems.value.findIndex((e) => e.id === payload.id)
    cursedItems.value.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="!loading">
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
    <div v-if="weapons.length > 0">
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
    <div v-if="protections.length > 0">
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
    <div v-if="miscs.length > 0">
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
    <div v-if="cursedItems.length > 0">
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
            @handle-edit="handleEditItem"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'protection'">
          <ProtectionCard
            :protection="(item as Protection)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditItem"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'misc'">
          <MiscCard
            :misc="(item as Misc)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditItem"
            @handle-add="handleAddItem"
          />
        </div>
        <div v-if="item.itemType === 'cursedItem'">
          <CursedItemCard
            :cursed-item="(item as CursedItem)"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-edit="handleEditItem"
            @handle-add="handleAddItem"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div 
        v-if="currentTab === 0" 
        class="no-content"
      >
        Você ainda não criou novas armas
      </div>
      <div 
        v-if="currentTab === 1" 
        class="no-content"
      >
        Você ainda não criou novas proteções
      </div>
      <div 
        v-if="currentTab === 2" 
        class="no-content"
      >
        Você ainda não criou novos equipamentos
      </div>
      <div 
        v-if="currentTab === 3" 
        class="no-content"
      >
        Você ainda não criou novos itens amaldiçoados
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.new-button {
  display: block;
  margin-left: auto;
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