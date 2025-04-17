import api from '@/services/api'

// ➤ Inscription d’un utilisateur
export const inscrireUtilisateur = (data) => {
  return api.post('/auth/inscription', data)
}

// ➤ Connexion
export async function connecterUtilisateur(identifiants) {
  return api.post('/auth/login', identifiants)
}

// ➤ Déconnexion (si applicable)
export async function deconnecterUtilisateur() {
  return api.post('/auth/logout')
}

// ➤ Mot de passe oublié
export async function demanderReinitialisationMotDePasse(email) {
  return api.post('/auth/forgot-password', { email })
}

// ➤ Réinitialisation du mot de passe
export async function reinitialiserMotDePasse(token, nouveauMotDePasse) {
  return api.post(`/auth/reset-password/${token}`, {
    password: nouveauMotDePasse,
  })
}
