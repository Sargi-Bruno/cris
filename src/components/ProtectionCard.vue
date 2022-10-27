<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Protection } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  protection: {
    type: Object as PropType<Protection>,
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

const emit = defineEmits(['handleAdd', 'handleRemove', 'handleEquip', 'handleEdit'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.protection)
}

const handleRemove = () => {
  const payload = {
    id: props.protection.id || props.id,
    itemType: props.protection.itemType
  }
  emit('handleRemove', payload)
}

const handleEquip = () => {
  emit('handleEquip', props.id)
}

const handleEdit = () => {
  emit('handleEdit', props.protection)
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
            {{ protection.name }}
          </h3>
        </div>
        <div class="item-info-container">
          <div class="item-info">
            <h3>Defesa: <span>+{{ protection.defense }}</span></h3>
          </div>
          <div v-if="!sheet || homebrew" class="flex-row">
            <div class="item-info">
              <h3>Categoria: <span>{{ protection.category }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Espaços: <span>{{ protection.slots }}</span></h3>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!onlyShow" class="button-container">
        <button class="button-primary" @click.stop="handleAdd">
          <img src="../assets/add-icon.svg" alt="adicionar">
        </button>
      </div>
      <div v-if="sheet && !homebrew" class="button-container">
        <button 
          class="checkbox-button"
          :class="{ 'disabled': disabled }"
          :disabled="disabled"
          @click.stop="handleEquip"
        >
          <img
            src="../assets/done-icon-primary.svg" 
            alt="equipar"
            class="checkbox-img"
            :class="{ 'checkbox-img-fade': !protection.equipped }"
          >
        </button>
      </div>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-if="sheet" class="only-sheet-content-container">
            <div class="item-info">
              <h3>Categoria: <span>{{ protection.category }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Espaços: <span>{{ protection.slots }}</span></h3>
            </div>
          </div>
          <div :class="{ 'sheet-content': sheet}" v-html="protection.description" />
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
.only-sheet-content-container {
  margin-top: 1rem;
}
.flex-row {
  display: flex;
}
.checkbox-button {
  background-color: transparent;
  border: 1px solid var(--color-white);
  border-radius: 4px;
  margin-right: .5rem;
  padding: 0;
  width: 2rem;
}
.checkbox-button:hover {
  cursor: pointer;
  border: 1px solid var(--color-primary);
}
.checkbox-img {
  height: 1.5rem;
  opacity: 1;
  transition: opacity 150ms;
}
.checkbox-img-fade {
  opacity: 0;
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
.disabled:hover {
  border: 1px solid var(--color-white);
}
</style>