/*
  Warnings:

  - You are about to drop the column `admissionsObservations` on the `BedsForPet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BedsForPet" DROP COLUMN "admissionsObservations";

-- CreateTable
CREATE TABLE "HospitalizationDiary" (
    "id" SERIAL NOT NULL,
    "observations" TEXT NOT NULL,
    "observationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bedsForPetId" INTEGER,

    CONSTRAINT "HospitalizationDiary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HospitalizationDiary" ADD CONSTRAINT "HospitalizationDiary_bedsForPetId_fkey" FOREIGN KEY ("bedsForPetId") REFERENCES "BedsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
