/*
  Warnings:

  - Added the required column `medicine_id` to the `Bed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "medicine_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
