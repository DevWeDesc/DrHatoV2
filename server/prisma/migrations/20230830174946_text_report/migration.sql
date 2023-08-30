/*
  Warnings:

  - You are about to drop the column `externalReport` on the `ReportForExams` table. All the data in the column will be lost.
  - You are about to drop the column `imageReport` on the `ReportForExams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "externalReport",
DROP COLUMN "imageReport",
ADD COLUMN     "textReport" TEXT;
