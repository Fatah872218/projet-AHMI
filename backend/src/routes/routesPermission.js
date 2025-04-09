import express from "express";
import PermissionController from "../controllers/permissionController.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();

router.get("/", middlewareAuth, PermissionController.lister);
router.post("/", middlewareAuth, PermissionController.creer);
router.put("/:id", middlewareAuth, PermissionController.modifier);
router.delete("/:id", middlewareAuth, PermissionController.supprimer);

export default router;
