<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Power } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  power: {
    type: Object as PropType<Power>,
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

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.power)
}

const handleRemove = () => {
  emit('handleRemove', props.id)
}

const handleEdit = () => {
  emit('handleEdit', props.power)
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
        {{ power.name }}
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
        <div class="content">
          <div v-if="power.description[0] !== '<'">
            <p class="sheet-content">
              {{ power.description }}
            </p>
          </div>
          <div v-else>
            <div :class="{ 'sheet-content': sheet}" v-html="power.description" />
          </div>
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
.sheet-title {
  font-size: 14px;
}
.sheet-content p {
  font-size: 14px;
}
.sheet-content :deep(p) {
  font-size: 14px;
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
.content {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-bottom: .1rem;
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