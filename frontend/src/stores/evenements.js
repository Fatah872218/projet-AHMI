// src/stores/evenements.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useEvenementsStore = defineStore('evenements', {
  state: () => ({
    evenements: [],
  }),
  getters: {
    allEvenements: (state) => state.evenements,
  },
  actions: {
    async fetchEvenements() {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/evenements')

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
        this.evenements = [] // ⚠️ sécurité : on vide si erreur
      }
    },
  },
})
