import express from "express";
import eventController from "../controllers/eventController.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  eventSchema as createEventSchema,
  updateEventSchema,
} from "../validations/eventSchemas.js";
import Joi from "joi";

const router = express.Router();

// Schéma pour changer le statut
const statusUpdateSchema = Joi.object({
  statut: Joi.string().valid("en_attente", "approuve", "rejete").required(),
});

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
  checkRole("admin"),
  validateObjectId,
  valider(statusUpdateSchema),
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
  checkRole("admin", "partenaire"),
  validateObjectId,
  valider(updateEventSchema),
  eventController.updateEvent
);

router.delete(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  eventController.deleteEvent
);

export default router;
