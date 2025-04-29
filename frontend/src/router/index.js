import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'

const routes = [
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
  {
    path: '/events',
    name: 'events',
    component: EventsList,
  },
  {
    path: '/evenement/:id',
    name: 'eventDetails',
    component: EventDetails,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
