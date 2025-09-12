// src/services/api.js
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // si tu utilises cookies httpOnly
  timeout: 10000,
})

// ---------- Request interceptor : injecter le token ----------
api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})

// ---------- Response interceptor : 401 / 403 centralisés ----------
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status ?? 0

    if (status === 401) {
      // session expirée ou token invalide
      localStorage.removeItem('token')
      // éviter de garder un vieux header en mémoire
      delete api.defaults.headers.common.Authorization

      const current = router.currentRoute.value
      const redirect = encodeURIComponent(current.fullPath)
      router.push(`/connexion?redirect=${redirect}`)
    }

    if (status === 403) {
      // refus d’accès : retour vers un espace sûr
      router.push('/403') // page dédiée
    }

    return Promise.reject(err)
  }
)

export default api

// Helper pour tester côté appels ou toasts
export const isAbortedRequest = (err) =>
  err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError'
