// routes/eventRoutes.js
import express from "express";
import eventController from "../controllers/eventController.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
//import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import {
  eventSchema as createEventSchema,
  updateEventSchema,
} from "../validations/eventSchemas.js";

import valider from "../middlewares/middlewareValidation.js";

const router = express.Router();

// Routes publiques (tout le monde)
router.get("/", eventController.getAllEvents);
router.get(
  "/:id/places-restantes",
  fakeAuthAdmin,
  /* middlewareAuth,*/
  eventController.getPlacesRestantes
);

router.get("/:id", eventController.getEventById);

// Routes protégées - partenaire ou admin
router.post(
  "/",
  fakeAuthAdmin,
  /* middlewareAuth,
   */
  checkRole("admin", "partenaire"),
  valider(createEventSchema),
  eventController.createEvent
);

// Mise à jour d’un événement (créateur ou admin)
router.put(
  "/:id",
  fakeAuthAdmin,
  /* middlewareAuth,
   */
  checkRole("admin", "partenaire"),
  valider(updateEventSchema),
  eventController.updateEvent
);

// Suppression d’un événement
router.delete(
  "/:id",
  fakeAuthAdmin,
  /* middlewareAuth,
   */
  checkRole("admin"),
  eventController.deleteEvent
);

// Voir les événements par statut (admin uniquement)
router.get(
  "/statut/:status",
  fakeAuthAdmin,
  /* middlewareAuth,
   */
  checkRole("admin"),
  eventController.getEventsByStatus
);
router.patch(
  "/:id/statut",
  fakeAuthAdmin,
  /* middlewareAuth,
   */
  checkRole("admin"),
  eventController.updateStatut
);

export default router;
