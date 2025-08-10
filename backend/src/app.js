import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import connectDB from "./config/db.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import compression from "compression";
import securityHeaders from "./middlewares/securityHeaders.js";
import {
  generalLimiter,
  authLimiter,
  geocodeLimiter,
} from "./middlewares/rateLimiter.js";
import corsStrict from "./middlewares/corsStrict.js";
import { sanitizeMongo, preventHpp } from "./middlewares/sanitize.js";

import roleRoutes from "./routes/routesRole.js";
//import permissionRoutes from "./routes/routesPermission.js";
import utilisateurRoutes from "./routes/routeUtilisateur.js";
import authRoutes from "./routes/routesAuth.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import geocodeRoutes from "./routes/geocodeRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
app.set("trust proxy", 1); // utile si   proxy/CDN
// Connexion à la base de données
connectDB();
// Middleware
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(corsStrict);
app.use(
  cors({
    origin: "http://localhost:5173", // autorise le front local
    credentials: true, // autorise les cookies / sessions / headers
  })
);
app.use(generalLimiter);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true }));
app.use(express.json({ limit: "10kb" })); //limite la taille du JSON
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ["page", "limit", "sort"] }));
app.use(sanitizeMongo);
app.use(preventHpp);
app.use(compression());

// Routes
console.info("Avant routes Auth");
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/geocode", geocodeLimiter, geocodeRoutes);

app.use("/api/utilisateurs", utilisateurRoutes);
console.info(" utilisateurs OK");

console.info("Avant routes role");
app.use("/api/roles", roleRoutes);
console.info(" roles OK");

//app.use("/api/permissions", permissionRoutes);
console.info(" Avant routes event");
app.use("/api/events", eventRoutes);

console.info(" Avant routes booking");
app.use("/api/reservations", bookingRoutes);
console.log(" reservations OK");

console.info(" Avant routes categorie");
app.use("/api/categories", categorieRoutes);
console.info(" categories OK");

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
console.info("Chargement terminé sans erreurs jusqu'ici ");

app.listen(PORT, () => {
  console.info(`Serveur en écoute sur http://localhost:${PORT}`);
});
