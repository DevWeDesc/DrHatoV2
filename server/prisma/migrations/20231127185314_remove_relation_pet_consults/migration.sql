/*
  Warnings:

  - You are about to drop the column `medicineRecordId` on the `PetConsultsDebits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetConsultsDebits" DROP CONSTRAINT "PetConsultsDebits_medicineRecordId_fkey";

-- AlterTable
ALTER TABLE "PetConsultsDebits" DROP COLUMN "medicineRecordId";
