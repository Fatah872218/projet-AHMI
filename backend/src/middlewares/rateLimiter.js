// backend/src/middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // 120 req/min par IP
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de tentatives, réessayez plus tard." }, // JSON au lieu d'une string
});

export const geocodeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30, // protège l’API Nominatim
  standardHeaders: true,
  legacyHeaders: false,
});
