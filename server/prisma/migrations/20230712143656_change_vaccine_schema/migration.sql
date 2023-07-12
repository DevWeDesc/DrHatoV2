/*
  Warnings:

  - You are about to drop the column `petId` on the `Vaccines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vaccines" DROP CONSTRAINT "Vaccines_petId_fkey";

-- AlterTable
ALTER TABLE "Vaccines" DROP COLUMN "petId";
