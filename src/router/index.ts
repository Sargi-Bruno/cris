import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agentes',
      name: 'character-list',
      component: () => import('../views/character-list/CharacterList.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/novo-agente',
      name: 'character-creation',
      component: () => import('../views/character-creation/CharacterCreation.vue')
    },
    {
      path: '/agente/:id',
      name: 'character-sheet',
      component: () => import('../views/character-sheet/CharacterSheet.vue'),
      props: true
    },
    {
      path: '/creditos-e-contato',
      name: 'contact',
      component: () => import('../views/contact/ContactView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/not-found/NotFoundView.vue')
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      next({name: 'home'})
    }
  } else {
    next()
  }
})

export default router
