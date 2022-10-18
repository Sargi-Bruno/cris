<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Weapon } from '../types'
import DividerView from './DividerView.vue'
import AmmunitionCard from './AmmunitionCard.vue'

const props = defineProps({
  weapon: {
    type: Object as PropType<Weapon>,
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

const emit = defineEmits(['handleAdd', 'handleRemove', 'handleEquip', 'handleEdit'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.weapon)
}

const handleRemove = () => {
  const payload = {
    id: props.weapon.id || props.id,
    itemType: props.weapon.itemType
  }
  emit('handleRemove', payload)
}

const handleEquip = () => {
  emit('handleEquip', props.id)
}

const handleEdit = () => {
  emit('handleEdit', props.weapon)
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
            {{ weapon.name }}
          </h3>
          <div v-if="!sheet || homebrew" class="item-info-category">
            <h3><b>{{ weapon.proficiencie }}</b> - <i>{{ weapon.type }} - {{ weapon.handling }}</i></h3>
          </div>
        </div>
        <div class="item-info-container">
          <div v-if="!sheet || homebrew" class="item-info">
            <h3>Categoria: <span>{{ weapon.category }}</span></h3>
          </div>
          <div class="item-info">
            <h3>
              Dano: <span>{{ weapon.damage }}</span>
              <span v-if="weapon.secondaryDamage">/{{ weapon.secondaryDamage }}</span>
            </h3>
          </div>
          <div class="item-info">
            <h3>
              Crítico: 
              <span v-if="weapon.criticalRange < 20 && weapon.criticalMult > 2">{{ weapon.criticalRange }}/x{{ weapon.criticalMult }}</span>
              <span v-else-if="weapon.criticalRange < 20">{{ weapon.criticalRange }}</span>
              <span v-else>x{{ weapon.criticalMult }}</span>
            </h3>
          </div>
          <div v-if="!sheet || homebrew" class="flex-row">
            <div v-if="weapon.range !== '-'" class="item-info">
              <h3>Alcance: <span>{{ weapon.range }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Tipo: <span>{{ weapon.damageType }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Espaços: <span>{{ weapon.slots }}</span></h3>
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
          @click.stop="handleEquip"
        >
          <img
            src="../assets/done-icon-primary.svg" 
            alt="equipar"
            class="checkbox-img"
            :class="{ 'checkbox-img-fade': !weapon.equipped }"
          >
        </button>
      </div>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-if="sheet && !homebrew" class="only-sheet-content-container">
            <div class="item-info-category-sheet">
              <h3><b>{{ weapon.proficiencie }}</b> - <i>{{ weapon.type }} - {{ weapon.handling }}</i></h3>
            </div>
            <div class="item-info">
              <h3>Categoria: <span>{{ weapon.category }}</span></h3>
            </div>
            <div v-if="weapon.range !== '-'" class="item-info">
              <h3>Alcance: <span>{{ weapon.range }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Tipo: <span>{{ weapon.damageType }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Espaços: <span>{{ weapon.slots }}</span></h3>
            </div>
          </div>
          <div
            v-if="weapon.ammunition"
            :class="{ 'sheet-content': sheet && !homebrew}"
          >
            <AmmunitionCard :ammunition="weapon.ammunition" />
          </div>
          <div :class="{ 'sheet-content': sheet && !homebrew}" v-html="weapon.description" />
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
.item-info-category-sheet h3 {
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
.sheet-content h3 span {
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
  cursor: pointer;
  margin-right: .5rem;
  padding: 0;
  width: 2rem;
}
.checkbox-button:hover {
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
</style>