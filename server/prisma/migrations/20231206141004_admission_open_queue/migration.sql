/*
  Warnings:

  - You are about to drop the column `openedSurgeriesForPetId` on the `PetConsultsDebits` table. All the data in the column will be lost.
  - You are about to drop the `OpenedSurgeriesForPet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `openedAdmissionsForPetId` to the `PetConsultsDebits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpenedSurgeriesForPet" DROP CONSTRAINT "OpenedSurgeriesForPet_medicineRecordId_fkey";

-- DropForeignKey
ALTER TABLE "PetConsultsDebits" DROP CONSTRAINT "PetConsultsDebits_openedSurgeriesForPetId_fkey";

-- AlterTable
ALTER TABLE "PetConsultsDebits" DROP COLUMN "openedSurgeriesForPetId",
ADD COLUMN     "isAdmissions" BOOLEAN,
ADD COLUMN     "openedAdmissionsForPetId" TEXT NOT NULL;

-- DropTable
DROP TABLE "OpenedSurgeriesForPet";

-- CreateTable
CREATE TABLE "OpenededAdmissionsForPet" (
    "id" TEXT NOT NULL,
    "openedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedDate" TIMESTAMP(3),
    "updatedDate" TIMESTAMP(3),
    "isClosed" BOOLEAN,
    "closedByVetId" INTEGER,
    "petWeight" TEXT,
    "observations" TEXT,
    "consultType" TEXT,
    "totaLDebits" DECIMAL(65,30),
    "medicineRecordId" INTEGER,

    CONSTRAINT "OpenededAdmissionsForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenededAdmissionsForPet" ADD CONSTRAINT "OpenededAdmissionsForPet_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetConsultsDebits" ADD CONSTRAINT "PetConsultsDebits_openedAdmissionsForPetId_fkey" FOREIGN KEY ("openedAdmissionsForPetId") REFERENCES "OpenededAdmissionsForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
