import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  _id: ObjectId,
  // Référence optionnelle à un utilisateur enregistré
  utilisateur: {
    type: ObjectId,
    ref: "Utilisateur",
    required: false,
  },
  // Champs pour les non-utilisateurs (seulement si utilisateur non renseigné)
  contactExterne: {
    nom: {
      type: String,
      required: function () {
        return !this.utilisateur;
      },
    },
    prenom: {
      type: String,
      required: function () {
        return !this.utilisateur;
      },
    },
    email: {
      type: String,
      required: function () {
        return !this.utilisateur;
      }, // Seulement requis si pas d'utilisateur
      match: [/.+@.+\..+/, "Veuillez entrer un email valide"], // Validation simple
    },
    telephone: { type: String },
  },
  sujet: {
    type: String,
    enum: ["information", "partenariat", "probleme", "autre"],
  },
  message: { type: String, required: true },
  dateEnvoi: { type: Date, default: Date.now },
  traite: { type: Boolean, default: false },
});

export default mongoose.model("Contact", contactSchema);
