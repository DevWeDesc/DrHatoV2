/*
  Warnings:

  - A unique constraint covering the columns `[consultId]` on the table `CustomerAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[admissionId]` on the table `CustomerAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerAccountId]` on the table `OpenedConsultsForPet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerAccount" ADD COLUMN     "admissionId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "consultId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "OpenedConsultsForPet" ADD COLUMN     "customerAccountId" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_consultId_key" ON "CustomerAccount"("consultId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_admissionId_key" ON "CustomerAccount"("admissionId");

-- CreateIndex
CREATE UNIQUE INDEX "OpenedConsultsForPet_customerAccountId_key" ON "OpenedConsultsForPet"("customerAccountId");

-- AddForeignKey
ALTER TABLE "OpenedConsultsForPet" ADD CONSTRAINT "OpenedConsultsForPet_customerAccountId_fkey" FOREIGN KEY ("customerAccountId") REFERENCES "CustomerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAccount" ADD CONSTRAINT "CustomerAccount_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "OpenededAdmissionsForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
