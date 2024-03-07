/*
  Warnings:

  - The `LinkedAdmissionDebitId` column on the `SurgeriesForPet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `linkedConsultDebitId` column on the `SurgeriesForPet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SurgeriesForPet" DROP COLUMN "LinkedAdmissionDebitId",
ADD COLUMN     "LinkedAdmissionDebitId" INTEGER,
DROP COLUMN "linkedConsultDebitId",
ADD COLUMN     "linkedConsultDebitId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesForPet_linkedConsultDebitId_key" ON "SurgeriesForPet"("linkedConsultDebitId");

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesForPet_LinkedAdmissionDebitId_key" ON "SurgeriesForPet"("LinkedAdmissionDebitId");
