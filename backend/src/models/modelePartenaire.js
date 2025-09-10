import mongoose from "mongoose";
const { Types } = mongoose;

const partenaireSchema = new mongoose.Schema({
  _id: Types.ObjectId,
  utilisateur: { type: Types.ObjectId, ref: "Utilisateur", unique: true }, // Relation un-à-un avec Ustilisateur
  nomOrganisation: { type: String },
  typeOrganisation: {
    type: String,
    enum: ["association", "entreprise", "collectivite", "autre"],
  },
  description: { type: String },
  logoUrl: { type: String },
  siteWeb: { type: String },
  evenements: [{ type: Types.ObjectId, ref: "Evenement" }], // Relation un-à-plusieurs avec Evenement
});
export default mongoose.model("Partenaire", partenaireSchema);
