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
  },
  secondary: Boolean
})

defineEmits(['handleNavigation'])
</script>

<template>
  <div
    v-if="!secondary"
    class="tab-nav-container"
  >
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
  <div
    v-else
    class="tab-nav-container-secondary"
  >
    <button 
      v-for="tab in tabOptions" 
      :key="tab.value"
      class="tab-secondary"
      :class="{ 'tab-secondary-active': tab.value === currentTab }"
      @click="$emit('handleNavigation', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tab-nav-container {
  display: flex;
  gap: 1rem;
}
.tab-nav-container-secondary {
  display: flex;
  gap: .5rem;
}
.tab {
  background-color: transparent;
  font-size: 14px;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-off-white);
  cursor: pointer;
}
.tab-secondary {
  background-color: var(--color-smoky-black);
  font-size: 11px;
  height: 1.75rem;
  padding-left: .5rem;
  padding-right: .5rem;
  border: none;
  border-radius: 8px;
  color: var(--color-white);
  cursor: pointer;
}
.tab-secondary-active {
  background-color: var(--color-smoky-black);
  color: var(--color-primary);
}
.active {
  color: var(--color-white);
  border-bottom: 2px solid var(--color-primary);
}
</style>