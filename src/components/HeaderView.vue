<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()
const isLoggedIn = ref(false)
const disabledAgentsButton = ref(true)

const handleSignIn = () => {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
}

const handleLogout = () => {
  signOut(auth)
  router.push({ name: 'home' })
}

const handleAlternativeSignIn = (route: string) => {
  if(disabledAgentsButton.value) return

  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then(() => {
      router.push({ name: route })
    })
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) isLoggedIn.value = true
    else isLoggedIn.value = false

    disabledAgentsButton.value = false
  })
})
</script>

<template>
  <div class="header">
    <div class="header-content">
      <div 
        class="logo"
        @click="$router.push({ name: 'home' })"
      >
        <h1>C.R.I.S.</h1>
      </div>
      <div class="nav-container">
        <router-link :to="{ name: 'home' }">
          Início
        </router-link>
        <router-link 
          v-if="isLoggedIn"
          :to="{ name: 'character-list' }"
        >
          Agentes
        </router-link>
        <h3 
          v-else
          class="agents-login"
          @click="handleAlternativeSignIn('character-list')"
        >
          Agentes
        </h3>
        <router-link 
          v-if="isLoggedIn"
          :to="{ name: 'campaigns-list' }"
        >
          Campanhas
        </router-link>
        <h3 
          v-else
          class="agents-login"
          @click="handleAlternativeSignIn('campaigns-list')"
        >
          Campanhas
        </h3>
        <router-link :to="{ name: 'contact' }">
          Créditos
        </router-link>
        <a href="https://jamboeditora.com.br" target="_blank">
          <h3 class="agents-login">
            Comprar Ordem Paranormal
          </h3>
        </a>
      </div>
      <div v-if="!isLoggedIn">
        <button 
          class="login-button"
          @click="handleSignIn"
        >
          LOGIN
        </button>
      </div>
      <div v-else>
        <h3 class="user-name">
          {{ auth.currentUser?.displayName?.split(" ")[0] }}
        </h3>
        <button 
          class="login-button"
          @click="handleLogout"
        >
          LOGOUT
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
  margin-left: 1rem;
  color: var(--color-primary);
  cursor: pointer;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  width: 60%;
}
.nav-container a {
  color: var(--color-white);
  text-decoration: none;
  font-size: 20px;
}
.nav-container a:hover {
  color: var(--color-primary);
}
.agents-login {
  color: var(--color-white);
  margin: 0;
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
}
.agents-login:hover {
  color: var(--color-primary);
}
.login-button {
  width: 4rem;
  margin-right: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-white);
}
.login-button:hover {
  color: var(--color-primary);
}
.user-name {
  margin: 0;
  font-size: 12px;
  margin-left: .5rem;
}
</style>