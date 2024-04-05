/*
  Warnings:

  - You are about to drop the column `usedSlots` on the `SurgeriesCentral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SurgeriesCentral" DROP COLUMN "usedSlots";

-- CreateTable
CREATE TABLE "SurgerieSlots" (
    "id" SERIAL NOT NULL,
    "petName" TEXT,
    "petId" INTEGER,
    "surgerieName" TEXT,
    "vetName" TEXT,
    "vetCrmv" TEXT,

    CONSTRAINT "SurgerieSlots_pkey" PRIMARY KEY ("id")
);
