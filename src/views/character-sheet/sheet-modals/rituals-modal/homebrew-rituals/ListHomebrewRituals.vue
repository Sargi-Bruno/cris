<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Ritual } from '../../../../../types'
import RitualCard from '../../../../../components/RitualCard.vue'
import SearchInput from '../../../../../components/SearchInput.vue'
import { compare } from '../../../../../utils/functions'
import LoadingView from '../../../../../components/LoadingView.vue'
import TabNav from '../../../../../components/TabNav.vue'
import ConfirmDelete from '../../../../../components/ConfirmDelete.vue'

const emit = defineEmits(['handleAddRitual', 'handleEditRitual', 'handleCreateRitual'])

const tabOptions = [
  {
    label: 'Todos',
    value: 0
  },
  {
    label: 'Conhecimento',
    value: 1,
  },
  {
    label: 'Energia',
    value: 2,
  },
  {
    label: 'Morte',
    value: 3,
  },
  {
    label: 'Sangue',
    value: 4,
  },
  {
    label: 'Medo',
    value: 5,
  },
  {
    label: 'Varia',
    value: 6,
  }
]

const secondaryTabOptions = [
  {
    label: 'Todos',
    circle: '-',
    value: 0
  },
  {
    label: '1º Círculo',
    circle: '1',
    value: 1
  },
  {
    label: '2º Círculo',
    circle: '2',
    value: 2
  },
  {
    label: '3º Círculo',
    circle: '3',
    value: 3
  },
  {
    label: '4º Círculo',
    circle: '4',
    value: 4
  }
]

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(true)
const rituals = ref<Ritual[]>([])
const currentTab = ref(0)
const currentSecondaryTab = ref(0)
const searchText = ref('')
const deleteMode = ref(false)
const deleteId = ref('')
const deleteIndex = ref()

const handleAddRitual = (ritual: Ritual) => emit('handleAddRitual', ritual)

const handleEditRitual = (ritual: Ritual) => emit('handleEditRitual', ritual)

onMounted(async () => {
  if(!auth.currentUser) return

  const homebrewRitualsCollection = collection(firestore, 'homebrewRituals')
  const homebrewRituals = query(homebrewRitualsCollection, where('uid', '==', auth.currentUser?.uid))
  const querySnapshot = await getDocs(homebrewRituals)

  const docs: Ritual[] = []

  querySnapshot.docs.forEach((doc) => {
    const data: Ritual = doc.data() as Ritual
    data.id = doc.id

    docs.push(data)
  })

  rituals.value = docs
  loading.value = false
})

const currentRituals = computed<Ritual[]>(() => {
  if(currentTab.value === 0) {
    if(currentSecondaryTab.value === 0) return rituals.value.filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
    else return rituals.value.filter((ritual) => ritual.circle === secondaryTabOptions[currentSecondaryTab.value].circle)
                        .filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
  }

  if(currentSecondaryTab.value === 0) {
    if(currentTab.value === 0) return rituals.value.filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
    else return rituals.value.filter((ritual) => ritual.element === tabOptions[currentTab.value].label)
                        .filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
  }

  return rituals.value.filter((ritual) => ritual.element === tabOptions[currentTab.value].label).filter((ele) => compare(ele.name, searchText.value))
          .filter((ritual) => ritual.circle === secondaryTabOptions[currentSecondaryTab.value].circle).filter((ele) => compare(ele.name, searchText.value))
})

const handleDelete = (id: string) => {
  deleteId.value = id
  deleteMode.value = true
  deleteIndex.value = rituals.value.findIndex((e) => e.id === deleteId.value)
}

const handleCancelDelete = () => {
  deleteId.value = ''
  deleteMode.value = false
  deleteIndex.value = undefined
}

const handleConfirmDelete = () => {
  deleteDoc(doc(firestore, 'homebrewRituals', deleteId.value))
  rituals.value.splice(deleteIndex.value, 1)
  deleteId.value = ''
  deleteMode.value = false
  deleteIndex.value = undefined
}
</script>

<template>
  <div v-if="!loading">
    <div v-if="!deleteMode">
      <div class="list-ritual-header">
        <div>
          <TabNav
            :current-tab="currentTab"
            :tab-options="tabOptions"
            @handle-navigation="(value: number) => currentTab = value"
          />
          <div class="secondary-tab-container">
            <TabNav
              :current-tab="currentSecondaryTab"
              :tab-options="secondaryTabOptions"
              secondary
              @handle-navigation="(value: number) => currentSecondaryTab = value"
            />
          </div>
        </div>
        <button
          class="button-primary new-button"
          @click="$emit('handleCreateRitual')"
        >
          Adicionar
        </button>
      </div>
      <div
        v-if="rituals.length > 0" 
        class="search-container"
      >
        <SearchInput 
          :value="searchText"
          dark
          @update="value => searchText = value"
        />
      </div>
      <div 
        v-if="currentRituals.length > 0"
        class="class-ritual-content"
      >
        <div
          v-for="ritual in currentRituals"
          :key="ritual.id"
          class="class-ritual-card"
        >
          <RitualCard
            :id="ritual.id"
            :ritual="ritual"
            sheet
            homebrew
            @handle-remove="handleDelete"
            @handle-add="handleAddRitual"
            @handle-edit="handleEditRitual"
          />
        </div>
      </div>
      <div v-else>
        <div
          v-if="rituals.length > 0"
          class="no-content"
        >
          Nenhum ritual encontrado
        </div>
        <div
          v-else
          class="no-content"
        >
          Você ainda não criou novos rituais
        </div>
      </div>
    </div>
    <div v-else>
      <ConfirmDelete
        :name="rituals[deleteIndex].name"
        @handle-cancel="handleCancelDelete"
        @handle-confirm="handleConfirmDelete"
      />
    </div>
  </div>
  <div v-else>
    <LoadingView />
  </div>
</template>

<style scoped>
.list-ritual-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.class-ritual-content {
  margin-top: 1rem;
  border-radius: 4px;
  padding: .5rem;
  background-color: var(--color-smoky-black);
}
.class-ritual-card:not(:last-of-type) {
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
.secondary-tab-container {
  margin-top: 1rem;
}
</style>