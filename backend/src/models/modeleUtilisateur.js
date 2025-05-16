import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Adresse email invalide"],
    },
    motDePasse: { type: String, required: true, trim: true, select: false },
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
    role: {
      type: String,
      enum: ["admin", "partenaire", "user"],
      default: "user",
    },

    isActif: { type: Boolean, default: false },
    activationCode: { type: String },
    /* resetPasswordToken: */
    tokenReinitialisation: { type: String }, // Stocke le token unique de réinitialisation
    /* resetPasswordExpires: */
    expirationTokenReinitialisation: { type: Date }, // Stocke la date d'expiration du token

    reservations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
    ], // Relation un-à-plusieurs avec Reservations
  },
  { timestamps: true }
);

export default mongoose.model("Utilisateur", utilisateurSchema);
