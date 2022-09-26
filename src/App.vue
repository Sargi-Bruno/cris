<script setup lang="ts">
import { ref } from 'vue'
import HeaderView from './components/HeaderView.vue'
import MobileView from './views/home/MobileView.vue'

const mobile = ref(window.innerWidth <= 760)
</script>

<template>
  <div v-if="mobile">
    <MobileView
      @handle-disable-mobile="mobile = false"
    />
  </div>
  <div v-else>
    <HeaderView />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>