/*
  Warnings:

  - The `examsType` column on the `Exams` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "examsType",
ADD COLUMN     "examsType" TEXT[];
