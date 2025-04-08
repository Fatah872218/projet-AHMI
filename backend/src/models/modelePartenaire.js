import mongoose from "mongoose";

const partenaireSchema = new mongoose.Schema({
  _id: ObjectId,
  utilisateur: { type: ObjectId, ref: "Utilisateur", unique: true }, // Relation un-à-un avec Ustilisateur
  nomOrganisation: { type: String },
  typeOrganisation: {
    type: String,
    enum: ["association", "entreprise", "collectivite", "autre"],
  },
  description: { type: String },
  logoUrl: { type: String },
  siteWeb: { type: String },
  evenements: [{ type: ObjectId, ref: "Evenement" }], // Relation un-à-plusieurs avec Evenement
});
export default mongoose.model("Partenaire", partenaireSchema);
