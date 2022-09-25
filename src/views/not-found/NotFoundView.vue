<template>
  <div class="not-found-container">
    <h1>Página Não Encontrada</h1>
    <h2>A membrana aqui esta fina demais, é melhor voltar!</h2>
    <button 
      class="button-primary"
      @click="$router.push({ name: 'home' })"
    >
      VOLTAR
    </button>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12rem;
}
.not-found-container h1 {
  margin-bottom: 1rem;
}
.not-found-container h2 {
  margin-top: 0;
  font-weight: normal;
}
</style>