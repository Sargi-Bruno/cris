<script setup lang="ts">
import { PropType } from 'vue'
import { Ammunition } from '../types'

defineProps({
  ammunition: {
    type: Object as PropType<Ammunition>,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="header">
      <div class="title">
        <h3>{{ ammunition.name }}</h3>
      </div>
      <div class="item-info-container">
        <div class="item-info">
          <h3>Categoria: <span>{{ ammunition.category }}</span></h3>
        </div>
        <div class="item-info">
          <h3>Espaços: <span>{{ ammunition.slots }}</span></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: var(--color-smoky-black);
  margin-top: 1rem;
}
.header {
  padding: .5rem;
}
.title h3 {
  margin: 0;
  font-size: 14px;
  margin-left: .75rem;
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
</style>