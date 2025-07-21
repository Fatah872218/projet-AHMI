import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import roleRoutes from "./routes/routesRole.js";
//import permissionRoutes from "./routes/routesPermission.js";
import utilisateurRoutes from "./routes/routeUtilisateur.js";
import authRoutes from "./routes/routesAuth.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
//import geocodeRoutes from "./routes/geocodeRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connexion à la base de données
connectDB();
// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // autorise le front local
    credentials: true, // autorise les cookies / sessions / headers
  })
);
app.use(express.json()); //
app.use(cookieParser());

// Routes
console.info("Avant routes utilisateur");

app.use("/api/utilisateurs", utilisateurRoutes);
console.info(" utilisateurs OK");

console.info("Avant routes role");

app.use("/api/roles", roleRoutes);
console.info(" roles OK");

//app.use("/api/permissions", permissionRoutes);
console.info(" Avant routes event");
app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

//app.use("/evenement", eventRoutes);

console.info(" Avant routes booking");

app.use("/api/reservations", bookingRoutes);
console.log(" reservations OK");

console.info(" Avant routes categorie");

app.use("/api/categories", categorieRoutes);
console.info(" categories OK");

//app.use("/api/geocode", geocodeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
console.info("Chargement terminé sans erreurs jusqu'ici ");

app.listen(PORT, () => {
  console.info(`Serveur en écoute sur http://localhost:${PORT}`);
});
