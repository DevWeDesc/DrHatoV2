-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_medicine_id_fkey";

-- AlterTable
ALTER TABLE "Exams" ALTER COLUMN "medicine_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
