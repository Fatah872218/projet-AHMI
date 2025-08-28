// backend/src/middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

<<<<<<< HEAD
/**
 * Limiteur "global" (toutes routes)
 * Exemple: 300 requêtes / 15 minutes par IP
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: "draft-7", // en-têtes RateLimit-*
  legacyHeaders: false, // X-RateLimit-* off
  message: { message: "Trop de requêtes, réessayez plus tard." },
});

/**
 * Limiteur "auth sensible" (mot de passe oublié / reset / login)
 * Exemple: 20 requêtes / 15 minutes par IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Trop de tentatives, réessayez un peu plus tard." },
});

/**
 * Limiteur "ultra sensible" pour /mot-de-passe-oublie
 * Exemple: 5 requêtes / 15 minutes par IP
 * -> tu peux choisir l’un OU l’autre (authLimiter ou forgotLimiter) selon ton besoin
 */
export const forgotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Trop de demandes de réinitialisation." },
=======
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
>>>>>>> feature/events-booking
});
