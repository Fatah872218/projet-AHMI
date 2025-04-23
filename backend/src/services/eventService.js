import EventRepository from "../repositories/eventRepository.js";
import BookingRepository from "../repositories/bookingRepository.js";

class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
    this.bookingRepository = new BookingRepository();
  }

  async createEvent(data) {
    try {
      return await this.eventRepository.create(data);
    } catch (err) {
      throw new Error(`Erreur création évènement : ${err.message}`);
    }
  }

  async getEventById(id) {
    try {
      return await this.eventRepository.findById(id);
    } catch (err) {
      throw new Error(`Erreur récupération évènement : ${err.message}`);
    }
  }

  async getAllEvents(filter = {}) {
    try {
      return await this.eventRepository.findAll(filter);
    } catch (err) {
      throw new Error(`Erreur récupération des évènements : ${err.message}`);
    }
  }

  async updateEvent(id, updateData) {
    try {
      return await this.eventRepository.update(id, updateData);
    } catch (err) {
      throw new Error(`Erreur mise à jour évènement : ${err.message}`);
    }
  }
  async updateStatut(id, statut, moderateurId) {
    try {
      const updateFields = {
        statut,
        dateModeration: new Date(),
        moderateur: moderateurId,
      };
      return await this.eventRepository.updateStatut(id, updateFields);
    } catch (err) {
      throw new Error(`Erreur mise à jour du statut : ${err.message}`);
    }
  }

  async deleteEvent(id) {
    try {
      return await this.eventRepository.delete(id);
    } catch (err) {
      throw new Error(`Erreur suppression évènement : ${err.message}`);
    }
  }

  async getEventsByStatus(status) {
    try {
      return await this.eventRepository.findByStatus(status);
    } catch (err) {
      throw new Error(`Erreur filtrage des évènements : ${err.message}`);
    }
  }
  async getPlacesRestantes(eventId) {
    try {
      const evenement = await this.eventRepository.findById(eventId);
      if (!evenement) throw new Error("Événement introuvable");

      const totalPlaces = await this.bookingRepository.countConfirmedBookings(
        eventId
      );

      return evenement.capaciteMax - totalPlaces;
    } catch (err) {
      throw new Error(
        `Erreur récupération des places restantes : ${err.message}`
      );
    }
  }
}

export default new EventService();
