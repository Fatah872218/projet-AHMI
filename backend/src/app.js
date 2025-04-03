import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    //routes
    app.use("/api/auth", authRoutes);

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Erreur de connexion à MongoDB:`, err.message);
    process.exit(1);
  }
};
startServer();
