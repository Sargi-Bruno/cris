<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Misc } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  misc: {
    type: Object as PropType<Misc>,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  onlyShow: Boolean,
  sheet: Boolean,
  homebrew: Boolean,
  disabled: Boolean
})

const emit = defineEmits(['handleAdd', 'handleRemove', 'handleEdit'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.misc)
}

const handleRemove = () => {
  const payload = {
    id: props.misc.id || props.id,
    itemType: props.misc.itemType
  }
  emit('handleRemove', payload)
}

const handleEdit = () => {
  emit('handleEdit', props.misc)
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
      <div>
        <div class="first-row">
          <h3 class="title" :class="{ 'sheet-title': sheet && !homebrew}">
            {{ misc.name }}
          </h3>
          <div v-if="!sheet || homebrew" class="item-info-category">
            <h3><i>{{ misc.tag }}</i></h3>
          </div>
        </div>
        <div class="item-info-container">
          <div class="item-info">
            <h3>Categoria: <span>{{ misc.category }}</span></h3>
          </div>
          <div class="item-info">
            <h3>Espaços: <span>{{ misc.slots }}</span></h3>
          </div>
        </div>
      </div>
      <div v-if="!onlyShow" class="button-container">
        <button class="button-primary" @click.stop="handleAdd">
          <img src="../assets/add-icon.svg" alt="adicionar">
        </button>
      </div>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-if="sheet" class="item-info-category-sheet">
            <h3><i>{{ misc.tag }}</i></h3>
          </div>
          <div :class="{ 'sheet-content': sheet}" v-html="misc.description" />
          <div
            v-if="sheet && !disabled"
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
.first-row {
  display: flex;
  align-items: flex-end;
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
.item-info-container {
  display: flex;
  margin-left: .75rem;
}
.item-info-category {
  margin-left: .5rem;
  margin-bottom: .25rem;
}
.item-info-category h3 {
  margin: 0;
  font-weight: normal;
  font-size: 11px;
}
.item-info {
  margin-right: 1rem;
}
.item-info h3 {
  font-size: 14px;
  font-weight: normal;
  color: var(--color-primary);
  margin: 0;
}
.item-info span {
  color: var(--color-white);
  font-size: 14px;
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
.item-info-category-sheet {
  margin-top: 1rem;
}
.item-info-category-sheet h3 {
  margin: 0;
  font-weight: normal;
  font-size: 11px;
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