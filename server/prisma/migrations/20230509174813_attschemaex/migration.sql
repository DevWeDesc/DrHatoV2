/*
  Warnings:

  - The `applicableGender` column on the `Exams` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "ageRange" TEXT[],
DROP COLUMN "applicableGender",
ADD COLUMN     "applicableGender" TEXT[];
