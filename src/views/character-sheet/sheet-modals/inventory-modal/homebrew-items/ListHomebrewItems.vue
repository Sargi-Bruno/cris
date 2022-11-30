<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Weapon, Protection, Misc, CursedItem, Ammunition } from '../../../../../types'
import WeaponCard from '../../../../../components/WeaponCard.vue'
import ProtectionCard from '../../../../../components/ProtectionCard.vue'
import MiscCard from '../../../../../components/MiscCard.vue'
import CursedItemCard from '../../../../../components/CursedItemCard.vue'
import SearchInput from '../../../../../components/SearchInput.vue'
import { compare } from '../../../../../utils/functions'
import LoadingView from '../../../../../components/LoadingView.vue'
import ConfirmDelete from '../../../../../components/ConfirmDelete.vue'

const props = defineProps({
  currentTab: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  'handleAddItem',
  'handleCreateWeapon',
  'handleCreateAmmunition',
  'handleCreateProtection',
  'handleCreateMisc',
  'handleCreateCursedItem',
  'handleEditItem',
])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(true)
const weapons = ref<Weapon[]>([])
const ammunitions = ref<Ammunition[]>([])
const protections = ref<Protection[]>([])
const miscs = ref<Misc[]>([])
const cursedItems = ref<CursedItem[]>([])
const searchTextWeapons = ref('')
const searchTextAmmunitions = ref('')
const searchTextProtections = ref('')
const searchTextMisc = ref('')
const searchTextCursedItems = ref('')
const deleteMode = ref(false)
const deleteId = ref('')
const deleteIndex = ref()
const deleteItemType = ref('')

const handleAddItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleAddItem', item)
const handleEditItem = (item: Weapon | Protection | Misc | CursedItem) => emit('handleEditItem', item)

