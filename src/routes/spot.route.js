import { Router } from "express";
import validate from "../middlewares/validate.js";
import upload  from "../config/upload.js"
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

import { updateSpot } from "../services/spot.service.js";
const router = Router();

// Create Spot
router.post("/", validate(createSpotSchema), upload.array("images", 5),  createSpotController);

// Get All Spots
router.get("/", getAllSpotsController);

// Get One Spot
router.get("/:id", getSpotByIdController);

// Get Spots Created by a User
// router.get("/user/:userId", getSpotsByUserController);

// Update Spot
router.put("/:id", validate(updateSpotSchema),upload.array("images", 5),  updateSpotController);

// Delete Spot
router.delete("/:id", upload.array("images", 5),  deleteSpotController);

router.post("/:id/images", upload.array("images", 10), async (req, res, next) => {
  try {
    if (!req.files) return res.status(400).json({ error: "No files uploaded" });

    const images = req.files.map(f => f.path);
    const publicIds = req.files.map(f => f.filename);

    const spot = await updateSpot(req.params.id, {
      images,
      publicIds,
      thumbnail: images[0]
    });

    res.json({ success: true, images });
  } catch (err) {
    next(err);
  }
});


// // Approve Spot
// router.put("/:id/approve", approveSpotController);

// // Reject Spot
// router.put("/:id/reject", rejectSpotController);

// Rate Spot
router.post("/:id/rate", validate(rateSpotSchema), rateSpotController);

export default router;
