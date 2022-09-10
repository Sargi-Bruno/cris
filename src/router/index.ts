import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    }
  ]
})

export default router
