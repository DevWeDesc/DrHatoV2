/*
  Warnings:

  - You are about to drop the column `hasTable` on the `ReportForExams` table. All the data in the column will be lost.
  - You are about to drop the column `tableNumber` on the `ReportForExams` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ExamsForPet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "hasTable",
DROP COLUMN "tableNumber",
ADD COLUMN     "isMultiPart" BOOLEAN DEFAULT false,
ADD COLUMN     "isOnePart" BOOLEAN DEFAULT false,
ADD COLUMN     "isReportByText" BOOLEAN DEFAULT false;
