/*
  Warnings:

  - You are about to drop the column `status` on the `Spot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spot" DROP COLUMN "status",
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lng" DROP NOT NULL;
