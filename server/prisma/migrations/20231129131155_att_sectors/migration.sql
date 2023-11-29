/*
  Warnings:

  - A unique constraint covering the columns `[sectorId]` on the table `Sectors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sectorId` to the `Sectors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sectors" ADD COLUMN     "sectorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sectors_sectorId_key" ON "Sectors"("sectorId");
