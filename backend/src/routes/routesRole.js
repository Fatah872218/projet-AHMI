import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  createRoleSchema,
  updateRoleSchema,
} from "../validations/roleSchemas.js";

const router = express.Router();
const controleurRole = new ControleurRole();

router.get("/", middlewareAuth, checkRole("admin"), controleurRole.getAllRoles);
router.get("/:nom", controleurRole.getRole);

router.post(
  "/",
  middlewareAuth,
  checkRole("admin"),
  valider(createRoleSchema),
  controleurRole.createRole
);

router.put(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  valider(updateRoleSchema),
  controleurRole.updateRole
);

router.delete(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  controleurRole.deleteRole
);

export default router;
