/*
  Warnings:

  - A unique constraint covering the columns `[linkedConsultDebitId]` on the table `ProceduresForPet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LinkedAdmissionDebitId]` on the table `ProceduresForPet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProceduresForPet" ADD COLUMN     "LinkedAdmissionDebitId" INTEGER,
ADD COLUMN     "linkedConsultDebitId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProceduresForPet_linkedConsultDebitId_key" ON "ProceduresForPet"("linkedConsultDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "ProceduresForPet_LinkedAdmissionDebitId_key" ON "ProceduresForPet"("LinkedAdmissionDebitId");
