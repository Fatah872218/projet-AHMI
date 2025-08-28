import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import connectDB from "./config/db.js";

import securityHeaders from "./middlewares/securityHeaders.js";
import {
  generalLimiter,
  authLimiter,
  geocodeLimiter,
} from "./middlewares/rateLimiter.js";
//import corsStrict from "./middlewares/corsStrict.js";
//import { sanitizeMongo, preventHpp } from "./middlewares/sanitize.js";
import auth from "./middlewares/middlewareAuth.js";
import checkRole from "./middlewares/middlewareCheckRole.js";
import roleRoutes from "./routes/routesRole.js";
import utilisateurRoutes from "./routes/routeUtilisateur.js";
import authRoutes from "./routes/routesAuth.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import geocodeRoutes from "./routes/geocodeRoutes.js";
import reinitRoutes from "./routes/routeReinitialisationMDP.js";

import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.disable("x-powered-by");
app.set("trust proxy", 1);

// Sécurité
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(securityHeaders);

// CORS —  :
// 1) CORS strict via ton middleware
// app.use(corsStrict);

// 2) CORS simple ()
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limit — un seul global
app.use(generalLimiter);

// Parsing & hygiène
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ["page", "limit", "sort"] }));

// Compression
app.use(compression());

// Routes
console.info("Avant routes Auth");
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/auth", reinitRoutes);
app.use("/api/geocode", geocodeLimiter, geocodeRoutes);

app.use("/api/utilisateurs", utilisateurRoutes);
console.info(" utilisateurs OK");

console.info("Avant routes role");
app.use("/api/roles", auth, checkRole("admin"), roleRoutes);
console.info(" roles OK");

//app.use("/api/permissions", permissionRoutes);
console.info(" Avant routes event");
app.use("/api/events", eventRoutes);

app.use("/api/reservations", auth, bookingRoutes);
console.log(" reservations OK");

console.info(" Avant routes categorie");
app.use("/api/categories", categorieRoutes);
console.info(" categories OK");

import { mountDocs } from "./docs.js";
mountDocs(app); // ➜ http://localhost:3000/docs

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
console.info("Chargement terminé sans erreurs jusqu'ici ");

app.listen(PORT, () => {
  console.info(`Serveur en écoute sur http://localhost:${PORT}`);
});
