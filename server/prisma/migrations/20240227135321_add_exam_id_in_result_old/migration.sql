/*
  Warnings:

  - Added the required column `examId` to the `ResultsOld` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResultsOld" ADD COLUMN     "examId" INTEGER NOT NULL;
