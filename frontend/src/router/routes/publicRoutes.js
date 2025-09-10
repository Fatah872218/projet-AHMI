// src/router/routes/publicRoutes.js
import VueConnexion from '@/views/VueConnexion.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: () => import('@/views/FormulaireInscription.vue'),
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: VueConnexion,
  },
  {
    path: '/mot-de-passe-oublie',
    name: 'MotDePasseOublie',
    component: () => import('@/views/vueMotDePasseOublie.vue'),
  },

  // ✅ Variante 1 : token en query → .../reinitialiser-mot-de-passe?token=xxx
  {
    path: '/reinitialiser-mot-de-passe',
    name: 'resetPasswordQuery',
    component: () => import('@/views/VueReinitialisationMotDePasse.vue'),
  },

  // ✅ Variante 2 : token en param → .../reinitialiser-mot-de-passe/xxx
  {
    path: '/reinitialiser-mot-de-passe/:token',
    name: 'resetPasswordParam',
    component: () => import('@/views/VueReinitialisationMotDePasse.vue'),
    props: true,
  },

  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventList.vue'),
  },
  {
    path: '/evenement/:id',
    name: 'eventDetails',
    component: () => import('@/views/EventDetails.vue'),
  },
  {
    path: '/activation/:code',
    name: 'Activation',
    component: () => import('@/views/ActivationView.vue'),
  },
  {
    path: '/403',
    name: 'ForbiddenPage',
    component: () => import('@/views/ForbiddenPage.vue'),
  },
]
