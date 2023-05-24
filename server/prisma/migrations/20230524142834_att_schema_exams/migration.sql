/*
  Warnings:

  - You are about to drop the column `medicine_id` on the `Exams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_medicine_id_fkey";

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "medicine_id";

-- CreateTable
CREATE TABLE "ExamsForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "doneExame" BOOLEAN DEFAULT false,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "ExamsForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamsForPet" ADD CONSTRAINT "ExamsForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
