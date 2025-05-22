//src/controllers/bookingController.js
import BookingService from "../services/bookingService.js";

import bookingRepository from "../repositories/bookingRepository.js";
import eventRepository from "../repositories/eventRepository.js"; // 👈 à ne pas oublier

const bookingService = new BookingService(bookingRepository, eventRepository); // 👈 les deux arguments sont nécessaires

class BookingController {
  constructor() {
    this.bookingService = new BookingService(
      bookingRepository,
      eventRepository
    ); //
  }

  createBooking = async (req, res) => {
    try {
      //if (!req.utilisateur) {
      //  return res.status(401).json({ message: "Utilisateur non connecté" });
      // }
      console.log(" controller req.body", req.body);

      const booking = await this.bookingService.createBooking({
        ...req.body,
        utilisateur: "680b84c085ba22a4ef354661", // req.utilisateur.id,
      });
      console.log("controller booking", booking);
      res.status(200).json(booking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getBookingById = async (req, res) => {
    try {
      const booking = await this.bookingService.getBookingById(req.params.id);
      if (!booking)
        return res.status(404).json({ message: "Réservation introuvable" });
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getAllBookings = async (req, res) => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getMyBookings = async (req, res) => {
    try {
      //const userId = "680b84c085ba22a4ef354661";
      //const bookings = await this.bookingService.getBookingsByUser(userId);
      const bookings = await this.bookingService.getAllBookings(); // simulate admin
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  updateBooking = async (req, res) => {
    try {
      const booking = await this.bookingService.updateBooking(
        req.params.id,
        req.body
      );
      res.status(200).json(booking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  deleteBooking = async (req, res) => {
    try {
      await this.bookingService.deleteBooking(req.params.id);
      res.status(200).json({ message: "Réservation annulée" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default new BookingController();
