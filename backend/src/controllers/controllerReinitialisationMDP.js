/* import ServiceReinitialisationMDP from "../services/serviceReinitialisationMDP.js";
import { ErreurAPI } from "../errors/erreurAPI.js";
import {
  schemaDemandeReinitialisation,
  schemaReinitialisationMDP,
} from "../validations/validationAuth.js";

class ControllerReinitialisationMDP {
  constructor() {
    this.serviceReinitialisation = new ServiceReinitialisationMDP();
  }

  async demanderReinitialisation(req, res, next) {
    try {
      const { err } = schemaDemandeReinitialisation.validate(req.body);
      if (err) throw new ErreurAPI(err.details[0].message, 400);

      const result =
        await this.serviceReinitialisation.demanderReinitialisation(
          req.body.email
        );
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async reinitialiserMotDePasse(req, res, next) {
    try {
      const { err } = schemaReinitialisationMDP.validate(req.body);
      if (err) throw new ErreurAPI(err.details[0].message, 400);

      const { token } = req.params;
      const { motDePasse } = req.body;

      const result = await this.serviceReinitialisation.reinitialiserMotDePasse(
        token,
        motDePasse
      );
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default ControllerReinitialisationMDP;
 */
