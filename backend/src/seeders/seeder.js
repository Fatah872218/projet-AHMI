// seeders/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Evenement from "../models/modeleEvenement.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { createFakeUser } = require("./createUser.cjs");

dotenv.config();

// Fake data
const fakeEvents = [
  {
    titre: "Atelier Cuisine Orientale",
    description:
      "Venez découvrir les secrets des épices et des plats traditionnels.",
    dateDebut: new Date("2025-06-10T10:00:00"),
    dateFin: new Date("2025-06-10T14:00:00"),
    lieu: {
      nom: "Maison des Cultures",
      adresse: "15 rue des Saveurs, Marseille",
      coordonnees: { lat: 43.2965, lng: 5.3698 },
    },
    createur: new mongoose.Types.ObjectId(), // à remplacer par un vrai ID partenaire
    capaciteMax: 30,
    placesDisponibles: 30,
    statut: "approuve",
    prix: 5,
    categories: [],
  },
  {
    titre: "Conférence bien-être et respiration",
    description: "Respirez, vivez, connectez-vous avec vous-même.",
    dateDebut: new Date("2025-06-15T18:00:00"),
    dateFin: new Date("2025-06-15T20:00:00"),
    lieu: {
      nom: "Centre AHMI",
      adresse: "12 avenue des Lumières, Lyon",
      coordonnees: { lat: 45.75, lng: 4.85 },
    },
    createur: new mongoose.Types.ObjectId(),
    capaciteMax: 50,
    placesDisponibles: 50,
    statut: "approuve",
    prix: 0,
    categories: [],
  },
];

const seed = async () => {
  try {
    await connectDB();
    const user = await createFakeUser();
    fakeEvents[0].createur = user._id;
    console.log(`Utilisateur fictif créé : ${user.email}`);

    await Evenement.deleteMany(); // vide les anciens événements
    const result = await Evenement.insertMany(fakeEvents);
    console.log(`${result.length} événements ont été insérés.`);
    process.exit();
  } catch (err) {
    console.error("Erreur insertion :", err.message);
    process.exit(1);
  }
};

seed();
