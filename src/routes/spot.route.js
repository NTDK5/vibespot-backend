import { Router } from "express";
import validate from "../middlewares/validate.js";

import {
  createSpotSchema,
  updateSpotSchema,
  rateSpotSchema
} from "../validators/spot.validator.js";

import {
  createSpotController,
  getAllSpotsController,
  getSpotByIdController,
  updateSpotController,
  deleteSpotController,
  rateSpotController
} from "../controllers/spot.controller.js";

const router = Router();

// Create Spot
router.post("/", validate(createSpotSchema), createSpotController);

// Get All Spots
router.get("/", getAllSpotsController);

// Get One Spot
router.get("/:id", getSpotByIdController);

// Get Spots Created by a User
// router.get("/user/:userId", getSpotsByUserController);

// Update Spot
router.put("/:id", validate(updateSpotSchema), updateSpotController);

// Delete Spot
router.delete("/:id", deleteSpotController);

// // Approve Spot
// router.put("/:id/approve", approveSpotController);

// // Reject Spot
// router.put("/:id/reject", rejectSpotController);

// Rate Spot
router.post("/:id/rate", validate(rateSpotSchema), rateSpotController);

export default router;
