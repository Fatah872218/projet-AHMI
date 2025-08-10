import express from "express";
import eventController from "../controllers/eventController.js";
//import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import {
  eventSchema as createEventSchema,
  updateEventSchema,
} from "../validations/eventSchemas.js";
import valider from "../middlewares/middlewareValidation.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = express.Router();

// ROUTES SPÉCIFIQUES EN PREMIER
router.get(
  "/statut/:status",
  middlewareAuth,
  checkRole("admin"),
  eventController.getEventsByStatus
);
router.patch(
  "/:id/statut",
  middlewareAuth,
  validateObjectId,
  checkRole("admin"),
  eventController.updateStatut
);
router.get(
  "/:id/places-restantes",
  middlewareAuth,
  validateObjectId,
  eventController.getPlacesRestantes
);

// ROUTES GÉNÉRIQUES ENSUITE
router.get("/", middlewareAuth, eventController.getAllEvents);
router.get(
  "/:id",
  middlewareAuth,
  validateObjectId,
  eventController.getEventById
);

// CRÉATION / MÀJ / SUPPRESSION
router.post(
  "/",
  middlewareAuth,
  checkRole("admin", "partenaire"),
  valider(createEventSchema),
  eventController.createEvent
);
router.put(
  "/:id",
  middlewareAuth,
  validateObjectId,
  checkRole("admin", "partenaire"),
  valider(updateEventSchema),
  eventController.updateEvent
);
router.delete(
  "/:id",
  middlewareAuth,
  validateObjectId,
  checkRole("admin"),
  eventController.deleteEvent
);

export default router;
