-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'superadmin');

-- CreateEnum
CREATE TYPE "SpotCategory" AS ENUM ('photo_spot', 'activity', 'gallery', 'workspace', 'restaurant');

-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('free', 'low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "SpotStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "profileImage" TEXT,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "savedSpots" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "SpotCategory" NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "thumbnail" TEXT,
    "priceRange" "PriceRange" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bestTime" TEXT,
    "status" "SpotStatus" NOT NULL DEFAULT 'pending',
    "createdBy" TEXT NOT NULL,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
