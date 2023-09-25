/*
  Warnings:

  - Made the column `name` on table `MergedExams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `MergedExams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MergedExams" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;
