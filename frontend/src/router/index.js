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
  //const _user = utilisateurStore.utilisateur
  const hasToken = !!localStorage.getItem('token')
  const isLoggedIn = utilisateurStore.isLoggedIn

  if (to.meta?.requiresAdmin && to.meta?.role !== 'admin') {
    return next('/account')
  }
  if (to.meta?.requiresAuth && !hasToken && !isLoggedIn) {
    return next(`/connexion?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  next()
})

export default router
