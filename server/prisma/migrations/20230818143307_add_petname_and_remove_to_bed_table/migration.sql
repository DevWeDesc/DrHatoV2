/*
  Warnings:

  - You are about to drop the column `petName` on the `BedsForPet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BedsForPet" DROP COLUMN "petName";

-- AlterTable
ALTER TABLE "QueuesForPet" ADD COLUMN     "petName" TEXT;
