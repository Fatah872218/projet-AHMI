import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true }, // "admin" a toutes les permissions, tandis qu'un rôle "partenaire" a des permissions limitées.
});
export default mongoose.model("Permission", permissionSchema);
