<script setup lang="ts">
defineProps({
  noMargin: Boolean
})
</script>

<template>
  <div :class="{ noMargin: noMargin, divider: !noMargin }" />
</template>

<style scoped>
.noMargin {
  border-bottom: 1px solid var(--color-primary);
}
.divider {
  margin-left: .5rem;
  margin-right: .5rem;
  border-bottom: 1px solid var(--color-primary);
}
</style>