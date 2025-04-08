// Modèle pour définir la structure de l'utilisateur dans la base de données.
import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "adherent", "partenaire", "connecté"],
    default: "connecté",
  },
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
