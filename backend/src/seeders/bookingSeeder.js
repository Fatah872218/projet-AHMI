import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Reservation from "../models/modeleReservation.js";
import Evenement from "../models/modeleEvenement.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { createFakeUser } = require("./createUser.cjs");

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const user = await createFakeUser();
    const events = await Evenement.find({}); // récupère les événements créés

    if (events.length === 0) {
      throw new Error("Aucun événement trouvé en base !");
    }

    const reservations = events.map((event, i) => ({
      utilisateur: user._id,
      evenement: event._id,
      nombrePlaces: i % 2 === 0 ? 2 : 1,
      statut: "confirme",
      notes: "Réservation test",
    }));

    await Reservation.deleteMany(); // supprime les anciennes réservations
    const result = await Reservation.insertMany(reservations);

    console.log(`${result.length} réservations ont été créées.`);
    process.exit();
  } catch (err) {
    console.error("Erreur création réservations :", err.message);
    process.exit(1);
  }
};

seed();
