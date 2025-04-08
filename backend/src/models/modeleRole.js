import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  nom: {
    type: String,
    enum: ["visiteur", "adherent", "partenaire", "admin"],
    required: true,
  },
  permissions: { type: String }, // Ex: ["creer_evenement", "moderer_evenement", "reserver_place", ...]
});

export default mongoose.model("Role", roleSchema);
