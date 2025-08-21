import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    // Vérifiez que l'URI est bien chargé
    if (process.env.NODE_ENV !== "production") {
      console.log("Tentative de connexion MongoDB:", process.env.MONGODB_URI);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("  Connecté à MongoDB");
  } catch (err) {
    console.error("  Erreur de connexion à MongoDB :", err);

    process.exit(1);
  }
};

export default connectDB;
