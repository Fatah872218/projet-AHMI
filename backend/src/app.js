import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

console.log("MONGO_URI =", process.env.MONGO_URI);

// Créer une instance d'Express
const app = express();

// Connexion à la base de données
connectDB();

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
