import express from "express";
import eventController from "../controllers/eventController.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import {
  eventSchema as createEventSchema,
  updateEventSchema,
} from "../validations/eventSchemas.js";
import valider from "../middlewares/middlewareValidation.js";

const router = express.Router();

// ROUTES SPÉCIFIQUES EN PREMIER
router.get(
  "/statut/:status",
  fakeAuthAdmin,
  checkRole("admin"),
  eventController.getEventsByStatus
);
router.patch(
  "/:id/statut",
  fakeAuthAdmin,
  checkRole("admin"),
  eventController.updateStatut
);
router.get(
  "/:id/places-restantes",
  fakeAuthAdmin,
  eventController.getPlacesRestantes
);

// ROUTES GÉNÉRIQUES ENSUITE
router.get("/", fakeAuthAdmin, eventController.getAllEvents);
router.get("/:id", fakeAuthAdmin, eventController.getEventById);

// CRÉATION / MÀJ / SUPPRESSION
router.post(
  "/",
  fakeAuthAdmin,
  checkRole("admin", "partenaire"),
  valider(createEventSchema),
  eventController.createEvent
);
router.put(
  "/:id",
  fakeAuthAdmin,
  checkRole("admin", "partenaire"),
  valider(updateEventSchema),
  eventController.updateEvent
);
router.delete(
  "/:id",
  fakeAuthAdmin,
  checkRole("admin"),
  eventController.deleteEvent
);

export default router;
