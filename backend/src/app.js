import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
<<<<<<< Updated upstream
import authRoutes from "./routes/auth.routes.js"; //
=======
import utilisateurRoutes from "./routes/routeUtilisateur.js";
>>>>>>> Stashed changes

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
<<<<<<< Updated upstream
// Connexion à la BDD
=======

// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Parser les requêtes JSON
app.use(cookieParser()); // Utiliser cookie-parser

// Connexion à la base de données
>>>>>>> Stashed changes
connectDB();
// Middleware
app.use(cors());
app.use(express.json()); //
app.use(cookieParser());

<<<<<<< Updated upstream
// Déclaration des routes
app.use("/api/auth", authRoutes); //

// Lancement du serveur
const PORT = process.env.PORT || 5000;
=======
// Routes
app.use("/api/utilisateurs", utilisateurRoutes);
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
>>>>>>> Stashed changes
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
