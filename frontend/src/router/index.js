import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import AccountView from '@/views/AccountView.vue'
import PartenaireEventForm from '@/views/PartenaireEventForm.vue'
import { useUtilisateurStore } from '@/stores/utilisateur'

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
  // Routes partenaires
  {
    path: '/partenaires',
    name: 'partenairesCreate',
    component: () => import('@/views/PartenaireEventForm.vue'),
  },
  {
    path: '/partenaires/:id',
    name: 'partenairesEdit',
    component: () => import('@/views/PartenaireEventForm.vue'),
    props: true,
  },
  // MON COMPTE
  {
    path: '/account',
    name: 'account',
    component: AccountView,
  },
  {
    path: '/account/proposer-evenement',
    name: 'proposer-evenement',
    component: PartenaireEventForm,
  },
  {
    path: '/evenement/:id/admin',
    name: 'EventDetailsAdmin',
    component: () => import('@/views/EventDetailsAdmin.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: () => import('@/views/AdminCategories.vue'),
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const utilisateurStore = useUtilisateurStore()
//   const user = utilisateurStore.utilisateur

//   if (to.meta.requiresAdmin && user?.role !== 'admin') {
//     return next('/account')
//   }

//   next()
// })

export default router
