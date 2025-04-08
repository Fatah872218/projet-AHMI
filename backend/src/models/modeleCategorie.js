import mongoose from "mongoose";

const CategorieSchema = new mongoose.Schema({
  _id: ObjectId,
  nom: { type: String },
  description: { type: String },
});

export default mongoose.model("Categorie", CategorieSchema);
