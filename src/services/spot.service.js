
// =============================
// src/services/spot.service.js
// =============================
import { getPrisma } from "../loaders/prisma.js";

export const createSpot = async (data) => {
  return prisma.spot.create({ data });
};

export const getSpotById = async (id) => {
  return prisma.spot.findUnique({ where: { id } });
};

export const getAllSpots = async (filters = {}) => {
  return prisma.spot.findMany({ where: filters });
};

export const getSpotsByUser = async (userId) => {
  return prisma.spot.findMany({ where: { createdBy: userId } });
};

export const updateSpot = async (id, data) => {
  return prisma.spot.update({ where: { id }, data });
};

export const deleteSpot = async (id) => {
  return prisma.spot.delete({ where: { id } });
};

export const approveSpot = async (id) => {
  return prisma.spot.update({ where: { id }, data: { status: "approved" } });
};

export const rejectSpot = async (id) => {
  return prisma.spot.update({ where: { id }, data: { status: "rejected" } });
};

export const rateSpot = async (spotId, rating) => {
  const spot = await prisma.spot.findUnique({ where: { id: spotId } });

  const newCount = spot.ratingCount + 1;
  const newAvg = (spot.ratingAvg * spot.ratingCount + rating) / newCount;

  return prisma.spot.update({
    where: { id: spotId },
    data: {
      ratingAvg: newAvg,
      ratingCount: newCount,
    },
  });
};
