# AHMI – Backend

Ce dossier contient l’API REST du projet **AHMI**, développée en Node.js avec Express et MongoDB.

---

## ⚙️ Lancer le serveur

```bash
# Depuis le dossier backend
npm install
npm run dev
```

Le serveur démarre par défaut sur : http://localhost:5000

📁 Structure du code
/backend
├── /controllers # Logique métier (users, events, adhesion, etc.)
├── /routes # Endpoints API REST
├── /models # Schémas Mongoose (User, Event, Adhesion, etc.)
├── /middlewares # Authentification, rôles, gestion d’erreurs
├── /config # Connexion à MongoDB, env
├── /utils # Fonctions diverses
└── server.js # Entrée principale

🔐 Authentification JWT
Auth basée sur un access token et un refresh token

3 rôles utilisateurs :

user : utilisateur inscrit

partner : peut créer/modifier des événements et sa fiche

admin : valide les événements, fiches partenaires

Middleware authMiddleware pour sécuriser les routes
Middleware protectRoute + requireRole(role) utilisés dans les routes sécurisées.

Principaux endpoints :

POST /auth/login

POST /auth/register

POST /auth/refresh

GET /users/me (protégé)

🌐 Connexion à MongoDB
Connexion via mongoose :
mongoose.connect(process.env.MONGO_URI)

Exemple de fichier .env
PORT=5000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DATABASE>
JWT_SECRET=secret_key
JWT_REFRESH_SECRET=refresh_secret

Dépendances principales

express

mongoose

dotenv

jsonwebtoken

bcryptjs

cors

Principaux endpoints

Méthode Route Description
POST /auth/register Inscription utilisateur
POST /auth/login Connexion utilisateur
GET /users/me Infos du profil connecté
PATCH /users/me Modifier son profil
GET /events Liste des événements publics
POST /events Créer un événement (partenaire)
PUT /events/:id Modifier un événement
DELETE /events/:id Supprimer un événement
PATCH /events/:id/validate Valider un événement (admin)
GET /partners Voir toutes les fiches partenaires
POST /partners Soumettre une fiche partenaire
PATCH /partners/:id/validate Valider une fiche (admin)
POST /adhesions Payer une adhésion
POST /donations Faire un don
POST /contact Envoyer un message via la page Contact

Scripts utiles

npm run dev # Lancer en mode développement avec nodemon
