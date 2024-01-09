/*
  Warnings:

  - You are about to drop the column `medicineRecordId` on the `OldConsults` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OldConsults" DROP CONSTRAINT "OldConsults_medicineRecordId_fkey";

-- AlterTable
ALTER TABLE "OldConsults" DROP COLUMN "medicineRecordId",
ADD COLUMN     "petsId" INTEGER;

-- AddForeignKey
ALTER TABLE "OldConsults" ADD CONSTRAINT "OldConsults_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "Pets"("CodAnimal") ON DELETE SET NULL ON UPDATE CASCADE;
