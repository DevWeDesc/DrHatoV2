/*
  Warnings:

  - A unique constraint covering the columns `[linkedConsultDebitId]` on the table `SurgeriesForPet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LinkedAdmissionDebitId]` on the table `SurgeriesForPet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedConsultDebitId]` on the table `VaccinesForPet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LinkedAdmissionDebitId]` on the table `VaccinesForPet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SurgeriesForPet" ADD COLUMN     "LinkedAdmissionDebitId" INTEGER,
ADD COLUMN     "linkedConsultDebitId" INTEGER;

-- AlterTable
ALTER TABLE "VaccinesForPet" ADD COLUMN     "LinkedAdmissionDebitId" INTEGER,
ADD COLUMN     "linkedConsultDebitId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesForPet_linkedConsultDebitId_key" ON "SurgeriesForPet"("linkedConsultDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesForPet_LinkedAdmissionDebitId_key" ON "SurgeriesForPet"("LinkedAdmissionDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "VaccinesForPet_linkedConsultDebitId_key" ON "VaccinesForPet"("linkedConsultDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "VaccinesForPet_LinkedAdmissionDebitId_key" ON "VaccinesForPet"("LinkedAdmissionDebitId");
