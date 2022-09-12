<script setup lang="ts">
import { PropType } from 'vue'
import { Class } from '../../../types'
import DividerComp from '../../../components/DividerComp.vue'
import ClassCardFeatures from './ClassCardFeatures.vue'
import ClassCardTable from './ClassCardTable.vue'
import ClassCardAbilities from './ClassCardAbilities.vue'
import ClassCardPaths from './ClassCardPaths.vue'

const props = defineProps({
  charClass: {
    type: Object as PropType<Class>,
    required: true
  },
  onlyView: Boolean
})

const emit = defineEmits(['handleAddClass'])

const handleAddClass = () => {
  emit('handleAddClass', props.charClass)
}
</script>

<template>
  <div 
    class="card"
    :class="onlyView ? 'view' : 'card'"
  >
    <div class="header">
      <h1>{{ charClass.name }}</h1>
    </div>
    <DividerComp no-margin />
    <div class="card-content">
      <p class="short-description">
        {{ charClass.shortDescription }}
      </p>
      <div v-html="charClass.description" />
      <div>
        <ClassCardFeatures :char-class="charClass" />
      </div>
      <div>
        <ClassCardTable :char-class="charClass" />
      </div>
      <div>
        <ClassCardAbilities :char-class="charClass" />
      </div>
      <div>
        <ClassCardPaths :char-class="charClass" />
      </div>
    </div>
    <div
      v-if="!onlyView"
      class="footer"
    >
      <button 
        class="choose-button button-primary"
        @click="handleAddClass"
      >
        Escolher
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 23rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
  padding: .5rem;
  margin-bottom: 1rem;
}
.view {
  width: fit-content;
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
  padding: .5rem;
  margin-bottom: 1rem;
}
.header h1 {
  padding-left: .5rem;
  margin: 0;
}
.card-content {
  margin-top: .5rem;
  padding-right: .5rem;
  padding-left: .5rem;
  height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.short-description {
  font-weight: 600;
}
.card-content::-webkit-scrollbar {
  width: 10px;
}
.card-content::-webkit-scrollbar-track {
  background: transparent;
  border: solid 3px transparent;
}
.card-content::-webkit-scrollbar-thumb {
  background: var(--color-smoky-black);
  border-radius: 4px;
  border: solid 3px transparent;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
.choose-button {
  height: 2.25rem;
  width: 40%;
  font-size: 16px;
}
</style>