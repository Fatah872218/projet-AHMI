import BookingRepository from "../repositories/bookingRepository.js";

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
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
