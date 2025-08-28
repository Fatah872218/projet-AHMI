// backend/src/middlewares/validateObjectId.js
import mongoose from "mongoose";

// Utilisable sur autre param ex. ":roleId"
export function validateObjectIdParam(paramName = "id") {
  return (req, res, next) => {
    const value = req.params?.[paramName];
    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      return res
        .status(400)
        .json({ error: `Identifiant invalide (${paramName})` });
    }
    next();
  };
}

// Compat descendante: default = contrôle de ":id"
export default function validateObjectId(req, res, next) {
  return validateObjectIdParam("id")(req, res, next);
}
