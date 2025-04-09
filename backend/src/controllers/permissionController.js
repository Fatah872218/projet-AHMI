// src/controllers/permissionController.js
import ServicePermission from "../services/servicePermission.js";

class PermissionController {
  async creer(req, res) {
    try {
      const permission = await ServicePermission.creerPermission(req.body);
      res.status(201).json(permission);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async lister(req, res) {
    try {
      const permissions = await ServicePermission.getPermissions();
      res.status(200).json(permissions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async modifier(req, res) {
    try {
      const permission = await ServicePermission.modifierPermission(
        req.params.id,
        req.body
      );
      res.status(200).json(permission);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async supprimer(req, res) {
    try {
      await ServicePermission.supprimerPermission(req.params.id);
      res.status(200).json({ message: "Permission supprimée" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new PermissionController();
