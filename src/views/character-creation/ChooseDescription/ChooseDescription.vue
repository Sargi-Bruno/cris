<script setup lang="ts">
import { Character } from '../../../types'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import ToastNotification from '../../../components/ToastNotification.vue'

const props = defineProps<{character: Character}>()

const emit = defineEmits(['handleUpdateDescription'])

const router = useRouter()
const errorMessage = ref('')
const toastAlive = ref(false)
const toastTimeout = ref<number>()

const handleUpdateDescription = (e: Event, key: 'physical' | 'personal' | 'history' | 'goal') => {
  const payload = {
    value: (e.target as HTMLInputElement).value,
    key
  }

  emit('handleUpdateDescription', payload)
}

const handleFinishCreation = () => {
  if(props.character.backgroundName === '') {
    errorMessage.value = 'Escolha uma origem'
    toastAlive.value = true
    return
  }
  if(props.character.className === '') {
    errorMessage.value = 'Escolha uma classe'
    toastAlive.value = true
    return
  }

  router.push({ name: 'character-sheet' })
}

const placeholder = {
  physical: 'Nome, gênero, idade, descrição física...',
  personal: 'Traços marcantes, opiniões, ideais...',
  history: 'Infância, relação com a família, contato com o Paranormal, eventos bons e ruins...',
  goal: 'Por que ele faz parte da Ordem? Porque luta contra o Outro Lado?'
}

watch(toastAlive, () => {
  if(toastAlive.value === true) {
    toastTimeout.value = setTimeout(() => toastAlive.value = false, 3000)
  }
})

const dismissToast = () => {
  toastAlive.value = false
  clearTimeout(toastTimeout.value)
}
</script>

<template>
  <div class="content">
    <p>
      Até aqui, você definiu as características mecânicas de 
      sua ficha — mas um bom personagem é mais do que 
      apenas números. Agora, vamos trabalhar na descrição 
      de seu agente, definindo aspectos como nome, gênero 
      e idade. Esses aspectos não possuem efeito em regras, 
      mas deixam o jogo mais envolvente e divertido.
    </p>
    <button 
      class="button-primary finish-button"
      @click="handleFinishCreation"
    >
      Finalizar
    </button>
    <div class="inputs-row">
      <div class="input-container">
        <h3>Personagem</h3>
        <input 
          type="text" 
          class="input-primary"
          placeholder="Nome do personagem"
          :value="character.name"
        >
      </div>
      <div class="input-container">
        <h3>Jogador</h3>
        <input 
          type="text" 
          class="input-primary"
          placeholder="Nome do jogador"
          :value="character.player"
        >
      </div>
    </div>
    <div class="textarea-container">
      <h3>Aparência</h3>
      <textarea
        class="textarea" 
        rows="6"
        :placeholder="placeholder.physical"
        :value="character.description.physical"
        @input="(e) => handleUpdateDescription(e, 'physical')"
      >
      </textarea>
    </div>
    <div class="textarea-container">
      <h3>Personalidade</h3>
      <textarea
        class="textarea" 
        rows="6"
        :placeholder="placeholder.personal"
        :value="character.description.personal"
        @input="(e) => handleUpdateDescription(e, 'personal')"
      >
      </textarea>
    </div>
    <div class="textarea-container">
      <h3>Histórico</h3>
      <textarea
        class="textarea" 
        rows="6"
        :placeholder="placeholder.history"
        :value="character.description.history"
        @input="(e) => handleUpdateDescription(e, 'history')"
      >
      </textarea>
    </div>
    <div class="textarea-container">
      <h3>Objetivo</h3>
      <textarea
        class="textarea" 
        rows="6"
        :placeholder="placeholder.goal"
        :value="character.description.goal"
        @input="(e) => handleUpdateDescription(e, 'goal')"
      >
      </textarea>
    </div>
    <transition name="toast">
      <ToastNotification
        v-if="toastAlive"
        :value="errorMessage"
        type="error"
        @dismiss="dismissToast"
      />
    </transition>
  </div>
</template>

<style scoped>
.content {
  margin-top: 2rem;
  width: 70%;
  margin: 0 auto;
}
.finish-button {
  display: block;
  margin-left: auto;
  height: 2.25rem;
  width: 6rem;
  font-size: 16px;
}
.inputs-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}
.input-container h3 {
  margin: 0;
}
.textarea-container {
  margin-bottom: 1rem;
}
.textarea-container h3 {
  margin: 0;
}
</style>