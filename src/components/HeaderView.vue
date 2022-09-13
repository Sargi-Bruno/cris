<template>
  <div class="header">
    <div class="header-content">
      <div class="logo">
        <h1>C.R.I.S.</h1>
      </div>
      <div class="nav-container">
        <router-link :to="{ name: 'home' }">
          Início
        </router-link>
        <router-link :to="{ name: 'character-creation' }">
          Agentes
        </router-link>
        <router-link :to="{ name: 'contact' }">
          Contato
        </router-link>
      </div>
      <div>
        <button class="button-primary login-button">
          LOGIN
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 4rem;
  background-color: var(--color-dark-gray);
  border-bottom: 1px solid var(--color-primary);
}
.header-content {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo h1 {
  margin: 0;
  color: var(--color-primary);
}
.nav-container {
  display: flex;
  justify-content: space-between;
  width: 25%;
}
.nav-container a {
  color: var(--color-white);
  text-decoration: none;
  font-size: 20px;
}
.nav-container a:hover {
  color: var(--color-primary);
}
.login-button {
  width: 4rem;
}
</style>