<script setup lang="ts">
import { Character } from '../../../types'

interface DescriptionItems {
  title: string,
  key: 'physical' | 'personal' | 'history' | 'goal',
  placeholder: string
}

defineProps<{character: Character}>()

const emit = defineEmits(['handleUpdateDescription'])

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
  <div class="description-tab">
    <div v-for="item in items" :key="item.title">
      <div class="textarea-container">
        <h3>{{ item.title }}</h3>
        <textarea
          class="textarea" 
          rows="6"
          :placeholder="item.placeholder"
          :value="character.description[item.key]"
          @input="(e) => handleUpdateDescription(e, item.key)"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.textarea-container {
  margin-bottom: 1rem;
}
.textarea-container h3 {
  margin: 0;
  font-size: 14px;
}
</style>