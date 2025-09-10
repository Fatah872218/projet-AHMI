import mongoose from "mongoose";
const { Schema, model } = mongoose;
const _ObjectId = mongoose.Types.ObjectId;

const categorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
});

const Categorie = model("Categorie", categorieSchema);
export default Categorie;
