// src/stores/evenements.js
import { defineStore } from 'pinia'
import { getEventById, getAllEvents } from '@/services/eventService'

export const useEvenementsStore = defineStore('evenements', {
  state: () => ({
    evenements: [],
    // Nouveaux états pour le détail d'un événement
    currentEvent: null,
    loadingEvent: false,
    errorEvent: null,
  }),
  getters: {
    allEvenements: (state) => state.evenements,
    evenementActuel: (state) => state.currentEvent,
    isLoadingEvent: (state) => state.loadingEvent,
    errorEventMsg: (state) => state.errorEvent,
    evenementsApprouvesValides: (state) => {
      const now = new Date()
      return state.allEvenements.filter(
        (event) => event.statut === 'approuve' && (!event.dateFin || new Date(event.dateFin) > now)
      )
    },
  },

  actions: {
    // Récupération de la liste via service
    async fetchEvenements() {
      try {
        const response = await getAllEvents()
        console.log('Événements reçus :', response.data)

        if (Array.isArray(response.data)) {
          this.evenements = response.data
        } else if (response.data && Array.isArray(response.data.data)) {
          this.evenements = response.data.data
        } else {
          console.warn('Format inattendu des événements :', response.data)
          this.evenements = []
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements :', error)
        this.evenements = []
      }
    },

    // Récupération d'un seul événement
    async fetchEvenementById(id) {
      this.loadingEvent = true
      this.errorEvent = null
      try {
        const res = await getEventById(id)
        this.currentEvent = res.data.data || res.data
      } catch (error) {
        console.error("Erreur lors du chargement de l'événement :", error)
        this.errorEvent = "Impossible de charger l'événement."
      } finally {
        this.loadingEvent = false
      }
    },

    // Nettoyage de l'état de l'événement courant
    clearCurrentEvent() {
      this.currentEvent = null
      this.errorEvent = null
      this.loadingEvent = false
    },
    updateEvenementLocal(id, data) {
      const index = this.allEvenements.findIndex((e) => e._id === id)
      if (index !== -1) {
        this.allEvenements[index] = { ...this.allEvenements[index], ...data }
      }
    },
  },
})
