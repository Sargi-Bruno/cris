<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})

defineEmits(['handleCancel', 'handleConfirm'])
</script>

<template>
  <div class="delete-container">
    <div class="delete-wrapper">
      <div class="delete-content">
        <h1>Deletar <b>{{ name }}</b>?</h1>
        <h2>Atenção: essa operação é permanente e irreversível!</h2>
        <div class="buttons-container">
          <button 
            class="button-remove delete-confirm"
            @click="$emit('handleConfirm')"
          >
            Confirmar
          </button>
          <button 
            class="button-primary delete-cancel"
            @click="$emit('handleCancel')"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete-container {
  background-color: var(--color-smoky-black);
  margin-left: 2rem;
  margin-right: 2rem;
  height: 18rem;
  text-align: center;
  margin-top: 2rem;
  border-radius: 4px;
}
.delete-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-content h1 {
  margin: 0;
  font-size: 28px;
}
.delete-content h1 b {
  color: var(--color-primary);
}
.delete-content h2 {
  margin-top: 0;
  margin-bottom: 3rem;
  font-size: 14px;
  color: var(--color-red);
}
.buttons-container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
}
.delete-cancel {
  width: 8rem;
  height: 2.5rem;
}
.delete-confirm {
  color: var(--color-white);
}
.delete-confirm:hover {
  color: var(--color-red);
}
</style>