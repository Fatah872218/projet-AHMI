import api from '@/services/api'

// ➤ Inscription d’un utilisateur
//export const inscrireUtilisateur = (data) => {
// return api.post('/auth/inscription', data)
//}
export const inscription = (data) => api.post('/auth/inscription', data)

// ➤ Connexion

export const connexion = (data) => api.post('/auth/connexion', data)

// ➤ Déconnexion
export const deconnecterUtilisateur = () => api.post('/auth/deconnexion')

// ➤ Mot de passe oublié
export const demanderReinitialisationMotDePasse = (email) =>
  api.post('/auth/mot-de-passe-oublie', { email })

// ➤ Réinitialisation du mot de passe
export const reinitialiserMotDePasse = (token, motDePasse) =>
  api.post(`/auth/reinitialiser/${token}`, { motDePasse })
