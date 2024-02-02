/*
  Warnings:

  - A unique constraint covering the columns `[consultPetId]` on the table `InstallmentsDebts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[admissionsPetId]` on the table `InstallmentsDebts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "InstallmentsDebts" ADD COLUMN     "admissionsPetId" TEXT,
ADD COLUMN     "consultPetId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "InstallmentsDebts_consultPetId_key" ON "InstallmentsDebts"("consultPetId");

-- CreateIndex
CREATE UNIQUE INDEX "InstallmentsDebts_admissionsPetId_key" ON "InstallmentsDebts"("admissionsPetId");

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_consultPetId_fkey" FOREIGN KEY ("consultPetId") REFERENCES "OpenedConsultsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_admissionsPetId_fkey" FOREIGN KEY ("admissionsPetId") REFERENCES "OpenededAdmissionsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
