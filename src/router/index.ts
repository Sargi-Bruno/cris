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
      path: '/campanhas',
      name: 'campaigns-list',
      component: () => import('../views/campaigns/campaigns-list/CampaignsList.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/criar-campanha',
      name: 'campaign-create',
      component: () => import('../views/campaigns/campaign-create-edit/CampaignCreate.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editar-campanha/:id',
      name: 'campaign-edit',
      component: () => import('../views/campaigns/campaign-create-edit/CampaignEdit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/campanha/:id',
      name: 'campaign-page',
      component: () => import('../views/campaigns/campaign-page/CampaignPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/campanha/entrar/:id',
      name: 'campaign-join',
      component: () => import('../views/campaigns/campaign-join/CampaignJoin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/escudo-do-mestre/:id',
      name: 'master-screen',
      component: () => import('../views/master-screen/MasterScreen.vue'),
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
      path: '/:catchAll(.*)*',
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
