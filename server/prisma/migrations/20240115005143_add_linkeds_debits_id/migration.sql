/*
  Warnings:

  - A unique constraint covering the columns `[linkedConsultDebitId]` on the table `ExamsForPet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LinkedAdmissionDebitId]` on the table `ExamsForPet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "LinkedAdmissionDebitId" INTEGER,
ADD COLUMN     "linkedConsultDebitId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ExamsForPet_linkedConsultDebitId_key" ON "ExamsForPet"("linkedConsultDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamsForPet_LinkedAdmissionDebitId_key" ON "ExamsForPet"("LinkedAdmissionDebitId");
