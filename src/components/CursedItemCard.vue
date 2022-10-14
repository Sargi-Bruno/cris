<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { CursedItem } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  cursedItem: {
    type: Object as PropType<CursedItem>,
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
  return elementColors[props.cursedItem.element.toLowerCase() as keyof typeof elementColors]
})

const currentTextElementColor = computed(() => {
  if(currentElementColor.value === '#fff') return '#121212'
  else return '#fff'
})

const handleAdd = () => {
  emit('handleAdd', props.cursedItem)
}

const handleRemove = () => {
  const payload = {
    id: props.cursedItem.id || props.id,
    itemType: props.cursedItem.itemType
  }
  emit('handleRemove', payload)
}

const handleEdit = () => {
  emit('handleEdit', props.cursedItem)
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
        {{ cursedItem.name }}
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
        <div class="item-element">
          <h3>{{ cursedItem.element.toUpperCase() }}</h3>
        </div>
        <div class="content">
          <div :class="{ 'sheet-content': sheet}" v-html="cursedItem.description" />
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
.item-element {
  width: fit-content;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  padding-left: .5rem;
  padding-right: .5rem;
  background-color: v-bind(currentElementColor);
  border-radius: 2px;
}
.item-element h3 {
  font-size: 12px;
  font-weight: normal;
  color: v-bind(currentTextElementColor);
  margin: 0;
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