import mongoose from "mongoose";
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const reservationSchema = new Schema({
  _id: { type: Types.ObjectId, default: () => new Types.ObjectId() }, // Génération automatique d'un ObjectId
  utilisateur: { type: ObjectId, ref: "Utilisateur" }, // Relation un-à-plusieurs avec Utilisateur
  evenement: { type: ObjectId, ref: "Evenement" }, // Relation un-à-plusieurs avec Evenement
  dateReservation: { type: Date, default: Date.now },
  nombrePlaces: { type: Number },
  statut: {
    type: String,
    enum: ["confirme", "annule", "present", "absent"],
    default: "confirme",
  },
  paiement: { type: ObjectId, ref: "Paiement" }, // Relation un-à-un avec Paiement
  qrCodeUrl: { type: String }, // Pour la validation à l'entrée
  notes: { type: String },
});

export default mongoose.model("Reservation", reservationSchema);
