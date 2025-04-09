import ServiceRole from "../services/serviceRole.js";

class ControleurRole {
  constructor() {
    this.serviceRole = new ServiceRole();
  }

  createRole = async (req, res) => {
    try {
      const role = await this.serviceRole.createRole(req.body);
      res.status(201).json(role);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getRole = async (req, res) => {
    try {
      const role = await this.serviceRole.getRoleByName(req.params.nom);
      res.status(200).json(role);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  updateRole = async (req, res) => {
    try {
      const role = await this.serviceRole.updateRole(req.params.id, req.body);
      res.status(200).json(role);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  deleteRole = async (req, res) => {
    try {
      await this.serviceRole.deleteRole(req.params.id);
      res.status(200).json({ message: "Rôle supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  getAllRoles = async (req, res) => {
    try {
      const roles = await this.serviceRole.getAllRoles();
      res.status(200).json(roles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default ControleurRole;
