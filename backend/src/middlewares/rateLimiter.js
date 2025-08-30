// backend/src/middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

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
});
