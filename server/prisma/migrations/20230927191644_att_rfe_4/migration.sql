-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "isMultiPart" BOOLEAN DEFAULT false,
ADD COLUMN     "isOnePart" BOOLEAN DEFAULT false,
ADD COLUMN     "isReportByText" BOOLEAN DEFAULT false;
