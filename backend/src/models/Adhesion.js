import mongoose from "mongoose";

const adhesionSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeAdhesion: {
    type: String,
    enum: ["adherent", "adherent_actif", "partenaire"],
    required: true,
  },
  montant: { type: Number, required: true },
  datePaiement: { type: Date, required: true },
  dateExpiration: { type: Date, required: true },
  statutPaiement: {
    type: String,
    enum: ["en_attente", "paye", "refuse"],
    default: "en_attente",
  },
  factureUrl: { type: String },
});

export default mongoose.model("Adhesion", adhesionSchema);
