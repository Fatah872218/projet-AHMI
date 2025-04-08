import mongoose from "mongoose";

const donSchema = new mongoose.Schema({
  _id: ObjectId,
  utilisateur: {
    type: ObjectId,
    ref: "Utilisateur",
    required: false, // Permet les dons de non-utilisateurs
  },
  donateurAnonyme: {
    // Seulement si utilisateur non connecté ou don anonyme
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
  },
  anonyme: { type: Boolean, default: false },
  montant: { type: Number, required: true },
  typeDon: {
    type: String,
    enum: ["ponctuel", "mensuel", "annuel"],
    default: "ponctuel",
  },
  paiement: { type: ObjectId, ref: "Paiements" }, // Relation un-à-un avec Paiement
  motif: { type: String },
  reçuFiscal: {
    eligible: { type: Boolean },
    envoye: { type: Boolean },
    dateEnvoi: { type: Date },
  },
  dateDon: { type: Date, default: Date.now },
  commentaire: { type: String },
});
export default mongoose.model("on", donSchema);
