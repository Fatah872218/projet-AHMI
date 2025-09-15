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
  const isLoggedIn = hasToken && !!(utilisateurStore?.role || utilisateurStore?.utilisateur?.id)
  //const isLoggedIn = utilisateurStore.isLoggedIn

  // Besoin d’auth ?
  if (to.meta?.requiresAuth && !isLoggedIn) {
    return next(`/connexion?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // Besoin d’être admin ?
  if (to.meta?.requiresAdmin) {
    // on tolère l’accès visuel si token présent, mais on vérifie le rôle connu en front
    // (la vraie protection reste au back)
    if (!hasToken) {
      return next(`/connexion?redirect=${encodeURIComponent(to.fullPath)}`)
    }
    if (utilisateurStore.role !== 'admin') {
      return next('/account') // ou page 403
    }
  }
  next()
})

export default router
