// backend/src/middlewares/corsStrict.js
import cors from "cors";

const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

export default cors({
  origin: (origin, cb) => {
    // Autorise outils locaux sans Origin (ex: Postman) si nécessaire
    if (!origin) return cb(null, true);
    if (origins.includes(origin)) return cb(null, true);
    cb(new Error("Origin non autorisé par CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  exposedHeaders: ["X-CSRF-Token"],
});
