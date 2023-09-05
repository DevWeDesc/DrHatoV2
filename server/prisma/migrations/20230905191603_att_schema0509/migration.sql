/*
  Warnings:

  - You are about to drop the column `tableName` on the `ReportForExams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReportForExams" DROP COLUMN "tableName",
ADD COLUMN     "tableNumber" INTEGER;
