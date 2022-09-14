<script setup lang="ts">
import classes from '../../../data/classes'
import ClassCard from './ClassCard.vue'
import { Class } from '../../../types'

const emit = defineEmits(['handleAddClass'])

const handleAddClass = (charClass: Class) => {
  emit('handleAddClass', charClass)
}
</script>

<template>
  <div class="class-wrapper">
    <div class="text-container">
      <p>
        Sua classe indica o treinamento que você recebeu 
        na Ordem para enfrentar os perigos do Outro Lado. 
        Em termos de jogo, é a sua característica mais importante, pois define o que você faz e qual é o seu 
        papel no grupo de investigadores.
      </p>
    </div>
    <div class="classes-container">
      <div class="classes-flex">
        <div v-for="charClass in classes" :key="charClass.name">
          <ClassCard 
            :char-class="charClass"
            @handle-add-class="handleAddClass"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-wrapper {
  margin-bottom: .5rem;
}
.text-container {
  width: 70%;
  margin: 0 auto;
}
.classes-container {
  width: 95%;
  margin: 0 auto;
}
.classes-flex {
  display: flex;
  justify-content: space-between;
}
</style>