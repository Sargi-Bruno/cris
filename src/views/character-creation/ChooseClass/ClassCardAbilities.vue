<script setup lang="ts">
import { PropType } from 'vue'
import { Class } from '../../../types'
import PowerCard from '../../../components/PowerCard.vue'

defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  }
})

const pathAbilitie = {
  name: 'Habilidade de Trilha',
  description: 'Em NEX 10% você escolhe uma das trilhas de combatente e recebe o primeiro poder da trilha escolhida. Você recebe um novo poder da trilha escolhida em NEX 40%, 65% e 99%.'
}

const powerAbilitie = {
  name: 'Poder de',
  description: 'Em NEX 15%, você recebe um poder de combatente à sua escolha. Você recebe um novo poder de combatente em NEX 30% e a cada 15 pontos de NEX subsequentes, conforme indicado na tabela. Veja a lista de poderes a seguir.'
}
</script>

<template>
  <div class="abilities card-black">
    <h3>HABILIDADES DE {{ charClass.name.toUpperCase() }}</h3>
    <div v-for="abilitie in charClass.abilities" :key="abilitie.name">
      <div class="abilitie">
        <p><span>{{ abilitie.name }}. </span>{{ abilitie.description }}</p>
      </div>
    </div>
    <div class="abilitie">
      <p><span>{{ pathAbilitie.name }}. </span>{{ pathAbilitie.description }}</p>
    </div>
    <div class="abilitie">
      <p><span>{{ powerAbilitie.name }} {{ charClass.name }}. </span>{{ pathAbilitie.description }}</p>
    </div>
    <div class="powers">
      <div v-for="power in charClass.powers" :key="power.name">
        <PowerCard :power="power" only-show />
      </div>
    </div>
  </div>
</template>

<style scoped>
.abilities {
  margin-top: 1rem;
}
.abilities h3 {
  margin: 0;
  text-decoration: underline;
}
.powers div:not(:last-of-type) {
  margin-bottom: .5rem;
}
</style>