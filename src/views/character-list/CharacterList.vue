<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, getDoc, query, where, deleteDoc, doc } from 'firebase/firestore'
import { Character, Timestamp } from '../../types'
import { compare } from '../../utils/functions'
import LoadingView from '../../components/LoadingView.vue'
import SearchInput from '../../components/SearchInput.vue'
import CharacterCard from './CharacterCard.vue'

const auth = getAuth()
const firestore = getFirestore()
const characters = ref<Character[]>([])
const loading = ref(true)
const showModal = ref(false)
const modalChar = ref<Character>()
const modalRemoveInput = ref('')
const betaTester = ref(false)
const searchText = ref('')
const charLimit = ref(3)

onMounted(async () => {
  if(!auth.currentUser?.email) return

  const testersSnapshot = await getDoc(doc(firestore, 'beta', 'testers'))
  const betaTesters = testersSnapshot.data()?.testers as string[]

  if(betaTesters.includes(auth.currentUser?.email)) {
    betaTester.value = true
    charLimit.value = 100
  }

  const docs: Character[] = []

  const charsCollection = collection(firestore, 'characters')
  const charsRef = query(charsCollection, where('uid', '==', auth.currentUser?.uid))

  const querySnapshot = await getDocs(charsRef)

  querySnapshot.docs.forEach((doc) => {
    const data: Character = doc.data() as Character
    data.id = doc.id

    docs.push(data)
  })

  docs.sort((a, b) => ((b.timestamp?.seconds as number) * 1000) - ((a.timestamp?.seconds as number) * 1000))

  characters.value = docs
  loading.value = false
})

const canRemove = computed(() => {
  return modalRemoveInput.value.toLocaleLowerCase().trim() === 'remover'
})

const filteredChars = computed(() => {
  return characters.value.filter((ele) => compare(ele.name, searchText.value))
})

const handleOpenModal = (charId: string) => {
  showModal.value = true
  const index = characters.value.findIndex((e) => e.id === charId)
  modalChar.value = characters.value[index]
}

const handleCloseModal = () => {
  showModal.value = false
  modalChar.value = undefined
  modalRemoveInput.value = ''
}

const handleRemoveChar = () => {
  if(!modalChar.value) return

  deleteDoc(doc(firestore, 'characters', modalChar.value.id as string))
  const index = characters.value.findIndex((e) => e.id === modalChar?.value?.id)
  characters.value.splice(index, 1)

  handleCloseModal()
}
</script>

<template>
  <div class="agents-container">
    <div v-if="!loading">
      <div v-if="characters.length > 0">
        <button 
          class="button-primary new-button"
          :disabled="characters.length >= charLimit"
          @click="$router.push({ name: 'character-creation'})"
        >
          Novo agente
        </button>
        <div>
          <h3 v-if="!betaTester">
            Agentes {{ characters.length }}/{{ charLimit }}
          </h3>
          <h3 v-else>
            Agentes {{ characters.length }}/{{ charLimit }}
          </h3>
          <div v-if="betaTester">
            <SearchInput 
              :value="searchText"
              @update="(value: string) => searchText = value"
            />
          </div>
          <div class="cards-container">
            <div 
              v-for="character in filteredChars"
              :key="character.id"
            >
              <CharacterCard
                :char-id="(character.id as string)"
                :name="character.name"
                :char-class="character.className"
                :timestamp="(character.timestamp as Timestamp).seconds"
                @handle-remove="handleOpenModal"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-agents-container">
        <h3>Nenhum agente encontrado!</h3>
        <button 
          class="button-primary"
          @click="$router.push({ name: 'character-creation'})"
        >
          Novo agente
        </button>
      </div>
    </div>
    <div v-else>
      <LoadingView />
    </div>
    <div v-if="modalChar">
      <vue-final-modal 
        v-model="showModal"
        classes="modal-container"
      >
        <div class="modal-content modal-width">
          <div class="modal-header">
            <h2>Desligar este agente da Ordem?</h2>
            <button @click="handleCloseModal">
              <img
                class="close-icon"
                src="../../assets/close-icon.svg" 
                alt="fechar"
              >
            </button>
          </div>
          <div class="modal-body">
            <h3>Para confirmar essa operação, digite <b>REMOVER</b> no campo abaixo:</h3>
            <h4>Atenção: essa operação é permanente e irreversível!</h4>
            <div class="input-container">
              <input 
                v-model="modalRemoveInput"
                type="text"
                class="input-primary"
              />
              <button
                class="button-remove"
                :disabled="!canRemove"
                @click="handleRemoveChar"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </vue-final-modal>
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
.no-agents-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16rem;
}
.cards-container {
  display: grid;
  margin-top: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 3.5rem;
  row-gap: 2.5rem;
  margin-bottom: 2.5rem;
}
@media only screen and (max-width: 1280px) {
.cards-container {
  column-gap: 2.25rem;
}
}
.modal-width {
  width: 40rem;
}
:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body h3 {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
}
.modal-body h4 {
  margin: 0;
  font-size: 12px;
  color: var(--color-red);
  font-weight: normal;
}
.input-container {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.input-container input {
  background-color: var(--color-smoky-black);
  width: 100%;
}
</style>