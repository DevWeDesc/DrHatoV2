-- DropForeignKey
ALTER TABLE "PetConsultsDebits" DROP CONSTRAINT "PetConsultsDebits_openedAdmissionsForPetId_fkey";

-- AlterTable
ALTER TABLE "PetConsultsDebits" ALTER COLUMN "openedAdmissionsForPetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PetConsultsDebits" ADD CONSTRAINT "PetConsultsDebits_openedAdmissionsForPetId_fkey" FOREIGN KEY ("openedAdmissionsForPetId") REFERENCES "OpenededAdmissionsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
