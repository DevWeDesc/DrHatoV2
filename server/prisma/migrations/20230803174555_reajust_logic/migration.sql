/*
  Warnings:

  - You are about to drop the column `medicine_id` on the `Bed` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_medicine_id_fkey";

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "medicine_id";

-- CreateTable
CREATE TABLE "BedsForPet" (
    "id" SERIAL NOT NULL,
    "entryOur" TIMESTAMP(3),
    "exitOur" TIMESTAMP(3),
    "mustFasting" BOOLEAN DEFAULT false,
    "totalDebt" DECIMAL(65,30),
    "admissionsObservations" JSONB,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "BedsForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BedsForPet" ADD CONSTRAINT "BedsForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
