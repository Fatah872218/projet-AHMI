// Module pour gérer l'état des informations utilisateur.
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilisateurStore = defineStore('utilisateur', () => {
  const utilisateur = ref(null)

  const setUtilisateur = (data) => {
    utilisateur.value = data
  }

  return {
    utilisateur,
    setUtilisateur,
  }
})
