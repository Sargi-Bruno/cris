<script setup lang="ts">
import backgrounds from '../../../data/backgrounds'
import BackgroundCard from './BackgroundCard.vue'
import SearchInput from '../../../components/SearchInput.vue'
import { Background } from '../../../types'
import { computed, ref } from 'vue'
import { compare } from '../../../utils/functions'

const emit = defineEmits(['handleAddBackground'])

const handleAdd = (background: Background) => {
  emit('handleAddBackground', background)
}

const searchText = ref('')

const backgroundsFiltered = computed(() => {
  return backgrounds.filter((ele) => compare(ele.name, searchText.value))
})
</script>

<template>
  <div class="text-container">
    <p>
      O que seu personagem fazia antes de se envolver com o paranormal e ingressar na 
      Ordem da Realidade? A origem representa como a vida pregressa influencia 
      sua carreira de investigador. Escolha uma origem que se encaixe com 
      o conceito de seu personagem ou escolha uma aleatoriamente.
    </p>
    <h3>Ao escolher uma origem, você recebe duas perícias treinadas e um poder da origem.</h3>
    <p>
      Cada origem apresentada a seguir é intencionalmente vaga, apenas uma ideia 
      por onde começar. Você pode usá-la como está, para jogar rapidamente, ou 
      colorir com quantos detalhes quiser, conforme o conceito de seu agente.
    </p>
    <SearchInput 
      :value="searchText"
      @update="value => searchText = value"
    />
    <div class="background-container">
      <div
        v-for="background in backgroundsFiltered" 
        :key="background.name"
        class="background"
      >
        <BackgroundCard :background="background" @handle-add="handleAdd" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-container {
  width: 70%;
  margin: 0 auto;
}
.text-container p:last-of-type {
  margin-bottom: 2rem;
}
.background-container {
  margin-top: 2rem;
  margin-bottom: 25rem;
}
.background {
  margin-bottom: 1rem;
}
</style>