<script setup lang="ts">
defineEmits(['handleDisableMobile'])
</script>

<template>
  <div class="mobile-container">
    <h1>C.R.I.S.</h1>
    <h3>Plataforma não oficial de <b>Ordem Paranormal</b> para criar e utilizar fichas digitais</h3>
    <div class="info-container">
      <h2>A versão mobile deste aplicativo ainda esta em construção</h2>
      <h2 class="sub-info">
        É recomendado acessar via desktop para utilizar a plataforma
      </h2>
      <button 
        class="button-primary"
        @click="$emit('handleDisableMobile')"
      >
        Desejo continuar mesmo assim
      </button>
    </div>
  </div>
</template>

<style scoped>
.mobile-container {
  margin-top: 2.5rem;
  padding: 1rem;
}
.mobile-container h1 {
  color: var(--color-primary);
  margin: 0;
}
.mobile-container h3 {
  font-weight: normal;
  margin: 0;
  font-size: 14px;
}
.info-container {
  width: 80%;
  margin: 0 auto;
  margin-top: 5rem;
}
.sub-info {
  font-size: 20px;
  font-weight: normal;
}
.info-container button {
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>