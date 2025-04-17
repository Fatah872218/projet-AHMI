// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  connecterUtilisateur,
  deconnecterUtilisateur,
  demanderReinitialisationMotDePasse,
  reinitialiserMotDePasse,
} from '@/services/serviceAuth'
import { useUtilisateurStore } from '@/stores/utilisateur'

export const useAuthStore = defineStore('auth', () => {
  const jeton = ref(null)
  const utilisateur = ref(null)
  const chargement = ref(false)
  const erreur = ref(null)

  const connexion = async (identifiants) => {
    chargement.value = true
    erreur.value = null

    try {
      const reponse = await connecterUtilisateur(identifiants)
      jeton.value = reponse.data.token
      utilisateur.value = reponse.data.utilisateur

      const utilisateurStore = useUtilisateurStore()
      utilisateurStore.setUtilisateur(utilisateur.value)

      localStorage.setItem('token', jeton.value)
    } catch (err) {
      erreur.value = err.response?.data?.message || 'Erreur de connexion'
    } finally {
      chargement.value = false
    }
  }

  const deconnexion = () => {
    jeton.value = null
    utilisateur.value = null
    localStorage.removeItem('token')
  }

  const motDePasseOublie = async (email) => {
    return await demanderReinitialisationMotDePasse(email)
  }

  const reinitialiser = async (tokenReset, nouveauMotDePasse) => {
    return await reinitialiserMotDePasse(tokenReset, nouveauMotDePasse)
  }

  return {
    jeton,
    utilisateur,
    chargement,
    erreur,
    connexion,
    deconnexion,
    motDePasseOublie,
    reinitialiser,
  }
})
