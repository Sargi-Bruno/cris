import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agente',
      name: 'character-creation',
      component: () => import('../views/character-creation/CharacterCreation.vue')
    },
    {
      path: '/ficha',
      name: 'character-sheet',
      component: () => import('../views/character-sheet/CharacterSheet.vue')
    },
    {
      path: '/contato',
      name: 'contact',
      component: () => import('../views/contact/ContactView.vue')
    },
  ]
})

export default router
