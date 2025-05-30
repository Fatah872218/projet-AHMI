import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import roleRoutes from "./routes/routesRole.js";
import permissionRoutes from "./routes/routesPermission.js";
import utilisateurRoutes from "./routes/routeUtilisateur.js";
import authRoutes from "./routes/routesAuth.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import geocodeRoutes from "./routes/geocodeRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connexion à la base de données
connectDB();
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // ✅autorise le front local
    credentials: true, // autorise les cookies / sessions / headers
  })
);
app.use(express.json()); //
app.use(cookieParser());
// Servir le frontend buildé
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/evenements", eventRoutes);
app.use("/api/reservations", bookingRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api", geocodeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});
app.use(errorHandler);
// Démarrer le serveur

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
