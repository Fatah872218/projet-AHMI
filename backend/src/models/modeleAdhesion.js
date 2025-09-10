import mongoose from "mongoose";
const { Types } = mongoose;

const adhesionSchema = new mongoose.Schema({
  _id: Types.ObjectId,
  utilisateur: { type: Types.ObjectId, ref: "Utilisateur", required: true }, // Relation un-à-plusieurs avec Utulisateurs
  typeAdhesion: {
    type: String,
    enum: ["individuelle", "familiale", "etudiant", "partenaire", "benevole"],
    required: true,
  },
  montant: { type: Number, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  paiements: [{ type: Types.ObjectId, ref: "Paiement" }], // Relation un-à-plusieurs avec Payments
  statut: {
    type: String,
    enum: ["active", "expiree", "en_attente", "annulee"],
    default: "en_attente",
  },
  facture: {
    numero: { type: String },
    dateEmission: { type: Date },
    url: { type: String },
  },
  renouvellementAuto: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
export default mongoose.model("Adhesion", adhesionSchema);
