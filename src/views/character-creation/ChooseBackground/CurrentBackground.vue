<script setup lang="ts">
import { PropType } from 'vue'
import { Background } from '../../../types'

const props = defineProps({
  background: {
    type: Object as PropType<Background>,
    required: true
  }
})

const emit = defineEmits(['handleRemoveBackground'])

const handleRemoveBackground = () => {
  emit('handleRemoveBackground', props.background)
}
</script>

<template>
  <div class="container">
    <button
      class="button button-primary"
      @click="handleRemoveBackground"
    >
      Mudar Origem
    </button>
    <div class="card">
      <h1 class="title">
        {{ background.name }}
      </h1>
      <div class="divider" />
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
  </div>
</template>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
}
.button {
  display: block;
  margin-left: auto;
  margin-bottom: 2rem;
}
.card {
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-dark-gray);
}
.title {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: .75rem;
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
</style>