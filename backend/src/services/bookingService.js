//src/services/bookingService.js
import BookingRepository from "../repositories/bookingRepository.js";

import EventRepository from "../repositories/eventRepository.js"; //

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.eventRepository = new EventRepository();
  }

  async createBooking(data) {
    console.info(" Données reçues pour création réservation :", data);
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
      const capaciteMax = event.capaciteMax;

      let placesRestantes = null;

      if (typeof capaciteMax === "number") {
        placesRestantes = capaciteMax - nbReservations;

        if (placesRestantes < 0) {
          throw new Error("Nombre de places restantes invalide (négatif)");
        }

        if (data.nombrePlaces > placesRestantes) {
          throw new Error(
            `Il ne reste que ${placesRestantes} place(s) disponible(s)`
          );
        }
      }

      console.info(
        " service nbReservations placesRestantes",
        nbReservations,
        placesRestantes
      );

      const nouvelleReservation = await this.bookingRepository.createBooking(
        data
      );
      console.info("reservation créée", nouvelleReservation);
      // Met à jour le champ placesReservees sur l'événement
      await this.eventRepository.incrementPlacesReservees(
        data.evenement,
        data.nombrePlaces
      );
      return {
        nouvelleReservation,
        alerte,
        doublonDetecte,
        placesRestantes,
        nbReservations,
      };
      //return nouvelleReservation;
    } catch (error) {
      console.error("Erreur création réservation :", error.message);
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
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new Error("Réservation introuvable");

    const ancienneQuantite = booking.nombrePlaces;
    const nouvelleQuantite = data.nombrePlaces;
    const diff = nouvelleQuantite - ancienneQuantite;

    // 🔒 Ajout du contrôle ici
    const event = await this.eventRepository.getEventById(
      booking.evenement._id || booking.evenement
    );
    if (!event) throw new Error("Événement introuvable");

    const nbTotalReserve =
      await this.bookingRepository.countReservationsByEvent(event._id);

    const capaciteMax = event.capaciteMax;
    if (capaciteMax !== undefined && capaciteMax !== null) {
      const placesRestantes = capaciteMax - nbTotalReserve + ancienneQuantite;
      if (nouvelleQuantite > placesRestantes) {
        throw new Error(
          `Il ne reste que ${placesRestantes} place(s) disponible(s)`
        );
      }
    }

    const updated = await this.bookingRepository.updateBooking(id, data);

    if (diff !== 0) {
      await this.eventRepository.incrementPlacesReservees(event._id, diff);
    }

    return updated;
  }

  async deleteBooking(id) {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new Error("Réservation introuvable");

    await this.bookingRepository.deleteBooking(id);
    await this.eventRepository.incrementPlacesReservees(
      booking.evenement._id || booking.evenement,
      -booking.nombrePlaces
    );

    return { message: "Réservation annulée et événement mis à jour." };
  }

  async getBookingsByUser(userId) {
    const bookings = await this.bookingRepository.findByUser(userId);
    return bookings;
  }
}

export default BookingService;
