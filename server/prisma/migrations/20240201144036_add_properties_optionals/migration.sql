-- DropForeignKey
ALTER TABLE "OpenededAdmissionsForPet" DROP CONSTRAINT "OpenededAdmissionsForPet_customerAccountId_fkey";

-- AlterTable
ALTER TABLE "OpenededAdmissionsForPet" ALTER COLUMN "customerAccountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OpenededAdmissionsForPet" ADD CONSTRAINT "OpenededAdmissionsForPet_customerAccountId_fkey" FOREIGN KEY ("customerAccountId") REFERENCES "CustomerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
