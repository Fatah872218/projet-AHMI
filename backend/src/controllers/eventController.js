import EventService from "../services/eventService.js";

import mongoose from "mongoose";
import { updateEventSchema } from "../validations/eventSchemas.js";

class EventController {
  constructor() {
    this.eventService = EventService;
  }

  // Créer un événement (partner ou admin)
  createEvent = async (req, res) => {
    try {
      const event = await this.eventService.createEvent({
        ...req.body,
        statut: "en_attente", // Par défaut
        createur: req.utilisateur?.id,
        // Si connecté
      });
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Récupérer tous les événements (validés ou tout selon les rôles)
  getAllEvents = async (req, res) => {
    try {
      console.log(" Requête reçue pour getAllEvents");
      console.log(" Utilisateur connecté (req.utilisateur) :", req.utilisateur);

      console.log("Utilisateur courant dans getAllEvents :", req.utilisateur);

      const filter =
        req.utilisateur?.role === "admin" ? {} : { statut: "approuve" };

      console.log(" Filtre utilisé pour getAllEvents :", filter);

      const events = await this.eventService.getAllEvents(filter);
      console.log(" Événements retournés :", events.length);
      res.status(200).json(events);
    } catch (err) {
      console.error(" Erreur dans getAllEvents :", err.message);
      res.status(500).json({ message: err.message });
    }
  };

  // Obtenir un événement par ID (détail public ou privé)
  getEventById = async (req, res) => {
    try {
      const event = await this.eventService.getEventById(req.params.id);
      if (!event)
        return res.status(404).json({ message: "Évènement introuvable" });
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Mettre à jour un événement (par créateur ou admin)
  updateEvent = async (req, res) => {
    try {
      console.log(" Requête reçue (updateEvent) :", req.body);

      // Seul l’auteur (createur) ou admin peut modifier
      const existing = await this.eventService.getEventById(req.params.id);

      if (!existing) {
        return res.status(404).json({ message: "Événement non trouvé." });
      }

      if (
        existing.createur.toString() !== req.utilisateur.id &&
        req.utilisateur.role !== "admin"
      ) {
        return res.status(403).json({ message: "Accès refusé" });
      }

      const updatedEvent = await this.eventService.updateEvent(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedEvent) {
        return res.status(404).json({ message: "Événement non trouvé." });
      }

      res.status(200).json(updatedEvent);
    } catch (err) {
      console.error(" Erreur updateEvent :", err);
      res.status(400).json({
        message: "Erreur lors de la mise à jour de l'événement",
        error: err.message,
      });
    }
  };

  // Supprimer un événement
  deleteEvent = async (req, res) => {
    try {
      await this.eventService.deleteEvent(req.params.id);
      res.status(200).json({ message: "Évènement supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Filtrer les événements par statut (admin)
  getEventsByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const events = await this.eventService.getEventsByStatus(status);
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  updateStatut = async (req, res) => {
    try {
      const { statut } = req.body;
      const moderateurId =
        req.utilisateur?.id ||
        new mongoose.Types.ObjectId("000000000000000000000000");
      const event = await this.eventService.updateStatut(
        req.params.id,
        statut,
        moderateurId
      );
      res.status(200).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  getPlacesRestantes = async (req, res) => {
    try {
      const places = await this.eventService.getPlacesRestantes(req.params.id);
      res.status(200).json({ placesRestantes: places });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  getPlacesReservees = async (req, res) => {
    try {
      const { id } = req.params;
      const total = await bookingRepository.countReservationsByEvent(id);
      res.json({ total });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

export default new EventController();
