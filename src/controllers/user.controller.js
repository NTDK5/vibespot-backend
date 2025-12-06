// =============================
// src/controllers/user.controller.js
// =============================

import {
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
    addSavedSpot,
    removeSavedSpot,
  } from "../services/user.service.js";
  import { signAccessToken, signRefreshToken, hashRefreshToken } from "../utils/auth.js";
  import { getPrisma } from "../loaders/prisma.js";

  const ACCESS_PAYLOAD = (user) => ({
    sub: user.id,
    email: user.email,
    role: user.role || "user",
  });

  export const createUserController = async (req, res, next) => {
    const prisma = getPrisma();
    try {
      const user = await createUser(req.body);


    const accessToken = signAccessToken(ACCESS_PAYLOAD(user));
    const refreshTokenRaw = signRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshTokenRaw);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash },
    });
      
      
    res.cookie("refreshToken", refreshTokenRaw, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // 5. Return user and access token
    res.status(201).json({
      user,
      accessToken,
    });

    } catch (error) {
      next(error);
    }
  };
  
  export const getUserByIdController = async (req, res, next) => {
    try {
      const user = await getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllUsersController = async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateUserController = async (req, res, next) => {
    try {
      const updated = await updateUser(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteUserController = async (req, res, next) => {
    try {
      const deleted = await deleteUser(req.params.id);
      res.json(deleted);
    } catch (error) {
      next(error);
    }
  };
  
  export const addSavedSpotController = async (req, res, next) => {
    try {
      const updated = await addSavedSpot(req.params.id, req.body.spotId);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  export const removeSavedSpotController = async (req, res, next) => {
    try {
      const updated = await removeSavedSpot(req.params.id, req.body.spotId);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };
  
  