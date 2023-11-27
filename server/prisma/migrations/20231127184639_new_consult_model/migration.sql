/*
  Warnings:

  - A unique constraint covering the columns `[consultOpenedId]` on the table `PetConsultsDebits` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PetConsultsDebits" ADD COLUMN     "consultOpenedId" TEXT,
ADD COLUMN     "openedConsultsForPetId" TEXT;

-- CreateTable
CREATE TABLE "OpenedConsultsForPet" (
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

    CONSTRAINT "OpenedConsultsForPet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetConsultsDebits_consultOpenedId_key" ON "PetConsultsDebits"("consultOpenedId");

-- AddForeignKey
ALTER TABLE "OpenedConsultsForPet" ADD CONSTRAINT "OpenedConsultsForPet_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetConsultsDebits" ADD CONSTRAINT "PetConsultsDebits_openedConsultsForPetId_fkey" FOREIGN KEY ("openedConsultsForPetId") REFERENCES "OpenedConsultsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
