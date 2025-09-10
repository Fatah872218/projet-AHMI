import mongoose from "mongoose";
const { Types } = mongoose;

const paiementSchema = new mongoose.Schema({
  _id: Types.ObjectId,
  type: {
    type: String,
    enum: ["reservation", "adhesion", "don", "achat"],
    required: true,
  },
  reservation: { type: Types.ObjectId, ref: "Reservation" }, // Si type=reservation
  adhesion: { type: Types.ObjectId, ref: "Adhesion" }, //Si type=adhesion.// Relation un-à-plusieurs avec adhesions
  don: { type: Types.ObjectId, ref: "Don" }, // Si type=don.// Relation un-à-un avec Donations
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
