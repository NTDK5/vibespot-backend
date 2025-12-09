-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SpotCategory" ADD VALUE 'art';
ALTER TYPE "SpotCategory" ADD VALUE 'sports';
ALTER TYPE "SpotCategory" ADD VALUE 'entertainment';
ALTER TYPE "SpotCategory" ADD VALUE 'nature';

-- AlterTable
ALTER TABLE "Spot" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];
