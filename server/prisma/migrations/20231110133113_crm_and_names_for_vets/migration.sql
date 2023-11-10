-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "requestedCrm" TEXT,
ADD COLUMN     "responsibleForCrm" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;
