<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Background } from '../../../types'
import DividerView from '../../../components/DividerView.vue'

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
  <div class="card-gray">
    <div
      class="header"
      @click="showMore = !showMore"
    >
      <div 
        class="show-more"
        :class="{ rotate: showMore }"
      >
        <img src="../../../assets/show-more-icon.svg" alt="ver mais">
      </div>
      <h3 class="title">
        {{ background.name }}
      </h3>
      <button class="button button-primary" @click.stop="handleAdd">
        Escolher
      </button>
    </div>
    <Transition name="fadeHeight" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-html="background.description" />
          <div v-if="background.skills.length > 0">
            <p>
              <span>Perícias treinadas. </span>
              {{ background.skills[0] }} e {{ background.skills[1] }}.
            </p>
          </div>
          <div v-else>
            <p>
              <span>Perícias treinadas. </span>
              Duas à escolha do mestre.
            </p>
          </div>
          <p>
            <span>{{ background.power.name }}. </span>
            {{ background.power.description }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
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
  height: 2rem;
}
.button:hover {
  filter: brightness(90%);
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