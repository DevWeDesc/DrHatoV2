/*
  Warnings:

  - You are about to drop the column `bedId` on the `Pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[petId]` on the table `Bed` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `petId` to the `Bed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_bedId_fkey";

-- DropIndex
DROP INDEX "Pets_bedId_key";

-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "petId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "bedId";

-- CreateIndex
CREATE UNIQUE INDEX "Bed_petId_key" ON "Bed"("petId");

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
