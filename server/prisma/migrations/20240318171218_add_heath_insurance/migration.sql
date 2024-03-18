-- AlterTable
ALTER TABLE "OldExams" ADD COLUMN     "healthInsuranceId" INTEGER;

-- AlterTable
ALTER TABLE "Procedures" ADD COLUMN     "healthInsuranceId" INTEGER;

-- AlterTable
ALTER TABLE "Surgeries" ADD COLUMN     "healthInsuranceId" INTEGER;

-- AlterTable
ALTER TABLE "Vaccines" ADD COLUMN     "healthInsuranceId" INTEGER;

-- CreateTable
CREATE TABLE "HealthInsurance" (
    "id" SERIAL NOT NULL,
    "planName" TEXT,
    "disponible" BOOLEAN NOT NULL,
    "planProvider" TEXT NOT NULL,
    "graceDays" INTEGER,
    "coverageLimit" DOUBLE PRECISION,
    "admissionDeduction" INTEGER,
    "disponibleAtAdmission" BOOLEAN,

    CONSTRAINT "HealthInsurance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccines" ADD CONSTRAINT "Vaccines_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgeries" ADD CONSTRAINT "Surgeries_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldExams" ADD CONSTRAINT "OldExams_healthInsuranceId_fkey" FOREIGN KEY ("healthInsuranceId") REFERENCES "HealthInsurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
