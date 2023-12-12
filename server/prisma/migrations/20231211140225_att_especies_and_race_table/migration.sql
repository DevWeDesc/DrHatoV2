/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Especies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Races" ADD COLUMN     "codEspOld" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Especies_name_key" ON "Especies"("name");
