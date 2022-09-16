<script setup lang="ts">
interface TabOptions {
  label: string,
  value: number
}

defineProps({
  currentTab: {
    type: Number,
    required: true
  },
  tabOptions: {
    type: Array<TabOptions>,
    required: true
  }
})

defineEmits(['handleNavigation'])
</script>

<template>
  <div class="tab-nav-container">
    <button 
      v-for="tab in tabOptions" 
      :key="tab.value"
      class="tab"
      :class="{ active: tab.value === currentTab }"
      @click="$emit('handleNavigation', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tab-nav-container {
  display: flex;
  gap: 1.5rem;
}
.tab {
  background-color: transparent;
  font-size: 14px;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-off-white);
  cursor: pointer;
}
.active {
  color: var(--color-white);
  border-bottom: 2px solid var(--color-primary);
}
</style>