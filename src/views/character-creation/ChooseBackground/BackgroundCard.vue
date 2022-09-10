<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Background } from '../../../types';

const props = defineProps({
  background: {
    type: Object as PropType<Background>,
    required: true
  }
})

const emit = defineEmits(['handleAdd'])

const showMore = ref(false)

const handleAdd = () => {
  emit('handleAdd', props.background)
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
        <img src="../../../assets/show-more-icon.svg" alt="show-more">
      </div>
      <h3 class="title">
        {{ background.name }}
      </h3>
      <button class="button" @click.stop="handleAdd">
        Escolher
      </button>
    </div>
    <Transition name="fadeHeight" mode="out-in">
      <div v-if="showMore">
        <div class="divider" />
        <div class="content">
          <div v-html="background.description" />
          <p>
            <span class="subtitle">Perícias treinadas. </span>
            <span v-if="background.skills">
              {{ background.skills[0] }} e {{ background.skills[1] }}.
            </span>
            <span v-else>
              Duas à escolha do mestre.
            </span>
          </p>
          <p>
            <span class="subtitle">{{ background.power.name }}. </span>
            <span>{{ background.power.description }}</span>
          </p>
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
.button {
  margin-left: auto;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-white);
  height: 2rem;
  font-weight: 600;
  font-size: 14px;
}
.button:hover {
  filter: brightness(90%);
}
.divider {
  margin-left: .5rem;
  margin-right: .5rem;
  border-bottom: 1px solid var(--color-primary);
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
.subtitle {
  color: var(--color-primary);
}
</style>