// frontend/src/utils/useApi.js
import { useToast } from 'vue-toastification'

export const useApi = () => {
  const toast = useToast()

  const safeCall = async (fn, fallback = null) => {
    try {
      const res = await fn()
      return res
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erreur lors de la requête API'
      toast.error(msg)
      return fallback
    }
  }

  return { safeCall }
}
