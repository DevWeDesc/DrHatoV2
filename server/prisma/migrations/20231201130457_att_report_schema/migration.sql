/*
  Warnings:

  - You are about to drop the column `isMultiPart` on the `ExamsForPet` table. All the data in the column will be lost.
  - You are about to drop the column `isOnePart` on the `ExamsForPet` table. All the data in the column will be lost.
  - You are about to drop the column `isReportByText` on the `ExamsForPet` table. All the data in the column will be lost.
  - You are about to drop the column `isMultiPart` on the `ReportForExams` table. All the data in the column will be lost.
  - You are about to drop the column `isOnePart` on the `ReportForExams` table. All the data in the column will be lost.
  - You are about to drop the column `isReportByText` on the `ReportForExams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExamsForPet" DROP COLUMN "isMultiPart",
DROP COLUMN "isOnePart",
DROP COLUMN "isReportByText",
ADD COLUMN     "byReport" BOOLEAN,
ADD COLUMN     "onePart" BOOLEAN,
ADD COLUMN     "twoPart" BOOLEAN;

-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "isMultiPart",
DROP COLUMN "isOnePart",
DROP COLUMN "isReportByText",
ADD COLUMN     "byReport" BOOLEAN,
ADD COLUMN     "externalReport" BOOLEAN,
ADD COLUMN     "onePart" BOOLEAN,
ADD COLUMN     "twoPart" BOOLEAN;
