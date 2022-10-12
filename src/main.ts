import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vfmPlugin from 'vue-final-modal'
import PrimeVue from 'primevue/config'
import Editor from 'primevue/editor'
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyADXkE6U5j_hlSRxK3nfqyylmPXgUeGWsQ",
  authDomain: "cris-ordem-paranormal.firebaseapp.com",
  projectId: "cris-ordem-paranormal",
  storageBucket: "cris-ordem-paranormal.appspot.com",
  messagingSenderId: "713229784986",
  appId: "1:713229784986:web:8096a40ec5021bbbf18c23",
  measurementId: "G-XCBC726H4S"
}

initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebase)

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(vfmPlugin)

app.component('PEditor', Editor)

app.mount('#app')
