/*
  Warnings:

  - A unique constraint covering the columns `[surgeriesForPetId]` on the table `SurgeriesReports` will be added. If there are existing duplicate values, this will fail.
  - Made the column `surgeriesForPetId` on table `SurgeriesReports` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SurgeriesReports" DROP CONSTRAINT "SurgeriesReports_surgeriesForPetId_fkey";

-- AlterTable
ALTER TABLE "SurgeriesReports" ALTER COLUMN "surgeriesForPetId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesReports_surgeriesForPetId_key" ON "SurgeriesReports"("surgeriesForPetId");

-- AddForeignKey
ALTER TABLE "SurgeriesReports" ADD CONSTRAINT "SurgeriesReports_surgeriesForPetId_fkey" FOREIGN KEY ("surgeriesForPetId") REFERENCES "SurgeriesForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
