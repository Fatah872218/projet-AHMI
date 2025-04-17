import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import roleRoutes from "./routes/routesRole.js";
import permissionRoutes from "./routes/routesPermission.js";
import utilisateurRoutes from "./routes/routeUtilisateur.js";
import authRoutes from "./routes/routesAuth.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Connexion à la base de données
connectDB();
// Middleware

app.use(cors(corsOptions));

app.use(express.json()); //
app.use(cookieParser());

// Routes
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
