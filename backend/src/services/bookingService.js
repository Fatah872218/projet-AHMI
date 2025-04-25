//src/services/bookingService.js
import BookingRepository from "../repositories/bookingRepository.js";

import EventRepository from "../repositories/eventRepository.js"; // 👈 à ne pas oublier

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.eventRepository = new EventRepository();
  }

  async createBooking(data) {
    try {
      /* const existingBooking =
        await this.bookingRepository.findBookingByUserAndEvent(
          data.utilisateur,
          data.evenement
        ); */
      const existingBooking =
        await this.bookingRepository.findBookingByUserAndEvent(
          data.utilisateur,
          data.evenement
        );

      const doublonDetecte = !!existingBooking;
      let alerte = "";
      if (doublonDetecte) {
        alerte =
          "Attention : vous avez déjà une réservation pour cet événement.";
      }

      const event = await this.eventRepository.getEventById(data.evenement);
      if (!event) {
        throw new Error("Événement introuvable");
      }

      const nbReservations =
        await this.bookingRepository.countReservationsByEvent(data.evenement);
      const placesRestantes = event.capaciteMax - nbReservations;

      if (data.nombrePlaces > placesRestantes) {
        throw new Error(
          `Il ne reste que ${placesRestantes} place(s) disponible(s)`
        );
      }
      console.log(
        " service nbReservations placesRestantes",
        nbReservations,
        placesRestantes
      );

      const nouvelleReservation = await this.bookingRepository.createBooking(
        data
      );
      console.log("nouvelle Reservation", nouvelleReservation);

      return {
        nouvelleReservation,
        alerte,
        doublonDetecte,
      };
      //return nouvelleReservation;
    } catch (error) {
      throw new Error(`Erreur création réservation : ${error.message}`);
    }
  }

  async getAllBookings() {
    const bookings = await this.bookingRepository.findAll();
    return bookings;
  }
  async getBookingById(id) {
    const booking = await this.bookingRepository.findById(id);
    return booking;
  }

  async updateBooking(id, data) {
    const updated = await this.bookingRepository.updateBooking(id, data);
    return updated;
  }

  async deleteBooking(id) {
    return await this.bookingRepository.deleteBooking(id);
  }

  async getBookingsByUser(userId) {
    const bookings = await this.bookingRepository.findByUser(userId);
    return bookings;
  }
}

export default BookingService;
