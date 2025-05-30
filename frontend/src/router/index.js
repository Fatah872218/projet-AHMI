import { createRouter, createWebHistory } from 'vue-router'

import publicRoutes from './routes/publicRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'

import { useUtilisateurStore } from '@/stores/utilisateur'

const routes = [
  ...publicRoutes,
  ...userRoutes,
  ...adminRoutes,

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, from, next) => {
  const utilisateurStore = useUtilisateurStore()
  const user = utilisateurStore.utilisateur

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/account')
  }

  if (to.meta.requiresAuth && !user) {
    return next('/connexion') // ou la page de login
  }

  next()
})

export default router
