import axios from 'axios'
import router from '@/router'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, //  cookies hhtpOnly
  timeout: 10000,
})
const savedToken = localStorage.getItem('token')
if (savedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${savedToken}`
}
const toast = useToast()
const status = error.response?.status ?? 0
if (status === 401) {
  toast.info('Session expirée, veuillez vous reconnecter.')
  logoutAndRedirect()
} else if (status === 403) {
  router.push('/account') // ou une page "Accès refusé"
}

function logoutAndRedirect() {
  localStorage.removeItem('token')
  delete api.defaults.headers.common.Authorization
  const current = router.currentRoute.value
  // on garde la route courante pour revenir après login
  const redirect = encodeURIComponent(current.fullPath)
  router.push(`/connexion?redirect=${redirect}`)
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      logoutAndRedirect()
    } else if (status === 403) {
      // Accès interdit : renvoyer vers un écran sûr (ex: compte ou accueil)
      router.push('/account') // ou '/'
    }
    return Promise.reject(error)
  }
)

export default api
