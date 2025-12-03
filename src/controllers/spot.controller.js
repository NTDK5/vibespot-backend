// =============================
  // src/controllers/spot.controller.js
  // =============================
  
  import {
    createSpot,
    getSpotById,
    getAllSpots,
    getSpotsByUser,
    updateSpot,
    deleteSpot,
    approveSpot,
    rejectSpot,
    rateSpot,
  } from "../services/spot.service.js";
  
  export const createSpotController = async (req, res, next) => {
    try {
      req.body.createdBy = req.user?.id || req.body.createdBy;
      const spot = await createSpot(req.body);
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
  
  export const getSpotsByUserController = async (req, res, next) => {
    try {
      const spots = await getSpotsByUser(req.params.userId);
      res.json(spots);
    } catch (error) {
      next(error);
    }
  };
  
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
  