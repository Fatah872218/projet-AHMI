import express from "express";
import PermissionController from "../controllers/permissionController.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "../validations/permissionSchemas.js";

const router = express.Router();

router.get("/", middlewareAuth, PermissionController.lister);

router.post(
  "/",
  middlewareAuth,
  valider(createPermissionSchema),
  PermissionController.creer
);

router.put(
  "/:id",
  middlewareAuth,
  validateObjectId,
  valider(updatePermissionSchema),
  PermissionController.modifier
);

router.delete(
  "/:id",
  middlewareAuth,
  validateObjectId,
  PermissionController.supprimer
);

export default router;
