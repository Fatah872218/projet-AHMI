import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"; //

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
// Connexion à la BDD
connectDB();
// Middleware
app.use(cors());
app.use(express.json()); //
app.use(cookieParser());

// Déclaration des routes
app.use("/api/auth", authRoutes); //

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
