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
  {
    path: '/reinitialisation-mot-de-passe/:token',
    name: 'ReinitialisationMotDePasse',
    component: () => import('@/views/VueReinitialisationMotDePasse.vue'),
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
]
