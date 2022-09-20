<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Weapon } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  weapon: {
    type: Object as PropType<Weapon>,
    required: true
  },
  onlyShow: Boolean
})

const emit = defineEmits(['handleAdd'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.weapon)
}
</script>

<template>
  <div class="card">
    <div
      class="header"
      @click="showMore = !showMore"
    >
      <div 
        class="show-more"
        :class="{ rotate: showMore }"
        @click.stop="showMore = !showMore"
      >
        <img src="../assets/show-more-icon.svg" alt="ver mais">
      </div>
      <div>
        <div class="first-row">
          <h3 class="title">
            {{ weapon.name }}
          </h3>
          <div class="item-info-category">
            <h3><b>{{ weapon.proficiencie }}</b> - <i>{{ weapon.type }} - {{ weapon.handling }}</i></h3>
          </div>
        </div>
        <div class="item-info-container">
          <div class="item-info">
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
          <div
            v-if="weapon.ammunition"
            class="item-ammunition"
          >
            <h3>{{ weapon.ammunition.name }}</h3>
            <div class="item-info">
              <h3>Categoria: <span>{{ weapon.ammunition.category }}</span></h3>
            </div>
            <div class="item-info">
              <h3>Espaços: <span>{{ weapon.ammunition.slots }}</span></h3>
            </div>
          </div>
          <div v-html="weapon.description" />
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
.item-ammunition {
  display: flex;
  margin-top: 1rem;
  margin-left: 3rem;
}
.item-ammunition h3 {
  margin: 0;
  margin-right: 1rem;
  font-size: 16px;
}
</style>