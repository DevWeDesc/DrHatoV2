/*
  Warnings:

  - Added the required column `finishedDate` to the `ProceduresForPet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProceduresForPet" ADD COLUMN     "finishedDate" TIMESTAMP(3) NOT NULL;
