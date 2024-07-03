/*
  Warnings:

  - Made the column `CodLeito` on table `OldAdmissionsHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OldAdmissionsHistory" ALTER COLUMN "CodLeito" SET NOT NULL;
