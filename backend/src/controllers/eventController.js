import EventService from "../services/eventService.js";

import mongoose from "mongoose";

class EventController {
  constructor() {
    this.eventService = EventService;
  }

  // Créer un événement (partner ou admin)
  createEvent = async (req, res) => {
    try {
      const event = await this.eventService.createEvent({
        ...req.body,
        createur: req.utilisateur?.id, // Si connecté
      });
      res.status(201).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Récupérer tous les événements (validés ou tout selon les rôles)
  getAllEvents = async (req, res) => {
    try {
      const { statut } = req.query;
      const filter = statut ? { statut } : {};
      const events = await this.eventService.getAllEvents(filter);
      res.status(200).json(events);
    } catch (err) {
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
      const event = await this.eventService.updateEvent(
        req.params.id,
        req.body
      );
      res.status(200).json(event);
    } catch (err) {
      res.status(400).json({ message: err.message });
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
}

export default new EventController();
