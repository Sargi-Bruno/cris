<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { Character, Timestamp } from '../../types'
import CharacterCard from './CharacterCard.vue'

const auth = getAuth()
const firestore = getFirestore()
const characters = ref<Character[]>([])
const loading = ref(true)
const showModal = ref(false)
const modalChar = ref<Character>()
const modalRemoveInput = ref('')

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

const canRemove = computed(() => {
  return modalRemoveInput.value.toLocaleLowerCase().trim() === 'remover'
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
          :disabled="characters.length >= 3"
          @click="$router.push({ name: 'character-creation'})"
        >
          Novo agente
        </button>
        <div>
          <h3>Agentes {{ characters.length }}/3</h3>
          <div class="cards-container">
            <div 
              v-for="character in characters"
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
  grid-template-columns: repeat(3, 23rem);
  column-gap: 3rem;
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