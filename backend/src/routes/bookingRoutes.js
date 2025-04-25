// routes/bookingRoutes.js
import express from "express";
import bookingController from "../controllers/bookingController.js";
//import middlewareAuth from "../middlewares/middlewareAuth.js";
//import checkRole from "../middlewares/middlewareCheckRole.js";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validations/bookingSchemas.js";
import valider from "../middlewares/middlewareValidation.js";

const router = express.Router();

// Créer une réservation (user connecté)
router.post(
  "/",
  //middlewareAuth,
  valider(createBookingSchema),
  bookingController.createBooking
);

// Voir une réservation (propriétaire ou admin)
router.get(
  "/:id",
  //middlewareAuth,
  bookingController.getBookingById
);

// Modifier sa réservation (user)
router.put(
  "/:id",
  //middlewareAuth,
  valider(updateBookingSchema),
  bookingController.updateBooking
);

// Supprimer sa réservation
router.delete(
  "/:id",
  //middlewareAuth,
  bookingController.deleteBooking
);

// Voir toutes ses réservations (user)
router.get(
  "/utilisateur/mes-reservations",
  //middlewareAuth,
  bookingController.getMyBookings
);

// Voir toutes les réservations (admin)
router.get(
  "/",
  //middlewareAuth,
  //checkRole("admin"),
  bookingController.getAllBookings
);

export default router;
