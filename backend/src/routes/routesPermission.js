import express from "express";
import PermissionController from "../controllers/permissionController.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
// import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();

router.get(
  "/",
  fakeAuthAdmin,
  /* middlewareAuth,  */ PermissionController.lister
);
router.post(
  "/",
  fakeAuthAdmin,
  /* middlewareAuth,  */ PermissionController.creer
);
router.put(
  "/:id",
  fakeAuthAdmin,
  /* middlewareAuth,  */ PermissionController.modifier
);
router.delete(
  "/:id",
  fakeAuthAdmin,
  /* middlewareAuth,  */ PermissionController.supprimer
);

export default router;
