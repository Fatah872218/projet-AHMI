import EventRepository from "../repositories/eventRepository.js";
import BookingRepository from "../repositories/bookingRepository.js";
import sanitizeHtml from "sanitize-html";

const cleanString = (input) => {
  return sanitizeHtml(input, {
    allowedTags: ["b", "i", "em", "strong", "u"],
    allowedAttributes: {},
  });
};

class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
    this.bookingRepository = new BookingRepository();
  }

  async createEvent(data) {
    try {
      const cleanedData = {
        ...data,
        titre: cleanString(data.titre),
        description: cleanString(data.description),
        lienSiteInternet: cleanString(data.lienSiteInternet),
        lienInstagram: cleanString(data.lienInstagram),
        imageUrl: cleanString(data.imageUrl),
        participationFinanciere: cleanString(data.participationFinanciere),
        lieu: {
          ...data.lieu,
          rue: cleanString(data.lieu?.rue),
          codePostal: cleanString(data.lieu?.codePostal),
          commune: cleanString(data.lieu?.commune),
        },
        organisateur: {
          nom: cleanString(data.organisateur?.nom),
          email: cleanString(data.organisateur?.email),
        },
      };
      return await this.eventRepository.create({
        ...cleanedData,
        statut: "en_attente",
      });
    } catch (err) {
      throw new Error(`Erreur création évènement : ${err.message}`);
    }
  }

  async getEventById(id) {
    try {
      const event = await this.eventRepository.findById(id);
      if (!event) throw new Error("Événement introuvable");

      // récupération des réservations liées à l'événement
      const reservations = await this.bookingRepository.findByEventId(id);
      const totalPlaces = reservations.reduce(
        (acc, r) => acc + (r.nombrePlaces || 1),
        0
      );

      const eventObject = event.toObject ? event.toObject() : event;
      eventObject.placesReservees = totalPlaces;

      return eventObject;
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

      const totalPlaces = await this.bookingRepository.countReservationsByEvent(
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
