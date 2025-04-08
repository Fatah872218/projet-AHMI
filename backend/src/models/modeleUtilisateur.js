import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  motDePasse: { type: String, required: true, trim: true },
  telephone: { type: String },
  adresse: {
    rue: { type: String },
    codePostal: { type: String },
    ville: { type: String },
  },
  dateInscription: { type: Date, default: Date.now },
  consentementCGU: { type: Boolean },
  notifications: {
    newsletter: { type: Boolean },
    rappelEvenement: { type: Boolean },
  },
  /*  roles: [{ type: ObjectId, ref: "Role" }] */ // Relation plusieurs-à-plusieurs avec Roles
  /*  reservations: [{ type: ObjectId, ref: "Reservation" }], */ // Relation un-à-plusieurs avec Reservations
});

export default mongoose.model("Utilisateur", utilisateurSchema);
