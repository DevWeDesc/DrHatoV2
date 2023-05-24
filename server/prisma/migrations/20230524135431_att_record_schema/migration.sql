/*
  Warnings:

  - The primary key for the `MedicineRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MedicineRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `medicine_id` on the `Exams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_medicine_id_fkey";

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "medicine_id",
ADD COLUMN     "medicine_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicineRecord" DROP CONSTRAINT "MedicineRecord_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MedicineRecord_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
