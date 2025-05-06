import '@/assets/main.css'
import './assets/styles/design-variables.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
console.log('➡️ BACKEND_URL =', import.meta.env.VITE_BACKEND_URL)
