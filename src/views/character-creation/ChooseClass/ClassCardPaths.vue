<script setup lang="ts">
import { PropType } from 'vue'
import { Class } from '../../../types'
import ClassCardPathAbilitieCard from './ClassCardPathAbilitieCard.vue'

defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  }
})
</script>

<template>
  <div class="paths-container card-black">
    <h3 class="path-title">
      TRILHAS DE {{ charClass.name.toUpperCase() }}
    </h3>
    <div class="paths">
      <div v-for="path in charClass.paths" :key="path.name">
        <h3>{{ path.name }}</h3>
        <div v-html="path.description" />
        <div class="abilities">
          <div v-for="(abilitie) in path.abilities" :key="abilitie.name">
            <ClassCardPathAbilitieCard :abilitie="abilitie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paths-container {
  margin-top: 1rem;
}
.path-title {
  margin: 0;
  text-decoration: underline;
}
.paths h3 {
  margin-bottom: 0;
}
.abilities div:not(:last-of-type) {
  margin-bottom: .5rem;
}
</style>