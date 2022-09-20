<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Protection } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  procetion: {
    type: Object as PropType<Protection>,
    required: true
  },
  onlyShow: Boolean
})

const emit = defineEmits(['handleAdd'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.procetion)
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
          <h3 class="title">
            {{ procetion.name }}
          </h3>
        </div>
        <div class="item-info-container">
          <div class="item-info">
            <h3>Defesa: <span>+{{ procetion.defense }}</span></h3>
          </div>
          <div class="item-info">
            <h3>Categoria: <span>{{ procetion.category }}</span></h3>
          </div>
          <div class="item-info">
            <h3>Espaços: <span>{{ procetion.slots }}</span></h3>
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
          <div v-html="procetion.description" />
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
</style>