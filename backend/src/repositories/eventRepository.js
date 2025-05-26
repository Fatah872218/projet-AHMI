import Evenement from "../models/modeleEvenement.js";

class EventRepository {
  async create(eventData) {
    try {
      const event = new Evenement(eventData);
      return await event.save();
    } catch (err) {
      throw new Error(`Erreur création évènement : ${err.message}`);
    }
  }

  async findById(id) {
    try {
      return await Evenement.findById(id)
        .populate("categories") // ➕
        .populate("createur")
        .populate("moderateur");
    } catch (err) {
      throw new Error(`Erreur recherche évènement : ${err.message}`);
    }
  }

  async getEventById(id) {
    try {
      return await Evenement.findById(id)
        .populate("categories") // ➕ récupère les noms
        .populate("createur")
        .populate("moderateur");
    } catch (err) {
      throw new Error(`Erreur récupération évènement par ID : ${err.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const updated = await Evenement.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      return updated;
    } catch (err) {
      throw new Error(`Erreur mise à jour évènement : ${err.message}`);
    }
  }

  async delete(id) {
    try {
      return await Evenement.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(`Erreur suppression évènement : ${err.message}`);
    }
  }

  async findAll(filter = {}) {
    try {
      return await Evenement.find(filter)
        .populate("createur")
        .populate("categories");
    } catch (err) {
      throw new Error(`Erreur récupération évènements : ${err.message}`);
    }
  }

  async findByStatus(status) {
    try {
      return await Evenement.find({ statut: status });
    } catch (err) {
      throw new Error(`Erreur filtrage des évènements : ${err.message}`);
    }
  }

  async updateStatut(id, fields) {
    try {
      return await Evenement.findByIdAndUpdate(id, fields, { new: true });
    } catch (err) {
      throw new Error(`Erreur changement de statut : ${err.message}`);
    }
  }

  async incrementPlacesReservees(eventId, delta) {
    return await Evenement.findByIdAndUpdate(
      eventId,
      { $inc: { placesReservees: delta } },
      { new: true }
    );
  }
}

export default EventRepository;
