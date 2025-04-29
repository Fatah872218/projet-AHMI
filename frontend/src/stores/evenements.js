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
        const response = await axios.get('/api/evenements')

        console.log('Événements reçus :', response.data) // ✅ ici, response existe bien

        if (Array.isArray(response.data)) {
          this.evenements = response.data
        } else if (Array.isArray(response.data.data)) {
          this.evenements = response.data.data
        } else {
          console.error('Format inattendu des événements :', response.data)
          this.evenements = []
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements :', error)
      }
    },
  },
})
