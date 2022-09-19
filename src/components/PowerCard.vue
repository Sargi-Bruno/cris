<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Power } from '../types'
import DividerView from './DividerView.vue'

const props = defineProps({
  power: {
    type: Object as PropType<Power>,
    required: true
  },
  onlyShow: Boolean
})

const emit = defineEmits(['handleAdd'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.power)
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
      >
        <img src="../assets/show-more-icon.svg" alt="ver mais">
      </div>
      <h3 class="title">
        {{ power.name }}
      </h3>
      <div v-if="!onlyShow" class="button-container">
        <button class="button-primary" @click.stop="handleAdd">
          <img src="../assets/add-icon.svg" alt="adicionar">
        </button>
      </div>
    </div>
    <Transition name="fadeHeight" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-html="power.description" />
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
}
.rotate {
  rotate: 180deg;
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
.content {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-bottom: .1rem;
}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.25s ease-in-out;
  max-height: 999px;
}
.fadeHeight-enter-from,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>