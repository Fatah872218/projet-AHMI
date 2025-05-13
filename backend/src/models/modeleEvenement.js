import mongoose from "mongoose";
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const evenementSchema = new Schema({
  titre: { type: String },
  description: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  lieu: {
    nom: { type: String },
    adresse: { type: String },
    coordonnees: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  createur: { type: ObjectId, ref: "Utilisateur" },
  statut: {
    type: String,
    enum: ["en_attente", "approuve", "rejete", "annule"],
    default: "en_attente",
  },
  capaciteMax: { type: Number },
  placesDisponibles: { type: Number },
  prix: { type: Number, default: 0 },
  categories: [
    {
      type: ObjectId,
      ref: "Categorie",
    },
  ],
  imageUrl: { type: String },
  participationFinanciere: { type: String },
  lienInstagram: { type: String },
  dateCreation: { type: Date, default: Date.now },
  dateModeration: { type: Date },
  moderateur: { type: ObjectId, ref: "Utilisateur" },
  organisateur: {
    nom: { type: String },
    email: { type: String },
  },
  lienSiteInternet: { type: String },
});

export default mongoose.model("Evenement", evenementSchema);
