<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
</script>

<template>
  <HeaderView />
  <div class="main-content">
    <router-view />
  </div>
</template>