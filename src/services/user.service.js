// src/services/user.service.js

import { getPrisma } from "../loaders/prisma.js";
import { hashPassword } from "../utils/auth.js";


const prisma = getPrisma(); 

export const createUser = async (data) => {
  // Check duplicate email
  const prisma = getPrisma(); 

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 400;
    throw error;
  };

  if (!data.password) {
    const error = new Error("Password is required");
    error.status = 400;
    throw error;
  }

  const hashed = await hashPassword(data.password);

  const createData = { ...data, password: hashed };

  return prisma.user.create({ data: createData  });
};


export const getUserById = async (id) => {
const prisma = getPrisma(); 

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};


export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};


export const getAllUsers = async () => {
  const prisma = getPrisma();
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};


export const updateUser = async (id, data) => {
const prisma = getPrisma(); 

  // Ensure user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Prevent duplicate email on update
  if (data.email) {
    const emailOwner = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailOwner && emailOwner.id !== id) {
      const error = new Error("Email already taken by another user");
      error.status = 400;
      throw error;
    }
  }

  return prisma.user.update({
    
    where: { id },
    data,
  });
};


export const deleteUser = async (id) => {
  const prisma = getPrisma(); 

  // Ensure user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return prisma.user.delete({
    where: { id },
  });
};


// =============================
// Manage Saved Spots
// =============================

export const addSavedSpot = async (userId, spotId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Prevent duplicate saved spots
  if (user.savedSpots.includes(spotId)) {
    const error = new Error("Spot already saved");
    error.status = 400;
    throw error;
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      savedSpots: {
        push: spotId,
      },
    },
  });
};


export const removeSavedSpot = async (userId, spotId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const filteredSpots = user.savedSpots.filter((id) => id !== spotId);

  return prisma.user.update({
    where: { id: userId },
    data: {
      savedSpots: filteredSpots,
    },
  });
};