onMounted(async () => {
  if(!auth.currentUser) return

  const homebrewPowersCollection = collection(firestore, 'homebrewItems')
  const homebrewPowers = query(homebrewPowersCollection, where('uid', '==', auth.currentUser?.uid))
  const querySnapshot = await getDocs(homebrewPowers)

  const weaponsDocs: Weapon[] = []
  const ammunitionsDocs: Ammunition[] = []
  const protectionsDocs: Protection[] = []
  const miscsDocs: Misc[] = []
  const cursedItemsDocs: CursedItem[] = []

  querySnapshot.docs.forEach((doc) => {
    const data: Weapon | Ammunition | Protection | Misc | CursedItem = doc.data() as  Weapon | Ammunition | Protection | Misc | CursedItem
    data.id = doc.id

    if(data.itemType === 'weapon') weaponsDocs.push(data as Weapon)
    if(data.itemType === 'ammunition') ammunitionsDocs.push(data as Ammunition)
    if(data.itemType === 'protection') protectionsDocs.push(data as Protection)
    if(data.itemType === 'misc') miscsDocs.push(data as Misc)
    if(data.itemType === 'cursedItem') cursedItemsDocs.push(data as CursedItem)
  })

  weapons.value = weaponsDocs
  ammunitions.value = ammunitionsDocs
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
    return ammunitions.value
            .filter((ele) => compare(ele.name, searchTextAmmunitions.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 2) 
    return protections.value
            .filter((ele) => compare(ele.name, searchTextProtections.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 3) 
    return miscs.value
            .filter((ele) => compare(ele.name, searchTextMisc.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  if(props.currentTab === 4) 
    return cursedItems.value
            .filter((ele) => compare(ele.name, searchTextCursedItems.value))
            .sort((a, b) => a.name.localeCompare(b.name))

  return []
})

const handleDelete = (payload: { id: string, itemType: string }) => {
  deleteId.value = payload.id
  deleteMode.value = true
  deleteItemType.value = payload.itemType

  if(payload.itemType === 'weapon') deleteIndex.value = weapons.value.findIndex((e) => e.id === payload.id)
  if(payload.itemType === 'ammunition') deleteIndex.value = ammunitions.value.findIndex((e) => e.id === payload.id)
  if(payload.itemType === 'protection') deleteIndex.value = protections.value.findIndex((e) => e.id === payload.id)
  if(payload.itemType === 'misc') deleteIndex.value = miscs.value.findIndex((e) => e.id === payload.id)
  if(payload.itemType === 'cursedItem') deleteIndex.value = cursedItems.value.findIndex((e) => e.id === payload.id)
}

const handleCancelDelete = () => {
  deleteId.value = ''
  deleteMode.value = false
  deleteIndex.value = undefined
  deleteItemType.value = ''
}

const handleConfirmDelete = () => {
  deleteDoc(doc(firestore, 'homebrewItems', deleteId.value))

  if(deleteItemType.value === 'weapon') weapons.value.splice(deleteIndex.value, 1)
  if(deleteItemType.value === 'ammunition') ammunitions.value.splice(deleteIndex.value, 1)
  if(deleteItemType.value === 'protection') protections.value.splice(deleteIndex.value, 1)
  if(deleteItemType.value === 'misc') miscs.value.splice(deleteIndex.value, 1)
  if(deleteItemType.value === 'cursedItem') cursedItems.value.splice(deleteIndex.value, 1)

  deleteId.value = ''
  deleteMode.value = false
  deleteIndex.value = undefined
  deleteItemType.value = ''
}
</script>

<template>
  <div v-if="!loading">
    <div v-if="!deleteMode">
      <div v-if="currentTab === 0">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateWeapon')"
        >
          Adicionar Arma
        </button>
      </div>
      <div v-if="(currentTab === 1)">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateAmmunition')"
        >
          Adicionar Munição
        </button>
      </div>
      <div v-if="(currentTab === 2)">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateProtection')"
        >
          Adicionar Proteção
        </button>
      </div>
      <div v-if="(currentTab === 3)">
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateMisc')"
        >
          Adicionar Item Geral
        </button>
      </div>
      <div v-if="(currentTab === 4)">
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
      <div v-if="ammunitions.length > 0">
        <div
          v-if="(currentTab === 1)"
          class="search-container"
        >
          <SearchInput 
            :value="searchTextAmmunitions"
            dark
            @update="value => searchTextAmmunitions = value"
          />
        </div>
      </div>
      <div v-if="protections.length > 0">
        <div
          v-if="(currentTab === 2)"
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
          v-if="(currentTab === 3)"
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
          v-if="(currentTab === 4)"
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
          <div v-if="(item.itemType === 'misc' || item.itemType === 'ammunition')">
            <MiscCard
              :misc="(item as Misc | Ammunition)"
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
        <div v-if="currentTab === 0">
          <div
            v-if="weapons.length > 0"
            class="no-content"
          >
            Nenhuma arma encontrada
          </div>
          <div
            v-else
            class="no-content"
          >
            Você ainda não criou novas armas
          </div>
        </div>
        <div v-if="(currentTab === 1)">
          <div
            v-if="ammunitions.length > 0"
            class="no-content"
          >
            Nenhuma munição encontrada
          </div>
          <div
            v-else
            class="no-content"
          >
            Você ainda não criou novas munições
          </div>
        </div>
        <div v-if="(currentTab === 2)">
          <div
            v-if="protections.length > 0"
            class="no-content"
          >
            Nenhuma proteção encontrada
          </div>
          <div
            v-else
            class="no-content"
          >
            Você ainda não criou novas proteções
          </div>
        </div>
        <div v-if="(currentTab === 3)">
          <div
            v-if="miscs.length > 0"
            class="no-content"
          >
            Nenhum equipamento encontrado
          </div>
          <div
            v-else
            class="no-content"
          >
            Você ainda não criou novos equipamentos
          </div>
        </div>
        <div v-if="(currentTab === 4)">
          <div
            v-if="cursedItems.length > 0"
            class="no-content"
          >
            Nenhum item amaldiçoado encontrado
          </div>
          <div
            v-else
            class="no-content"
          >
            Você ainda não criou novos itens amaldiçoados
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="deleteItemType === 'weapon'">
        <ConfirmDelete
          :name="weapons[deleteIndex].name"
          @handle-cancel="handleCancelDelete"
          @handle-confirm="handleConfirmDelete"
        />
      </div>
      <div v-if="deleteItemType === 'ammunition'">
        <ConfirmDelete
          :name="ammunitions[deleteIndex].name"
          @handle-cancel="handleCancelDelete"
          @handle-confirm="handleConfirmDelete"
        />
      </div>
      <div v-if="deleteItemType === 'protection'">
        <ConfirmDelete
          :name="protections[deleteIndex].name"
          @handle-cancel="handleCancelDelete"
          @handle-confirm="handleConfirmDelete"
        />
      </div>
      <div v-if="deleteItemType === 'misc'">
        <ConfirmDelete
          :name="miscs[deleteIndex].name"
          @handle-cancel="handleCancelDelete"
          @handle-confirm="handleConfirmDelete"
        />
      </div>
      <div v-if="deleteItemType === 'cursedItem'">
        <ConfirmDelete
          :name="cursedItems[deleteIndex].name"
          @handle-cancel="handleCancelDelete"
          @handle-confirm="handleConfirmDelete"
        />
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