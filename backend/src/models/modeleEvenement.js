import mongoose from "mongoose";

const evenementSchema = new mongoose.Schema({
  _id: ObjectId,
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
  createur: { type: ObjectId, ref: "Utilisateur" }, // Relation un-à-plusieurs avec Users (partenaire qui crée l'événement)
  statut: {
    type: String,
    enum: ["en_attente", "approuve", "rejete", "annule"],
    default: "en_attente",
  },
  capaciteMax: { type: Number },
  placesDisponibles: { type: Number },
  prix: { type: Number, default: 0 },
  categories: [{ type: ObjectId, ref: "Categorie" }], // Relation plusieurs-à-plusieurs avec Categories
  imageUrl: { type: String },
  participationFinanciere: { type: String },
  lienInstagram: { type: String },
  dateCreation: { type: Date, default: Date.now },
  dateModeration: { Date },
  moderateur: { type: ObjectId, ref: "Utilisateur" }, // Relation un-à-plusieurs avec Utilisateur (admin qui modère)
});

export default mongoose.model("Evenement", evenementSchema);
