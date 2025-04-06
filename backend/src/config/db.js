import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    process.exit(1); // Arrêter l'application en cas d'échec de la connexion
  }
};
export default connectDB;
