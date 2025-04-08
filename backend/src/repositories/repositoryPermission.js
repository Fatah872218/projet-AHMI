//gestion des opérations CRUD pour les permissions.
import Permission from "../models/modelePermission.js";

class PermissionRepository {
  // Créer une nouvelle permission
  async createPermission(permissionData) {
    try {
      const permission = new Permission(permissionData);
      return await permission.save();
    } catch (err) {
      throw new Error(
        `Erreur lors de la création de la permission : ${err.message}`
      );
    }
  }

  // Trouver une permission par son nom
  async findByName(nom) {
    try {
      return await Permission.findOne({ nom });
    } catch (err) {
      throw new Error(
        `Erreur lors de la recherche de la permission par nom : ${err.message}`
      );
    }
  }

  // Trouver une permission par son ID
  async findById(id) {
    try {
      return await Permission.findById(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la recherche de la permission par ID : ${err.message}`
      );
    }
  }

  // Mettre à jour une permission
  async updatePermission(id, updateData) {
    try {
      return await Permission.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      throw new Error(
        `Erreur lors de la mise à jour de la permission : ${err.message}`
      );
    }
  }

  // Supprimer une permission
  async deletePermission(id) {
    try {
      return await Permission.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la suppression de la permission : ${err.message}`
      );
    }
  }
}

export default PermissionRepository;
