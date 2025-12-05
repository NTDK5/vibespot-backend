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
  
  export const createSpotController = async (req, res, next) => {
    try {
      const data = req.body;
  
      // Map optional location
      if (data.location) {
        if (data.location.lat !== undefined) data.lat = data.location.lat;
        if (data.location.lng !== undefined) data.lng = data.location.lng;
        delete data.location;
      }
  
      // TEMP: allow createdBy to be optional
      if (!data.createdBy) {
        // for testing only, assign a dummy user id
        data.createdBy = "cmiq18cgx0000ik7krdv7qtg7";
      }
  
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
      const updated = await updateSpot(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteSpotController = async (req, res, next) => {
    try {
      const deleted = await deleteSpot(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };
  
  export const approveSpotController = async (req, res, next) => {
    try {
      const updated = await approveSpot(req.params.id);
      res.json(updated);
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
  