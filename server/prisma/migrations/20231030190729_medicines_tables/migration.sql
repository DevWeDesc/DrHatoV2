/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MedicationUnit" AS ENUM ('CPR', 'CPZ', 'ML', 'MG', 'G', 'GT', 'CT', 'CS', 'UN');

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_plantId_fkey";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "MedicinesGroups" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MedicinesGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(65,30),
    "unitMeasurement" "MedicationUnit",
    "dosage" TEXT NOT NULL,
    "observations" TEXT,
    "medicinesGroupsId" INTEGER,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicinesForPets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dosageApplication" TEXT NOT NULL,
    "unitMeasurement" "MedicationUnit",
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicineRecordId" INTEGER,

    CONSTRAINT "MedicinesForPets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_medicinesGroupsId_fkey" FOREIGN KEY ("medicinesGroupsId") REFERENCES "MedicinesGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicinesForPets" ADD CONSTRAINT "MedicinesForPets_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
