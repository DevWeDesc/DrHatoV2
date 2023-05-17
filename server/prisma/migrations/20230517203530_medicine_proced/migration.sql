/*
  Warnings:

  - Added the required column `medicine_id` to the `Exams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "medicine_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MedicineRecord" (
    "id" TEXT NOT NULL,
    "observations" TEXT[],
    "petId" INTEGER NOT NULL,

    CONSTRAINT "MedicineRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicineRecord_petId_key" ON "MedicineRecord"("petId");

-- AddForeignKey
ALTER TABLE "MedicineRecord" ADD CONSTRAINT "MedicineRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
