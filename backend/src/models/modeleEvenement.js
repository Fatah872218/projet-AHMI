import mongoose from "mongoose";
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const evenementSchema = new Schema({
  titre: { type: String, required: true },
  description: { type: String },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  lieu: {
    rue: { type: String, required: true, trim: true },
    codePostal: {
      type: String,
      required: true,
      match: /^\d{5}$/,
    },
    commune: { type: String, required: true, trim: true },
    coordonnees: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },

  createur: { type: ObjectId, ref: "Utilisateur", required: true },
  statut: {
    type: String,
    enum: ["en_attente", "approuve", "rejete", "annule"],
    default: "en_attente",
  },
  capaciteMax: { type: Number, required: true },
  placesDisponibles: { type: Number },
  participationFinanciere: { type: Number, default: 0 },

  categories: [
    {
      type: ObjectId,
      ref: "Categorie",
    },
  ],
  imageUrl: { type: String },
  lienInstagram: { type: String },
  lienSiteInternet: { type: String },

  dateCreation: { type: Date, default: Date.now },
  dateModeration: { type: Date },
  moderateur: { type: ObjectId, ref: "Utilisateur" },

  organisateur: {
    nom: { type: String, required: true },
    email: { type: String, required: true },
  },
});

export default mongoose.model("Evenement", evenementSchema);
