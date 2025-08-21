//src/controllers/bookingController.js
import BookingService from "../services/bookingService.js";

import bookingRepository from "../repositories/bookingRepository.js";
import eventRepository from "../repositories/eventRepository.js"; // 👈 à ne pas oublier

class BookingController {
  constructor() {
    this.bookingService = new BookingService(
      bookingRepository,
      eventRepository
    ); //
  }

  createBooking = async (req, res) => {
    console.info("BODY RÉCEPTIONNÉ PAR L'API:", req.body);

    try {
      if (!req.utilisateur) {
        return res.status(401).json({ message: "Utilisateur non connecté" });
      }
      //  Valeur temporaire pour utilisateur tant qu'il n'y a pas d'authentification
      //const utilisateurTemporaireId = "680b84c085ba22a4ef354661";
      //req.body.utilisateur = utilisateurTemporaireId;

      //if (!req.body.statut) req.body.statut = "confirme";

      const booking = await this.bookingService.createBooking({
        ...req.body,
        utilisateur: req.utilisateur.id,
        statut: req.body.statut || "confirme", // Par défaut
        //utilisateurTemporaireId,
      });

      res.status(201).json(booking);
    } catch (err) {
      console.error("Erreur lors de la création d'une réservation:", err);
      if (err.name === "ValidationError") {
        res
          .status(400)
          .json({ message: err.message, details: err.details || null });
      } else if (err.name === "UnauthorizedError") {
        res
          .status(401)
          .json({ message: err.message, details: err.details || null });
      } else {
        res
          .status(500)
          .json({ message: err.message, details: err.details || null });
      }
    }
  };

  getBookingById = async (req, res) => {
    try {
      const booking = await this.bookingService.getBookingById(req.params.id);
      if (!booking)
        return res.status(404).json({ message: "Réservation introuvable" });
      res.status(200).json(booking);
    } catch (err) {
      console.error("Erreur récupération réservation:", err);
      res.status(500).json({ message: err.message });
    }
  };

  getAllBookings = async (req, res) => {
    try {
      const bookings = await this.bookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (err) {
      console.error("Erreur récupération de toutes les réservations:", err);
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
      console.error("Erreur récupération des réservations utilisateur:", err);
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
      console.error("Erreur mise à jour réservation:", err);
      res.status(400).json({ message: err.message });
    }
  };

  deleteBooking = async (req, res) => {
    try {
      await this.bookingService.deleteBooking(req.params.id);
      res.status(200).json({ message: "Réservation annulée" });
    } catch (err) {
      console.error("Erreur suppression réservation:", err);
      res.status(500).json({ message: err.message });
    }
  };
}

export default new BookingController();
