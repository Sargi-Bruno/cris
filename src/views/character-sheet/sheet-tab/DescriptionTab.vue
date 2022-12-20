<script setup lang="ts">
import { Character } from '../../../types'

interface DescriptionItems {
  title: string,
  key: 'physical' | 'personal' | 'history' | 'goal',
  placeholder: string
}

defineProps<{character: Character, disabledSheet: boolean}>()

const emit = defineEmits(['handleChangeDescription'])

const handleChangeDescription = (e: Event, key: 'physical' | 'personal' | 'history' | 'goal') => {
  const payload = {
    value: (e.target as HTMLInputElement).value,
    key
  }

  emit('handleChangeDescription', payload)
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
  <div class="tab">
    <div v-for="item in items" :key="item.title">
      <div class="textarea-container">
        <h3>{{ item.title }}</h3>
        <textarea
          class="textarea" 
          rows="6"
          :disabled="disabledSheet"
          :placeholder="item.placeholder"
          :value="character.description[item.key]"
          @input="(e) => handleChangeDescription(e, item.key)"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab {
  height: 52.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: .5rem;
}
.textarea-container {
  margin-bottom: 1rem;
}
.textarea-container h3 {
  margin: 0;
  font-size: 14px;
}
</style>