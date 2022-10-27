<script setup lang="ts">
const emit = defineEmits(['handleShareSheet'])

const handleShareSheet = () => {
  emit('handleShareSheet')
}
</script>

<template>
  <div class="sheet-tools-container">
    <button 
      class="button-naked share-button"
      @click="handleShareSheet"
    >
      <img src="../../../assets/share-icon.png" alt="compartilhar">
      Compartilhar
    </button>
  </div>
</template>

<style scoped>
.sheet-tools-container {
  display: flex;
}
.share-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 8rem;
}
.share-button img {
  height: 1.25rem;
}
</style>