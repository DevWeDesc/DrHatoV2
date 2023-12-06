/*
  Warnings:

  - A unique constraint covering the columns `[surgerieOpenedId]` on the table `PetConsultsDebits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `openedSurgeriesForPetId` to the `PetConsultsDebits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetConsultsDebits" ADD COLUMN     "openedSurgeriesForPetId" TEXT NOT NULL,
ADD COLUMN     "surgerieOpenedId" TEXT;

-- CreateTable
CREATE TABLE "OpenedSurgeriesForPet" (
    "id" TEXT NOT NULL,
    "openedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedDate" TIMESTAMP(3),
    "updatedDate" TIMESTAMP(3),
    "isClosed" BOOLEAN,
    "closedByVetId" INTEGER,
    "petWeight" TEXT,
    "observations" TEXT,
    "consultType" TEXT,
    "totaLDebits" DECIMAL(65,30),
    "medicineRecordId" INTEGER,

    CONSTRAINT "OpenedSurgeriesForPet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetConsultsDebits_surgerieOpenedId_key" ON "PetConsultsDebits"("surgerieOpenedId");

-- AddForeignKey
ALTER TABLE "OpenedSurgeriesForPet" ADD CONSTRAINT "OpenedSurgeriesForPet_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetConsultsDebits" ADD CONSTRAINT "PetConsultsDebits_openedSurgeriesForPetId_fkey" FOREIGN KEY ("openedSurgeriesForPetId") REFERENCES "OpenedSurgeriesForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
