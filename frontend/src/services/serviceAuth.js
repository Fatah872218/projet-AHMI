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

export const motDePasseOublie = (data) => api.post('/auth/mot-de-passe-oublie', data)

// ➤ Mot de passe oublié
<<<<<<< HEAD
export const demanderReinitialisationMotDePasse = (email) => {
  console.log('POST /auth/mot-de-passe-oublie payload =', { email })
  return api.post('/auth/mot-de-passe-oublie', { email })
}

// ➤ Réinitialisation du mot de passe
export const reinitialiserMotDePasse = (token, motDePasse, confirmationMotDePasse) =>
  api.post(`/auth/reinitialiser/${token}`, { motDePasse, confirmationMotDePasse })
=======
export const demanderReinitialisationMotDePasse = (email) =>
  api.post('/auth/mot-de-passe-oublie', { email })

// ➤ Réinitialisation du mot de passe
export const reinitialiserMotDePasse = (token, motDePasse) =>
  api.post(`/auth/reinitialiser/${token}`, { motDePasse })
>>>>>>> feature/events-booking

// activation du compte
export async function activerCompte(code) {
  return api.get(`/auth/activation/${code}`) // api = instance Axios déjà configurée
}
