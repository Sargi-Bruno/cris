<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { Ritual } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  ritual: {
    type: Object as PropType<Ritual>,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  onlyShow: Boolean,
  sheet: Boolean,
  homebrew: Boolean
})

const emit = defineEmits(['handleAdd', 'handleRemove', 'handleEdit'])

const elementColors = {
  conhecimento: '#ff8c00',
  energia: '#7000AC',
  morte: '#121212',
  sangue: '#d9534f',
  medo: 'transparent',
  varia: '#fff',
}

const showMore = ref(false)

const currentElementColor = computed(() => {
  return elementColors[props.ritual.element.toLowerCase() as keyof typeof elementColors]
})

const currentTextElementColor = computed(() => {
  if(currentElementColor.value === '#fff') return '#121212'
  else return '#fff'
})

const handleAdd = () => {
  emit('handleAdd', props.ritual)
}

const handleRemove = () => {
  emit('handleRemove', props.id)
}

const handleEdit = () => {
  emit('handleEdit', props.ritual)
}
</script>

<template>
  <div class="card">
    <div
      class="header"
      @click="showMore = !showMore"
    >
      <button 
        class="show-more"
        :class="{ rotate: showMore }"
        @click.stop="showMore = !showMore"
      >
        <img src="../assets/show-more-icon.svg" alt="ver mais">
      </button>
      <h3 class="title" :class="{ 'sheet-title': sheet}">
        {{ ritual.name }}
      </h3>
      <div v-if="!onlyShow" class="button-container">
        <button class="button-primary" @click.stop="handleAdd">
          <img src="../assets/add-icon.svg" alt="adicionar">
        </button>
      </div>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="ritual-info-container" :class="{ 'sheet-content': sheet}">
          <div class="ritual-circle">
            <h3>{{ ritual.element.toUpperCase() }} {{ ritual.circle }}</h3>
          </div>
          <div class="ritual-info">
            <h3>Execução: <span>{{ ritual.execution.toLocaleLowerCase() }}</span></h3>
          </div>
          <div class="ritual-info">
            <h3>Alcance: <span>{{ ritual.range.toLocaleLowerCase() }}</span></h3>
          </div>
          <div
            v-if="ritual.area"
            class="ritual-info"
          >
            <h3>Área: <span>{{ ritual.area }}</span></h3>
          </div>
          <div
            v-if="ritual.target"
            class="ritual-info"
          >
            <h3>Alvo: <span>{{ ritual.target }}</span></h3>
          </div>
          <div
            v-if="ritual.effect"
            class="ritual-info"
          >
            <h3>Efeito: <span>{{ ritual.effect }}</span></h3>
          </div>
          <div
            v-if="ritual.duration"
            class="ritual-info"
          >
            <h3>Duração: <span>{{ ritual.duration }}</span></h3>
          </div>
          <div
            v-if="ritual.save"
            class="ritual-info"
          >
            <h3>Resistência: <span>{{ ritual.save }}</span></h3>
          </div>
        </div>
        <div class="content">
          <div :class="{ 'sheet-content': sheet}" v-html="ritual.description" />
          <div
            v-if="sheet"
            class="card-footer"
          >
            <button
              class="button-remove"
              @click.stop="handleRemove"
            >
              {{ homebrew ? 'Deletar' : 'Remover' }}
            </button>
            <button
              class="button-remove button-edit"
              @click.stop="handleEdit"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
}
.header {
  padding: .5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.show-more {
  transition: 0.3s ease-in-out;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  border: none;
}
.show-more img {
  height: 2rem;
  transition: all 300ms;
}
.rotate {
  transform: rotate(-180deg);
}
.title {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: .75rem;
}
.button-container {
  margin-left: auto;
}
.button-container button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
}
.ritual-circle {
  width: fit-content;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  padding-left: .5rem;
  padding-right: .5rem;
  background-color: v-bind(currentElementColor);
  border-radius: 2px;
}
.ritual-circle h3 {
  font-size: 12px;
  font-weight: normal;
  color: v-bind(currentTextElementColor);
  margin: 0;
}
.ritual-info {
  margin-left: 1rem;
}
.ritual-info h3 {
  font-size: 16px;
  font-weight: normal;
  color: var(--color-primary);
  margin: 0;
}
.ritual-info span {
  color: var(--color-white);
  font-size: 16px;
}
.content {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-bottom: .1rem;
}
.sheet-title {
  font-size: 14px;
}
.sheet-content :deep(p) {
  font-size: 14px;
}
.sheet-content h3 {
  font-size: 14px;
}
.sheet-content h3 span {
  font-size: 14px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;
  margin-bottom: .5rem;
}
.button-edit {
  color: var(--color-green);
}
</style>