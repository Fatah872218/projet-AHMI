import BookingService from "../services/bookingService.js";
import { formatReservation } from "../utils/utilsFormatDate.js";

class BookingController {
  constructor() {
    this.bookingService = BookingService;
  }

  // Créer une réservation
  createBooking = async (req, res) => {
    try {
      const booking = await this.bookingService.createBooking({
        ...req.body,
        utilisateur: req.utilisateur?.id, // Si connecté
      });
      res.status(200).json(formatReservation(booking));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Obtenir une réservation par ID
  getBookingById = async (req, res) => {
    try {
      const booking = await this.bookingService.getBookingById(req.params.id);
      if (!booking)
        return res.status(404).json({ message: "Réservation introuvable" });
      res.status(200).json(formatReservation(booking));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Obtenir toutes les réservations (admin)
  getAllBookings = async (req, res) => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.status(200).json(bookings.map(formatReservation));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Obtenir les réservations de l'utilisateur connecté
  getMyBookings = async (req, res) => {
    try {
      const bookings = await this.bookingService.getBookingsByUser(
        req.utilisateur.id
      );
      res.status(200).json(bookings.map(formatReservation));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Mettre à jour une réservation (nb places)
  updateBooking = async (req, res) => {
    try {
      const booking = await this.bookingService.updateBooking(
        req.params.id,
        req.body
      );
      res.status(200).json(formatReservation(booking));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Supprimer une réservation
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
