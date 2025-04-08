// Modèle pour définir les rôles des utilisateurs.
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
