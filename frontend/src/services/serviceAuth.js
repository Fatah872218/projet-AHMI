// Service pour les appels API liés à l'authentification.
// Exemples à ajouter dans serviceAuth.js
async function forgotPassword(email) {
  return api.post('/auth/forgot-password', { email })
}

async function resetPassword(token, newPassword) {
  return api.post(`/auth/reset-password/${token}`, { password: newPassword })
}
