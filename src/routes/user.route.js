import { Router } from "express";
import validate from '../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from "../validators/user.validator.js";
import {
  createUserController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  addSavedSpotController,
  removeSavedSpotController
} from "../controllers/user.controller.js";

const router = Router();

// User CRUD
router.post("/", validate(createUserSchema), createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", validate(updateUserSchema), updateUserController);
router.delete("/:id", deleteUserController);

// Saved places
router.post("/:id/saved-places", addSavedSpotController);
router.delete("/:id/saved-places", removeSavedSpotController);

export default router;
