/*
  Warnings:

  - The `report` column on the `ReportForExams` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `ReportForExams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportForExams" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "report",
ADD COLUMN     "report" JSONB[];
