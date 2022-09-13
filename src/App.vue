<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <HeaderView />
  <div class="main-content">
    <RouterView />
  </div>
</template>
