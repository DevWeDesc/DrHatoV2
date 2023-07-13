/*
  Warnings:

  - Added the required column `requestedDate` to the `VaccinesForPet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VaccinesForPet" ADD COLUMN     "requestedDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "applicationDate" DROP NOT NULL;
