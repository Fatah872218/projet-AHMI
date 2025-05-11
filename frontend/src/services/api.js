import axios from 'axios'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    'http://localhost:3000/api',
  withCredentials: true, //  cookies
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // gestion globale déconnexion, redirection
    }
    return Promise.reject(error)
  }
)

export default api
