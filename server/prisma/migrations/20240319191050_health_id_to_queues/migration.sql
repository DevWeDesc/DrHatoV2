-- AlterTable
ALTER TABLE "OpenedConsultsForPet" ADD COLUMN     "healthInsuranceId" INTEGER,
ADD COLUMN     "healthInsuranceName" TEXT;

-- AlterTable
ALTER TABLE "OpenededAdmissionsForPet" ADD COLUMN     "healthInsuranceId" INTEGER,
ADD COLUMN     "healthInsuranceName" TEXT;
