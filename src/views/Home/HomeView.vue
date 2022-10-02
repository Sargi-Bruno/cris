<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Character } from '../../types';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'

const auth = getAuth()
const router = useRouter()
const isLoggedIn = ref(false)
const firestore = getFirestore()
const loading = ref(true)

const handleSignIn = () => {
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then(async() => {
      const docs: Character[] = []

      const charsCollection = collection(firestore, 'characters')
      const charsRef = query(charsCollection, where('uid', '==', auth.currentUser?.uid))

      const querySnapshot = await getDocs(charsRef)

      querySnapshot.docs.forEach((doc) => {
        const data: Character = doc.data() as Character
        data.id = doc.id

        docs.push(data)
      })

      if(docs.length > 0) router.push({ name: 'character-list' })
      else router.push({ name: 'character-creation' })
    })
}

const handleEnter = () => {
  if(loading.value) return
  if(isLoggedIn.value) router.push({ name: 'character-list' })
  else handleSignIn()
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) isLoggedIn.value = true
    else isLoggedIn.value = false
    loading.value = false
  })
})
</script>

<template>
  <div class="home-container">
    <div class="fisrt content-block">
      <div class="first-block">
        <h1>Plataforma não oficial de <b>Ordem Paranormal</b> para criar e utilizar fichas digitais</h1>
      </div>
      <div class="second-block">
        <button 
          class="home-button button-primary"
          @click="handleEnter"
        >
          ENTRAR
        </button>
      </div>
    </div>
    <div class="divider" />
    <div class="content-block">
      <div class="topics">
        <h1>Este site foi feito para ser utilizado em conjunto com o livro Ordem Paranormal</h1>
        <h2>Criação de ficha</h2>
        <h2>Rolagens de dados</h2>
        <h2>Acesso fácil a informações</h2>
      </div>
    </div>
    <div class="divider" />
    <div class="content-block">
      <div>
        <h2 class="info">
          Esta plataforma ainda esta em desenvolvimento, por isso bugs ou problemas podem ser esperados
        </h2>
        <h2 class="info">
          Novas funcionalidades estão por vir, caso queira saber mais acesse nosso <a href="https://discord.gg/ShrayAdvDJ" target="_blank">discord</a>
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 65%;
  margin: 0 auto;
  margin-top: 2rem;
}
.home-container h1, h2 {
  font-weight: normal;
}
.content-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.fisrt {
  justify-content: center;
}
.first-block {
  width: 21.5rem;
  margin-right: 8rem;
}
.topics {
  width: 48rem;
}
.topics h1 {
  font-size: 22px;
}
.topics h2 {
  font-size: 18px;
  color: var(--color-off-white);
}
.divider {
  width: 100%;
  border-top: 1px solid var(--color-dark-gray);
}
.info {
  font-size: 16px;
  color: var(--color-off-white);
  margin: 0;
}
.home-button {
  width: 6rem;
  height: 3rem;
  font-size: 16px;
}
.info a {
  color: var(--color-white);
}
</style>