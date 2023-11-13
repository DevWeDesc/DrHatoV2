-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "defaultMethodology" TEXT,
ADD COLUMN     "impressName" TEXT;

-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "defaultMethodology" TEXT,
ADD COLUMN     "impressName" TEXT;
