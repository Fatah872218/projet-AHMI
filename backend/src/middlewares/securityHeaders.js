// backend/src/middlewares/securityHeaders.js
import helmet from "helmet";

// On exporte une fonction middleware (ESM), par défaut.
export default function securityHeaders() {
  // Helmet peut être appelé comme un "composed middleware".
  // On renvoie un handler (req, res, next) qui applique la stack Helmet + quelques réglages.
  const cspDirectives = {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "blob:", "https:"],
    scriptSrc: ["'self'"], // pas de 'unsafe-inline' ici pour les scripts
    styleSrc: ["'self'", "'unsafe-inline'"], // inline autorisé pour styles (comme dans tes en-têtes actuels)
    connectSrc: [
      "'self'",
      "http://localhost:5173",
      "https://nominatim.openstreetmap.org",
    ],
    baseUri: ["'self'"],
    fontSrc: ["'self'", "https:", "data:"],
    formAction: ["'self'"],
    frameAncestors: ["'self'"],
    objectSrc: ["'none'"],
    scriptSrcAttr: ["'none'"],
    upgradeInsecureRequests: [], // active l'upgrade (HTTP -> HTTPS) côté client
  };

  const helmetMiddleware = helmet({
    contentSecurityPolicy: {
      useDefaults: false, // on gère nos directives explicitement pour coller à tes headers actuels
      directives: cspDirectives,
    },
    crossOriginOpenerPolicy: { policy: "same-origin" }, // COOP
    crossOriginResourcePolicy: { policy: "cross-origin" }, // CORP = cross-origin (comme dans tes en-têtes)
    referrerPolicy: { policy: "no-referrer" }, // Referrer-Policy
    hsts: { maxAge: 31536000, includeSubDomains: true }, // HSTS 1 an + sous-domaines
    xssFilter: false, // obsolète, Helmet ne le gère plus; on laisse false
  });

  // On peut ajouter d’autres headers spécifiques si besoin
  return (req, res, next) => {
    helmetMiddleware(req, res, () => {
      // Exemple: X-Download-Options (équiv. de "noopen") est géré par helmet.ieNoOpen(),
      // mais déjà inclus par Helmet moderne. Si tu veux des headers additionnels custom:
      // res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
      next();
    });
  };
}
