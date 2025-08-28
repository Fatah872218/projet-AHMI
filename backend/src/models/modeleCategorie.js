import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const { ObjectId } = Types;

const categorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
});

const Categorie = model("Categorie", categorieSchema);
export default Categorie;
