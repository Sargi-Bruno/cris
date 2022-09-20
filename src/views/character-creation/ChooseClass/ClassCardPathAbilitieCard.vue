<script setup lang="ts">
import { PropType, ref } from 'vue'
import { Power } from '../../../types'
import DividerView from '../../../components/DividerView.vue'

defineProps({
  abilitie: {
    type: Object as PropType<Power>,
    required: true
  }
})

const showMore = ref(false)
</script>

<template>
  <div class="card-gray">
    <div
      class="header"
      @click="showMore = !showMore"
    >
      <button 
        class="show-more"
        :class="{ rotate: showMore }"
        @click.stop="showMore = !showMore"
      >
        <img src="../../../assets/show-more-icon.svg" alt="ver mais">
      </button>
      <h3 class="title">
        {{ abilitie.name }}
      </h3>
    </div>
    <Transition name="card" mode="out-in">
      <div v-if="showMore">
        <DividerView />
        <div class="content">
          <div v-html="abilitie.description" />
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
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  border: none;
}
.show-more img {
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
.content {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-bottom: .1rem;
}
</style>