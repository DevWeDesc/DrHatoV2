/*
  Warnings:

  - Changed the type of `report` on the `ReportForExams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "report",
ADD COLUMN     "report" JSONB NOT NULL;
