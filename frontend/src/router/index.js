import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('@/views/FormulaireInscription.vue'),
    },

    {
      path: '/mot-de-passe-oublie',
      name: 'MotDePasseOublie',
      component: () => import('@/views/vueMotDePasseOublie.vue'),
    },
    {
      path: '/reinitialisation-mot-de-passe/:token',
      name: 'ReinitialisationMotDePasse',
      component: () => import('@/views/VueReinitialisationMotDePasse.vue'),
    },
  ],
})

export default router
