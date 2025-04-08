import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import utilisateurRoutes from "./routes/routeUtilisateur.js";

const app = express();

// Connexion à la base de données
connectDB();
// Middleware
app.use(cors());
app.use(express.json()); //
app.use(cookieParser());

// Routes
app.use("/api/utilisateurs", utilisateurRoutes);
// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
