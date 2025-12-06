-- AlterTable
ALTER TABLE "Spot" ADD COLUMN     "publicIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
