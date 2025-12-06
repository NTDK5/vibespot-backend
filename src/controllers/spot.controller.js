// =============================
  // src/controllers/spot.controller.js
  // =============================
  
  import {
    createSpot,
    getSpotById,
    getAllSpots,
    updateSpot,
    deleteSpot,
    rateSpot,
  } from "../services/spot.service.js";
  import cloudinary from "../config/cloudinary.js";



  export const createSpotController = async (req, res, next) => {
    try {
      const data = req.body;
  
      // Map optional location
      if (data.location) {
        if (data.location.lat !== undefined) data.lat = data.location.lat;
        if (data.location.lng !== undefined) data.lng = data.location.lng;
        console.log(data.location)
        delete data.location;
        
      }
  
      // TEMP: allow createdBy to be optional
      if (!data.createdBy) {
        // for testing only, assign a dummy user id
        data.createdBy = "cmiq18cgx0000ik7krdv7qtg7";
      }

        // === NEW: handle images ===
      if (req.files && req.files.length > 0) {
        data.images = req.files.map(f => f.path);  // Cloudinary image URLs
        data.publicIds = req.files.map(f => f.filename); // IMPORTANT
        data.thumbnail = req.files[0].path; 
        console.log(data.images)// first image as thumbnail
      }
      console.log(req.files)
      const spot = await createSpot(data);
      res.status(201).json(spot);
    } catch (error) {
      next(error);
    }
  };
  
  export const getSpotByIdController = async (req, res, next) => {
    try {
      const spot = await getSpotById(req.params.id);
      res.json(spot);
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllSpotsController = async (req, res, next) => {
    try {
      const spots = await getAllSpots(req.query);
      res.json(spots);
    } catch (error) {
      next(error);
    }
  };
  
  // export const getSpotsByUserController = async (req, res, next) => {
  //   try {
  //     const spots = await getSpotsByUser(req.params.userId);
  //     res.json(spots);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  
  export const updateSpotController = async (req, res, next) => {
      try {
          const spotId = req.params.id;
          const existing = await getSpotById(spotId);

          const data = req.body;

          // If new images uploaded → respot old images
          if (req.files && req.files.length > 0) {

            // 1. Delete old Cloudinary images
            if (existing.publicIds && existing.publicIds.length > 0) {
              for (const id of existing.publicIds) {
                await cloudinary.uploader.destroy(id);
              }
            }

            // 2. Add new image URLs + publicIds
            data.images = req.files.map(f => f.path);
            data.publicIds = req.files.map(f => f.filename);
            data.thumbnail = req.files[0].path;  
          }

          const updated = await updateSpot(spotId, data);
          res.json(updated);

      } catch (error) {
        next(error);
      }

};
  
    export const deleteSpotController = async (req, res, next) => {
      try {
        const spotId = req.params.id;
        const spot = await getSpotById(spotId);

        // Delete Cloudinary images
        if (spot.publicIds && spot.publicIds.length > 0) {
          for (const id of spot.publicIds) {
            await cloudinary.uploader.destroy(id);
          }
        }

        // Delete from DB
        await deleteSpot(spotId);

        res.json({ message: "Spot deleted successfully" });

      } catch (error) {
        next(error);
      }
    };

  
  export const rejectSpotController = async (req, res, next) => {
    try {
      const updated = await rejectSpot(req.params.id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  export const rateSpotController = async (req, res, next) => {
    try {
      const updated = await rateSpot(req.params.id, req.body.rating);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  