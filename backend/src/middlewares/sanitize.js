// backend/src/middlewares/sanitize.js
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

// Empêche les opérateurs MongoDB injectés dans body/query (ex: $gt)
export const sanitizeMongo = mongoSanitize();

// Empêche la pollution de paramètres (ex: ?role=user&role=admin)
export const preventHpp = hpp({
  whitelist: ["page", "limit", "sort"], // adapte selon tes besoins
});

// Petit hardening du JSON body size
export const jsonLimit = (app) =>
  app.use(
    // 10kb suffit pour des payloads simples; augmente si besoin d’uploads JSON volumineux
    (req, res, next) => {
      req.setTimeout?.(120000);
      next();
    }
  );
