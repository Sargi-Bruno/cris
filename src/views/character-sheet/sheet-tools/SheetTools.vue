<script setup lang="ts">
defineProps({
  disabledSheet: Boolean,
  charAdded: Boolean
})

const emit = defineEmits(['handleShareSheet', 'handleAddAgent'])

const handleShareSheet = () => {
  emit('handleShareSheet')
}

const handleAddAgent = () => {
  emit('handleAddAgent')
}
</script>

<template>
  <div class="sheet-tools-container">
    <div v-if="disabledSheet">
      <div v-if="charAdded" class="added-info">
        Agente adicionado a sua coleção!
      </div>
      <div v-else>
        <button 
          class="button-naked share-button"
          @click="handleAddAgent"
        >
          <img src="../../../assets/add-person-icon.png" alt="adicionar">
          Adicionar agente à minha coleção
        </button>
      </div>
    </div>
    <div v-else>
      <button 
        class="button-naked share-button"
        @click="handleShareSheet"
      >
        <img src="../../../assets/share-icon.png" alt="compartilhar">
        Compartilhar
      </button>
    </div>
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
  gap: 0.5rem;
  min-width: 8rem;
}
.share-button img {
  height: 1.25rem;
}
.added-info {
  color: var(--color-white);
  font-size: 14px;
  margin-left: .75rem;
  margin-bottom: .5rem;
}
</style>