<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { Character, Timestamp } from '../../types'
import CharacterCard from './CharacterCard.vue'

const auth = getAuth()
const firestore = getFirestore()
const characters = ref<Character[]>([])
const loading = ref(true)

onMounted(async () => {
  const docs: Character[] = []

  const charsCollection = collection(firestore, 'characters')
  const charsRef = query(charsCollection, where('uid', '==', auth.currentUser?.uid))

  const querySnapshot = await getDocs(charsRef)

  querySnapshot.docs.forEach((doc) => {
    const data: Character = doc.data() as Character
    data.id = doc.id

    docs.push(data)
  })

  characters.value = docs
  loading.value = false
})
</script>

<template>
  <div class="agents-container">
    <div v-if="!loading">
      <button 
        class="button-primary new-button"
        :disabled="characters.length >= 3"
        @click="$router.push({ name: 'character-creation'})"
      >
        Novo agente
      </button>
      <div v-if="characters.length > 0">
        <h3>Agentes {{ characters.length }}/3</h3>
        <div class="cards-container">
          <div 
            v-for="character in characters"
            :key="character.id"
          >
            <CharacterCard
              :name="character.name"
              :char-class="character.className"
              :timestamp="(character.timestamp as Timestamp).seconds"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <h3 class="no-agents-text">
          Você ainda não possue agentes
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agents-container {
  margin-top: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.new-button {
  display: block;
  margin-left: auto;
}
.cards-container {
  display: flex;
  justify-content: space-between;
}
.no-agents-text {
  text-align: center;
}
</style>