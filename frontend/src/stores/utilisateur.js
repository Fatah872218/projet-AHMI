// Module pour gérer l'état des informations utilisateur.
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUtilisateurStore = defineStore('utilisateur', () => {
  const utilisateur = ref(null)

  const setUtilisateur = (data) => {
    utilisateur.value = data
  }
  const isLoggedIn = computed(() => !!localStorage.getItem('token'))
  const role = computed(() => utilisateur.value?.role?.toLowerCase?.() || 'user')

  return {
    utilisateur,
    setUtilisateur,
    isLoggedIn,
    role,
  }
})
