/*
  Warnings:

  - You are about to drop the column `isDone` on the `SurgeriesForPet` table. All the data in the column will be lost.
  - The `status` column on the `SurgeriesForPet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SurgerieStatus" AS ENUM ('FINISHED', 'STARTED', 'INPROGRESS');

-- AlterTable
ALTER TABLE "SurgeriesForPet" DROP COLUMN "isDone",
DROP COLUMN "status",
ADD COLUMN     "status" "SurgerieStatus" DEFAULT 'STARTED';

-- CreateTable
CREATE TABLE "SurgeriesReports" (
    "id" SERIAL NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportedText" TEXT NOT NULL,
    "surgeriesForPetId" INTEGER,

    CONSTRAINT "SurgeriesReports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurgeriesReports" ADD CONSTRAINT "SurgeriesReports_surgeriesForPetId_fkey" FOREIGN KEY ("surgeriesForPetId") REFERENCES "SurgeriesForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
