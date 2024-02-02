/*
  Warnings:

  - A unique constraint covering the columns `[customerAccountId]` on the table `OpenededAdmissionsForPet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerAccountId` to the `OpenededAdmissionsForPet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerAccount" DROP CONSTRAINT "CustomerAccount_admissionId_fkey";

-- DropIndex
DROP INDEX "CustomerAccount_admissionId_key";

-- DropIndex
DROP INDEX "CustomerAccount_consultId_key";

-- AlterTable
ALTER TABLE "CustomerAccount" ALTER COLUMN "admissionId" DROP DEFAULT,
ALTER COLUMN "consultId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpenedConsultsForPet" ALTER COLUMN "customerAccountId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OpenededAdmissionsForPet" ADD COLUMN     "customerAccountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OpenededAdmissionsForPet_customerAccountId_key" ON "OpenededAdmissionsForPet"("customerAccountId");

-- AddForeignKey
ALTER TABLE "OpenededAdmissionsForPet" ADD CONSTRAINT "OpenededAdmissionsForPet_customerAccountId_fkey" FOREIGN KEY ("customerAccountId") REFERENCES "CustomerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
