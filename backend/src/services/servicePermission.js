// src/services/servicePermission.js
import PermissionRepository from "../repositories/repositoryPermission.js";

class ServicePermission {
  constructor() {
    this.repository = new PermissionRepository();
  }

  async creerPermission(data) {
    return await this.repository.createPermission(data);
  }

  async getPermissions() {
    return await this.repository.getAllPermissions();
  }

  async modifierPermission(id, data) {
    return await this.repository.updatePermission(id, data);
  }

  async supprimerPermission(id) {
    return await this.repository.deletePermission(id);
  }
}

export default new ServicePermission();
