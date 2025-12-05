import { getPrisma } from "../loaders/prisma.js";

const prisma = getPrisma();

/* --------------------------------------------
   Helpers
--------------------------------------------- */

const throwErr = (msg, status = 400) => {
  const err = new Error(msg);
  err.status = status;
  throw err;
};

/* --------------------------------------------
   Create Spot
--------------------------------------------- */

export const createSpot = async (data) => {
  const prisma = getPrisma();

  // 2. Prevent exact duplicate spot (title + address)
  const existing = await prisma.spot.findFirst({
    where: {
      title: data.title,
      address: data.address,
    },
  });
  if (existing) throwErr("Spot already exists with the same title and address");

  // 3. Create new spot
  return prisma.spot.create({ data });
};

/* --------------------------------------------
   Get Single Spot
--------------------------------------------- */

export const getSpotById = async (id) => {
  const spot = await prisma.spot.findUnique({ where: { id } });
  if (!spot) throwErr("Spot not found", 404);
  return spot;
};

/* --------------------------------------------
   Get All Spots with Filters
--------------------------------------------- */

export const getAllSpots = async (filters = {}) => {
  return prisma.spot.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
};

/* --------------------------------------------
   Get Spots by User
--------------------------------------------- */

// export const getSpotsByUser = async (userId) => {
//   return prisma.spot.findMany({
//     where: { createdBy: userId },
//     orderBy: { createdAt: "desc" },
//   });
// };

/* --------------------------------------------
   Update Spot
--------------------------------------------- */

export const updateSpot = async (id, data) => {
  const spot = await prisma.spot.findUnique({ where: { id } });
  if (!spot) throwErr("Spot not found", 404);

  return prisma.spot.update({
    where: { id },
    data,
  });
};

/* --------------------------------------------
   Delete Spot
--------------------------------------------- */

export const deleteSpot = async (id) => {
  const existing = await prisma.spot.findUnique({ where: { id } });
  if (!existing) throwErr("Spot not found", 404);

  return prisma.spot.delete({ where: { id } });
};

/* --------------------------------------------
   Approve Spot
// --------------------------------------------- */

// export const approveSpot = async (id) => {
//   const spot = await prisma.spot.findUnique({ where: { id } });
//   if (!spot) throwErr("Spot not found", 404);

//   if (spot.status === "approved")
//     throwErr("Spot is already approved");

//   return prisma.spot.update({
//     where: { id },
//     data: { status: "approved" },
//   });
// };

/* --------------------------------------------
   Reject Spot
--------------------------------------------- */

// export const rejectSpot = async (id) => {
//   const spot = await prisma.spot.findUnique({ where: { id } });
//   if (!spot) throwErr("Spot not found", 404);

//   if (spot.status === "rejected")
//     throwErr("Spot is already rejected");

//   return prisma.spot.update({
//     where: { id },
//     data: { status: "rejected" },
//   });
// };

/* --------------------------------------------
   Rate Spot (supports 1–5 stars)
--------------------------------------------- */

export const rateSpot = async (spotId, rating, userId) => {
  if (rating < 1 || rating > 5)
    throwErr("Rating must be between 1 and 5");

  const spot = await prisma.spot.findUnique({
    where: { id: spotId },
  });
  if (!spot) throwErr("Spot not found", 404);

  // Prevent double-rating by same user
  const alreadyRated = await prisma.spotRating.findFirst({
    where: { userId, spotId },
  });

  if (alreadyRated) throwErr("You already rated this spot");

  // Save rating record
  await prisma.spotRating.create({
    data: {
      userId,
      spotId,
      value: rating,
    },
  });

  // Update aggregate rating
  const newCount = spot.ratingCount + 1;
  const newAvg =
    (spot.ratingAvg * spot.ratingCount + rating) / newCount;

  return prisma.spot.update({
    where: { id: spotId },
    data: {
      ratingAvg: newAvg,
      ratingCount: newCount,
    },
  });
};
