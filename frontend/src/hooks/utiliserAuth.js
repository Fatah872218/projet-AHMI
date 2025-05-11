// Hook pour gérer l'état d'authentification.
// src/hooks/utiliserAuth.js
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth' // ou '@/stores/utilisateur' selon ton store

export default function useAuth() {
  const authStore = useAuthStore()

  // user.value contiendra l'objet { id, nom, email, ... }
  const user = computed(() => authStore.user)

  // booléen pour savoir si on est connecté
  const isAuthenticated = computed(() => !!authStore.user)

  // éventuellement d’autres helpers, par ex. un logout
  function logout() {
    authStore.logout()
  }

  return {
    user,
    isAuthenticated,
    logout,
  }
}
