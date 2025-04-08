import mongoose from "mongoose";

const paiementSchema = new mongoose.Schema({
  _id: ObjectId,
  type: {
    type: String,
    enum: ["reservation", "adhesion", "don", "achat"],
    required: true,
  },
  reservation: { type: ObjectId, ref: "Reservation" }, // Si type=reservation
  adhesion: { type: ObjectId, ref: "Adhesion" }, //Si type=adhesion.// Relation un-à-plusieurs avec adhesions
  don: { type: ObjectId, ref: "Don" }, // Si type=don.// Relation un-à-un avec Donations
  montant: { type: Number, required: true },
  methode: {
    type: String,
    enum: ["carte", "virement", "cheque", "especes", "prelevement"],
    required: true,
  },
  datePaiement: { type: Date, required: true },
  reference: { type: String }, // Référence du paiement (numéro de transaction)
  statut: {
    type: String,
    enum: ["en_attente", "complete", "refuse", "rembourse"],
    default: "en_attente",
  },
  receiptUrl: String, // URL du reçu
});
export default mongoose.model("Paiement", paiementSchema);
