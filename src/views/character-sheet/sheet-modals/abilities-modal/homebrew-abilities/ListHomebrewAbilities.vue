<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Power } from '../../../../../types'
import PowerCard from '../../../../../components/PowerCard.vue'
import SearchInput from '../../../../../components/SearchInput.vue'
import { compare } from '../../../../../utils/functions'
import LoadingView from '../../../../../components/LoadingView.vue'

const emit = defineEmits(['handleAddPower', 'handleEditPower'])

const auth = getAuth()
const firestore = getFirestore()
const loading = ref(true)
const powers = ref<Power[]>([])
const searchText = ref('')

const handleAddPower = (power: Power) => emit('handleAddPower', power)

const handleEditPower = (power: Power) => emit('handleEditPower', power)

onMounted(async () => {
  if(!auth.currentUser) return

  const homebrewPowersCollection = collection(firestore, 'homebrewPowers')
  const homebrewPowers = query(homebrewPowersCollection, where('uid', '==', auth.currentUser?.uid))
  const querySnapshot = await getDocs(homebrewPowers)

  const docs: Power[] = []

  querySnapshot.docs.forEach((doc) => {
    const data: Power = doc.data() as Power
    data.id = doc.id

    docs.push(data)
  })

  powers.value = docs
  loading.value = false
})

const currentPowers = computed<Power[]>(() => {
  if(!powers.value) return []

  return powers.value.filter((ele) => compare(ele.name, searchText.value)).sort((a, b) => a.name.localeCompare(b.name))
})

const handleDelete = (id: string) => {
  deleteDoc(doc(firestore, 'homebrewPowers', id))
  const index = powers.value.findIndex((e) => e.id === id)
  powers.value.splice(index, 1)
}
</script>

<template>
  <div v-if="!loading">
    <div
      v-if="powers.length > 6"
      class="search-container"
    >
      <SearchInput 
        :value="searchText"
        dark
        @update="value => searchText = value"
      />
    </div>
    <div
      v-if="currentPowers.length > 0"
      class="class-abilities-content"
    >
      <div
        v-for="power in currentPowers"
        :key="power.id"
        class="class-abilitie-card"
      >
        <PowerCard
          :id="power.id"
          :power="power"
          sheet
          homebrew
          @handle-remove="handleDelete"
          @handle-add="handleAddPower"
          @handle-edit="handleEditPower"
        />
      </div>
    </div>
    <div v-else>
      <div class="no-content">
        Você ainda não criou novas habilidades
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