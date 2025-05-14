// src/hooks/utiliserAuth.js
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default function useAuth() {
  const authStore = useAuthStore()
  const { utilisateur } = storeToRefs(authStore)

  const isAuthenticated = computed(() => !!utilisateur.value)

  function logout() {
    authStore.deconnexion() // nom correct de ta fonction dans auth.js
  }

  return {
    user: utilisateur, // ✅ le bon objet réactif (avec rôle)
    isAuthenticated,
    logout,
  }
}
