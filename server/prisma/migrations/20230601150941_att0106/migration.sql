/*
  Warnings:

  - A unique constraint covering the columns `[bedId]` on the table `Pets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bedId` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "bedId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Kennel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "totalBeds" INTEGER NOT NULL,

    CONSTRAINT "Kennel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bed" (
    "id" SERIAL NOT NULL,
    "kennelId" INTEGER NOT NULL,
    "isBusy" BOOLEAN DEFAULT false,
    "mustFasting" BOOLEAN DEFAULT false,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pets_bedId_key" ON "Pets"("bedId");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_kennelId_fkey" FOREIGN KEY ("kennelId") REFERENCES "Kennel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
