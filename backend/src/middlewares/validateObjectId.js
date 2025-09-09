// backend/src/middlewares/validateObjectId.js
import mongoose from "mongoose";

/**
 * Valide un paramètre d'URL comme ObjectId.
 * - paramName: nom du param (ex. "id", "roleId", etc.)
 * - options.optional: si true, n'échoue pas si le param est vide/absent
 *
 * Format d'erreur harmonisé avec middlewareValidation.js :
 * {
 *   message: "Données invalides",
 *   details: [{ path: "<param>", message: "ID invalide (ObjectId attendu)" }]
 * }
 */
export function validateObjectIdParam(
  paramName = "id",
  { optional = false } = {}
) {
  return (req, res, next) => {
    const value = req.params?.[paramName];

    // Paramètre optionnel : on passe si absent/vidé
    if (optional && (value === undefined || value === null || value === "")) {
      return next();
    }

    // Contrôle strict si requis
    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        message: "Données invalides",
        details: [
          {
            path: paramName,
            message: "ID invalide (ObjectId attendu)",
          },
        ],
      });
    }

    return next();
  };
}

/**
 * Compat descendante: contrôle par défaut du paramètre ":id"
 * Usage:
 *   router.get("/:id", validateObjectId, ctrl.getOne)
 */
export default function validateObjectId(req, res, next) {
  return validateObjectIdParam("id")(req, res, next);
}
