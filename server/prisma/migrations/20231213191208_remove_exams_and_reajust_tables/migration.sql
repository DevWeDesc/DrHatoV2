/*
  Warnings:

  - You are about to drop the column `internalReport` on the `ReportForExams` table. All the data in the column will be lost.
  - You are about to drop the `ExamCharacteristics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExamCharacteristicsToExams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_multipartId_fkey";

-- DropForeignKey
ALTER TABLE "Sectors" DROP CONSTRAINT "Sectors_examId_fkey";

-- DropForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" DROP CONSTRAINT "_ExamCharacteristicsToExams_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" DROP CONSTRAINT "_ExamCharacteristicsToExams_B_fkey";

-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "externalReport" BOOLEAN;

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "stock" INTEGER;

-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "internalReport",
ADD COLUMN     "externalReportIds" TEXT[];

-- DropTable
DROP TABLE "ExamCharacteristics";

-- DropTable
DROP TABLE "Exams";

-- DropTable
DROP TABLE "_ExamCharacteristicsToExams";
