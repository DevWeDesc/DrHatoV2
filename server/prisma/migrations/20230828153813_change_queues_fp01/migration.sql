/*
  Warnings:

  - You are about to drop the column `observatios` on the `QueuesForPet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QueuesForPet" DROP COLUMN "observatios",
ADD COLUMN     "observations" TEXT;
