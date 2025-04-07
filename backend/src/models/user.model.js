import mongoose from "mongoose";

const adresseSchema = new mongoose.Schema(
  {
    rue: String,
    codePostal: String,
    ville: String,
  },
  { _id: false }
);

const notificationsSchema = new mongoose.Schema(
  {
    newsletter: { type: Boolean, default: false },
    rappelEvenement: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: String,
  adresse: adresseSchema,
  dateInscription: { type: Date, default: Date.now },
  consentementCGU: { type: Boolean, default: true },
  notifications: notificationsSchema,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const User = mongoose.model("User", userSchema);
export default User;
