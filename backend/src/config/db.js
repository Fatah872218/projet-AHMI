import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("URI utilisée :", process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    // Vérifiez que l'URI est bien chargé
    console.log("Tentative de connexion avec URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("  Connecté à MongoDB");
  } catch (err) {
    console.error("  Erreur de connexion à MongoDB :", err);
    process.exit(1);
  }
};

export default connectDB;
