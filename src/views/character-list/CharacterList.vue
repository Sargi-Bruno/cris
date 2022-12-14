<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, getDoc, query, where, deleteDoc, doc } from 'firebase/firestore'
import { Character, Timestamp, ToastInfo } from '../../types'
import { compare } from '../../utils/functions'
import LoadingView from '../../components/LoadingView.vue'
import SearchInput from '../../components/SearchInput.vue'
import ToastNotification from '../../components/ToastNotification.vue'
import CharacterCard from './CharacterCard.vue'
import router from '../../router'

const auth = getAuth()
const firestore = getFirestore()
const characters = ref<Character[]>([])
const loading = ref(true)
const showModal = ref(false)
const modalChar = ref<Character>()
const modalRemoveInput = ref('')
const betaTester = ref(false)
const searchText = ref('')
const charLimit = ref(15)
const toastInfo = ref<ToastInfo>({
  message: '',
  type: 'info',
  alive: false,
  timeout: 0
})

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

const handleNewAgent = () => {
  if(characters.value.length > charLimit.value) return

  loading.value = true
  router.push({ name: 'character-creation'})
}

const handleOpenSheet = (charId: string) => {
  loading.value = true
  router.push({ name: 'character-sheet', params: { id: charId }})
}

const handleRemoveChar = () => {
  if(!modalChar.value) return

  deleteDoc(doc(firestore, 'characters', modalChar.value.id as string))
  const index = characters.value.findIndex((e) => e.id === modalChar?.value?.id)
  characters.value.splice(index, 1)

  handleCloseModal()
}

const handleShareCharacter = async (chardId: string) => {
  await navigator.clipboard.writeText(import.meta.env.VITE_BASE_URL + 'agente/' + chardId)
  toastInfo.value.message = 'Link copiado'
  toastInfo.value.alive = true
}

watch(() => toastInfo.value.alive, () => {
  if(toastInfo.value.alive === true) {
    toastInfo.value.timeout = window.setTimeout(() => toastInfo.value.alive = false, 3000)
  }
})

const dismissToastInfo = () => {
  toastInfo.value.alive = false
  clearTimeout(toastInfo.value.timeout)
}
</script>

<template>
  <div 
    v-if="!loading" 
    class="agents-container"
  >
    <div v-if="characters.length > 0">
      <button 
        class="button-primary new-button"
        :disabled="characters.length >= charLimit"
        @click="handleNewAgent"
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
        <div v-if="characters.length > 6">
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
              :sheet-picture="character.sheetPictureURL"
              @handle-open-sheet="handleOpenSheet"
              @handle-remove="handleOpenModal"
              @handle-share-character="handleShareCharacter"
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
            <h3>Para confirmar essa opera????o, digite <b>REMOVER</b> no campo abaixo:</h3>
            <h4>Aten????o: essa opera????o ?? permanente e irrevers??vel!</h4>
            <div class="input-container">
              <input 
                v-model="modalRemoveInput"
                type="text"
                class="input-primary"
                @keyup.enter="handleRemoveChar"
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
    <transition name="toast">
      <ToastNotification
        v-if="toastInfo.alive"
        :toast="toastInfo"
        :type="toastInfo.type"
        @dismiss="dismissToastInfo"
      />
    </transition>
  </div>
  <div v-else>
    <LoadingView />
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