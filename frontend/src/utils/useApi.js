// frontend/src/utils/useApi.js
import { useToast } from 'vue-toastification'

export const useApi = () => {
  const toast = useToast()

  const safeCall = async (fn, fallback = null) => {
    try {
      const res = await fn()
      return { success: true, data: res }
    } catch (e) {
      const msg = e?.response?.data?.message || 'Erreur lors de la requête API'
      toast.error(msg)

      let detailedErrors = null
      if (e?.response?.data?.erreurs) {
        detailedErrors = e.response.data.erreurs
      }

      return { success: false, data: fallback, errorMessage: msg, detailedErrors }
    }
  }

  return { safeCall }
}
