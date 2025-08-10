// backend/src/middlewares/validateObjectId.js
import mongoose from "mongoose";
export default function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Identifiant invalide" });
  }
  next();
}
