import BookingRepository from "../repositories/bookingRepository.js";
import Evenement from "../models/modeleEvenement.js";

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }
  // Créer une réservation

  async createBooking(data) {
    const existingBooking =
      await this.bookingRepository.findBookingByUserAndEvent(
        data.utilisateur,
        data.evenement
      );

    if (existingBooking) {
      // Juste un message d'avertissement, on ne bloque pas la suite
      return {
        ...existingBooking.toObject(),
        alerte:
          "Attention : vous avez déjà une réservation pour cet événement.",
        doublonDetecte: true,
      };
    }
    try {
      const evenement = await Evenement.findById(data.evenement);
      if (!evenement) throw new Error("Événement introuvable");

      const totalPlaces = await this.bookingRepository.countConfirmedBookings(
        data.evenement
      );

      const placesRestantes = evenement.capaciteMax - totalPlaces;

      if (data.nombrePlaces > placesRestantes) {
        throw new Error(
          `Réservation impossible : ${placesRestantes} place(s) restante(s)`
        );
      }

      return await this.bookingRepository.createBooking(data);
    } catch (err) {
      throw new Error(`Erreur création réservation : ${err.message}`);
    }
  }

  async getBookingById(id) {
    try {
      return await this.bookingRepository.findById(id);
    } catch (err) {
      throw new Error(`Erreur récupération réservation : ${err.message}`);
    }
  }

  async getAllBookings(filter = {}) {
    try {
      return await this.bookingRepository.findAll(filter);
    } catch (err) {
      throw new Error(`Erreur récupération réservations : ${err.message}`);
    }
  }

  async getBookingsByUser(userId) {
    try {
      return await this.bookingRepository.findByUser(userId);
    } catch (err) {
      throw new Error(`Erreur réservations utilisateur : ${err.message}`);
    }
  }

  async updateBooking(id, updateData) {
    try {
      return await this.bookingRepository.updateBooking(id, updateData);
    } catch (err) {
      throw new Error(`Erreur mise à jour réservation : ${err.message}`);
    }
  }

  async deleteBooking(id) {
    try {
      return await this.bookingRepository.deleteBooking(id);
    } catch (err) {
      throw new Error(`Erreur suppression réservation : ${err.message}`);
    }
  }
}

export default new BookingService();
