AHMI – Backend

API REST du projet AHMI, réalisée avec Node.js (Express), MongoDB (Mongoose), JWT, Nodemailer et des middlewares de sécurité.

🚀 Démarrage rapide

# Depuis le dossier backend

npm install
npm run dev

Serveur : http://localhost:5000

Documentation (OpenAPI) : http://localhost:5000/docs

📁 Arborescence (extrait utile)
backend/
├─ src/
│ ├─ app.js # Entrée principale (démarrage orchestré : DB puis HTTP)
│ ├─ config/
│ │ ├─ db.js # Connexion MongoDB (Mongoose)
│ │ └─ nodemailerConfig.js # Transport Mailtrap
│ ├─ controllers/
│ │ ├─ controleurAuth.js
│ │ ├─ controllerReinitialisationMDP.js
│ │ ├─ controllerUtilisateur.js
│ │ ├─ eventController.js
│ │ ├─ bookingController.js
│ │ ├─ controleurRole.js
│ │ └─ permissionController.js
│ ├─ middlewares/
│ │ ├─ middlewareAuth.js
│ │ ├─ middlewareCheckRole.js
│ │ ├─ middlewareValidation.js
│ │ └─ (sécurité : helmet, hpp, rate-limit, mongo-sanitize, CORS)
│ └─ docs.js # Montage Swagger UI (via OPENAPI_SPEC_PATH)
├─ .env # Variables locales (non versionné)
├─ .env.example # Modèle (sans secrets)
├─ package.json
└─ README.md

🔐 Authentification & rôles

JWT : access token + refresh token.

Rôles : utilisateur, adherent, partenaire, admin.

Garde : middlewareAuth, middlewareCheckRole (RBAC).

Validation : schémas Joi côté backend.

🛡️ Sécurité (CCP2)

Helmet (en-têtes HTTP), HPP (paramètres en double), CORS strict,

express-rate-limit (limitation de débit), express-mongo-sanitize, sanitize-html, validator.

Logs de connexion Mongo masqués (pas de secrets en clair en dev).

✉️ Emails (Mailtrap)

Transport défini dans src/config/nodemailerConfig.js.

Variables : SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.

Flux supportés : mot de passe oublié / réinitialisation.

🗂️ Variables d’environnement

Créer un fichier .env (ne pas commiter) :

# Serveur

PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:${PORT}

# Front (CORS)

FRONTEND_URL=http://localhost:5173
PUBLIC_API_URL=http://localhost:5000

# MongoDB (local, avec authentification activée)

# NOTE : si votre mot de passe contient "!", testez aussi la version encodée %21 si besoin.

MONGODB_URI=mongodb://admin:MotDePasse123!@localhost:27017/ahmi-dev?authSource=admin

# MONGODB_URI=mongodb://admin:MotDePasse123%21@localhost:27017/ahmi-dev?authSource=admin

# JWT

JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d

# Mailtrap

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=xxxx
SMTP_PASS=yyyy
SMTP_FROM="AHMI <no-reply@ahmi.local>"

# OpenAPI (chemin du YAML)

OPENAPI_SPEC_PATH=../../DOCS/openapi.yaml

Un .env.example doit refléter la structure sans les secrets :

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=mongodb://<user>:<password>@localhost:27017/ahmi-dev?authSource=admin
JWT_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=<user>
SMTP_PASS=<pass>
SMTP_FROM="AHMI <no-reply@ahmi.local>"
OPENAPI_SPEC_PATH=../../DOCS/openapi.yaml

🧩 MongoDB local (Homebrew + authentification)

Fichier de conf : /usr/local/etc/mongod.conf (Intel) :

systemLog:
destination: file
path: /usr/local/var/log/mongodb/mongo.log
logAppend: true
storage:
dbPath: /usr/local/var/mongodb
net:
bindIp: 127.0.0.1, ::1
ipv6: true
security:
authorization: enabled

Créer l’admin (si besoin) :

mongosh
use admin
db.createUser({ user:"admin", pwd:"MotDePasse123!", roles:[{ role:"root", db:"admin" }] })

Redémarrer & tester :

brew services restart mongodb-community@6.0
mongosh --username admin --password 'MotDePasse123!' --authenticationDatabase admin mongodb://localhost:27017/admin

📚 Documentation API

Swagger UI monté via mountDocs(app) → http://localhost:5000/docs

Source OpenAPI pointée par OPENAPI_SPEC_PATH (YAML).

🧪 Endpoints principaux (exemples)

POST /api/auth/register – Inscription

POST /api/auth/login – Connexion

POST /api/auth/refresh – Rafraîchissement du token

GET /api/users/me – Profil (protégé)

GET /api/events – Liste des événements (publique)

POST /api/events – Créer un événement (partenaire)

PUT /api/events/:id – Modifier

DELETE /api/events/:id – Supprimer

(… + endpoints rôles/permissions, réservations, réinit MDP)

🧰 Scripts NPM
npm run dev # dev avec nodemon
npm start # exécution simple
npm test # placeholder (toujours 0)
npm run seed:user
npm run migrate:lieu
npm run clean:adresse

Astuce : pour éviter les redémarrages inutiles de nodemon, ajoute un nodemon.json :

{
"watch": ["src"],
"ext": "js,json",
"ignore": ["node_modules", ".git", ".env", "DOCS", "docs", "README.md", "logs", "**/*.spec.js"]
}

et change le script : "dev": "nodemon --config nodemon.json src/app.js".

🛠️ Dépannage rapide

Mongo auth “AuthenticationFailed”
– Tester en CLI :
mongosh --username admin --password 'MotDePasse123!' --authenticationDatabase admin mongodb://localhost:27017/admin
– Si le mot de passe contient !, essayer l’URI encodée (%21) dans .env.
– Vérifier le log : /usr/local/var/log/mongodb/mongo.log.

Le serveur démarre avant la DB
– Déjà corrigé : app.js attend connectDB() avant app.listen().

Bruit dans la console front (Chrome)
– Certains plugins injectent des scripts → tester en navigation privée ou désactiver les extensions sur http://localhost:5173.
