// Module pour gérer l'état d'authentification.
// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import serviceAuth from '@/services/serviceAuth'
import { useUtilisateurStore } from '@/stores/utilisateur'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const utilisateur = ref(null)
  const loading = ref(false)
  const erreur = ref(null)

  const login = async (credentials) => {
    loading.value = true
    erreur.value = null

    try {
      const response = await serviceAuth.login(credentials)
      token.value = response.data.token
      utilisateur.value = response.data.utilisateur

      // Stockage dans un autre store si tu veux synchroniser
      const utilisateurStore = useUtilisateurStore()
      utilisateurStore.setUtilisateur(utilisateur.value)

      // Tu peux aussi stocker dans localStorage si tu veux persister
      localStorage.setItem('token', token.value)
    } catch (err) {
      erreur.value = err.response?.data?.message || 'Erreur de connexion'
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    utilisateur.value = null
    localStorage.removeItem('token')
  }

  const forgotPassword = async (email) => {
    return await serviceAuth.forgotPassword(email)
  }

  const resetPassword = async (tokenReset, newPassword) => {
    return await serviceAuth.resetPassword(tokenReset, newPassword)
  }

  return {
    token,
    utilisateur,
    loading,
    erreur,
    login,
    logout,
    forgotPassword,
    resetPassword,
  }
})
