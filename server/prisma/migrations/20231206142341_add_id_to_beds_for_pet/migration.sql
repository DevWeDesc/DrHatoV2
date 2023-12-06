/*
  Warnings:

  - A unique constraint covering the columns `[openedAdmissionId]` on the table `BedsForPet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BedsForPet" ADD COLUMN     "openedAdmissionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BedsForPet_openedAdmissionId_key" ON "BedsForPet"("openedAdmissionId");
