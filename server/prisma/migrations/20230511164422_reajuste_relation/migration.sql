/*
  Warnings:

  - You are about to drop the column `sector_id` on the `Sectors` table. All the data in the column will be lost.
  - You are about to drop the `PetExam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetExam" DROP CONSTRAINT "PetExam_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "PetExam" DROP CONSTRAINT "PetExam_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "Sectors" DROP CONSTRAINT "Sectors_sector_id_fkey";

-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "setId" INTEGER;

-- AlterTable
ALTER TABLE "Sectors" DROP COLUMN "sector_id";

-- DropTable
DROP TABLE "PetExam";

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
