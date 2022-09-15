<template>
  <h1>Bem vindo agente!</h1>
  <button 
    class="button-primary"
    @click="$router.push({ name: 'character-creation' })"
  >
    ENTRAR
  </button>
</template>