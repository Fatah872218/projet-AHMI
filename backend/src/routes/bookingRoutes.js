// routes/bookingRoutes.js
import express from "express";
import bookingController from "../controllers/bookingController.js";
//import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validations/bookingSchemas.js";
import valider from "../middlewares/middlewareValidation.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = express.Router();

// Créer une réservation (user connecté)
router.post(
  "/",
  //fakeAuthAdmin,
  middlewareAuth,
  valider(createBookingSchema),
  bookingController.createBooking
);

// Voir une réservation (propriétaire ou admin)
router.get(
  "/:id",
  //fakeAuthAdmin,
  middlewareAuth,
  validateObjectId,
  bookingController.getBookingById
);

// Modifier sa réservation (user)
router.put(
  "/:id",
  //fakeAuthAdmin,
  middlewareAuth,
  validateObjectId,
  valider(updateBookingSchema),
  bookingController.updateBooking
);

// Supprimer sa réservation
router.delete(
  "/:id",
  //fakeAuthAdmin,
  middlewareAuth,
  validateObjectId,
  bookingController.deleteBooking
);

// Voir toutes ses réservations (user)
router.get(
  "/utilisateur/mes-reservations",
  //fakeAuthAdmin,
  middlewareAuth,
  bookingController.getMyBookings
);

// Voir toutes les réservations (admin)
router.get(
  "/",
  //fakeAuthAdmin,
  middlewareAuth,
  checkRole("admin"),
  bookingController.getAllBookings
);

export default router;
