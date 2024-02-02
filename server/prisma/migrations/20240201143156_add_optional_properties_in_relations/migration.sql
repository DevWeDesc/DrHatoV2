-- DropForeignKey
ALTER TABLE "InstallmentsDebts" DROP CONSTRAINT "InstallmentsDebts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "OpenedConsultsForPet" DROP CONSTRAINT "OpenedConsultsForPet_customerAccountId_fkey";

-- AlterTable
ALTER TABLE "CustomerAccount" ALTER COLUMN "admissionId" DROP NOT NULL,
ALTER COLUMN "consultId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InstallmentsDebts" ALTER COLUMN "customerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OpenedConsultsForPet" ALTER COLUMN "customerAccountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OpenedConsultsForPet" ADD CONSTRAINT "OpenedConsultsForPet_customerAccountId_fkey" FOREIGN KEY ("customerAccountId") REFERENCES "CustomerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
