````
# projet-AHMI – Frontend

Ce dossier contient l’interface utilisateur du projet **AHMI**, développée avec Vue 3, Vite, et TailwindCSS.

---

## ⚙️ Lancer le projet localement

```bash
npm install
npm run dev
````

Le projet sera disponible à l’adresse : http://localhost:5173

🧭 Structure des fichiers

/frontend
├── /views
│ ├── Home.vue
│ ├── Events.vue
│ ├── EventDetails.vue
│ ├── Login.vue
│ ├── Register.vue
│ ├── Dashboard.vue
│ ├── Profile.vue
│ ├── Contact.vue
│ ├── Donate.vue
│ ├── Subscribe.vue
│ └── PartnerForm.vue
├── /components
│ ├── Navbar.vue
│ ├── EventCard.vue
│ ├── PartnerCard.vue
│ └── MessageForm.vue
├── /router
│ └── index.js
├── /store
│ ├── authStore.js
│ └── userStore.js
├── /services
│ └── api.js
└── App.vue

Configuration Axios

import axios from 'axios'

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL,
withCredentials: true
})

🔐 Gestion de l'authentification

Pinia stocke les tokens / infos utilisateur

Axios intercepte les réponses expirées et rafraîchit les tokens

Redirection automatique vers /login si l'utilisateur est déconnecté

🌍 Variables d’environnement

Créer un fichier .env à la racine du frontend :

VITE_API_URL=http://localhost:5000

🚀 Déploiement sur Vercel

Pousser le repo sur GitHub

Connecter Vercel à GitHub

Ajouter la variable VITE_API_URL dans les settings du projet Vercel

Vercel construit et déploie automatiquement à chaque push

Dépendances principales
vue

vue-router

pinia

axios

tailwindcss

Scripts utiles

npm run dev # Lancer localement
npm run build # Générer la version production
npm run preview # Visualiser le build
