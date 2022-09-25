<script setup lang="ts">
import { Character } from '../../../types'

interface DescriptionItems {
  title: string,
  key: 'physical' | 'personal' | 'history' | 'goal',
  placeholder: string
}

defineProps<{character: Character, loading: boolean}>()

const emit = defineEmits(['handleUpdateDescription', 'handleFinishCreation', 'handleChangeChar'])

const handleUpdateDescription = (e: Event, key: 'physical' | 'personal' | 'history' | 'goal') => {
  const payload = {
    value: (e.target as HTMLInputElement).value,
    key
  }

  emit('handleUpdateDescription', payload)
}

const items: Array<DescriptionItems> = [
  {
    title: 'Aparência',
    key: 'physical',
    placeholder: 'Nome, gênero, idade, descrição física...'
  },
  {
    title: 'Personalidade',
    key: 'personal',
    placeholder: 'Traços marcantes, opiniões, ideais...'
  },
  {
    title: 'Histórico',
    key: 'history',
    placeholder: 'Infância, relação com a família, contato com o Paranormal, eventos bons e ruins...'
  },
  {
    title: 'Objetivo',
    key: 'goal',
    placeholder: 'Por que ele faz parte da Ordem? Porque luta contra o Outro Lado?'
  }
]
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
      :disabled="loading"
      @click="$emit('handleFinishCreation')"
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
          @blur="e => $emit('handleChangeChar', {e, key: 'name'})"
        >
      </div>
      <div class="input-container">
        <h3>Jogador</h3>
        <input 
          type="text" 
          class="input-primary"
          placeholder="Nome do jogador"
          :value="character.player"
          @blur="e => $emit('handleChangeChar', {e, key: 'player'})"
        >
      </div>
    </div>
    <div v-for="item in items" :key="item.title">
      <div class="textarea-container">
        <h3>{{ item.title }}</h3>
        <textarea
          class="textarea" 
          rows="6"
          :placeholder="item.placeholder"
          :value="character.description[item.key]"
          @blur="(e) => handleUpdateDescription(e, item.key)"
        >
        </textarea>
      </div>
    </div>
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