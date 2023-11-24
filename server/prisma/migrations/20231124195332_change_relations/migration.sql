-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'MANAGER', 'VETERINARIAN', 'LABORATORY', 'RECEPTIONIST', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "SurgerieStatus" AS ENUM ('FINISHED', 'STARTED', 'INPROGRESS');

-- CreateEnum
CREATE TYPE "MedicationUnit" AS ENUM ('CPR', 'CPZ', 'ML', 'MG', 'G', 'GT', 'CT', 'CS', 'UN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRoles",
    "crmv" TEXT,
    "userIsVet" BOOLEAN DEFAULT false,
    "userType" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "CodCli" INTEGER,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "district" TEXT,
    "cep" TEXT,
    "neighbour" TEXT,
    "state" TEXT,
    "phone" TEXT NOT NULL,
    "tell" TEXT,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "email" TEXT,
    "birthday" TEXT NOT NULL,
    "balance" DOUBLE PRECISION,
    "kindPerson" TEXT,
    "vetPreference" TEXT,
    "howKnowUs" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "CodCli" INTEGER,
    "CodAnimal" INTEGER,
    "name" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "weigth" TEXT,
    "haveChip" BOOLEAN,
    "corPet" TEXT,
    "sizePet" TEXT DEFAULT '',
    "bornDate" TEXT NOT NULL,
    "dateAge" TEXT,
    "observations" TEXT,
    "customer_id" INTEGER NOT NULL,
    "codPet" TEXT NOT NULL,
    "isCastred" BOOLEAN,
    "debits" DECIMAL(65,30),

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autorizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Autorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineRecord" (
    "id" SERIAL NOT NULL,
    "observations" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "petId" INTEGER NOT NULL,

    CONSTRAINT "MedicineRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "examId" INTEGER,
    "proced_id" INTEGER,
    "sectorsId" INTEGER,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "applicationInterval" TEXT,
    "applicableGender" TEXT[],
    "ageRange" TEXT[],
    "available" BOOLEAN NOT NULL,
    "observations" TEXT NOT NULL,
    "group_id" INTEGER,
    "sector_id" INTEGER,

    CONSTRAINT "Procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProceduresForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "applicationInterval" TEXT,
    "applicableGender" TEXT[],
    "ageRange" TEXT[],
    "available" BOOLEAN NOT NULL,
    "observations" TEXT NOT NULL,
    "group_id" INTEGER,
    "sector_id" INTEGER,
    "requestedDate" TIMESTAMP(3),
    "isDone" BOOLEAN DEFAULT false,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "ProceduresForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queues" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "queryType" TEXT,
    "vetPreference" TEXT,
    "queueEntry" TIMESTAMP(3),
    "queueExit" TIMESTAMP(3),
    "queueOur" TEXT,
    "moreInfos" TEXT,
    "petIsInQueue" BOOLEAN DEFAULT false,

    CONSTRAINT "Queues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueuesForPet" (
    "id" SERIAL NOT NULL,
    "queueEntry" TIMESTAMP(3),
    "queueExit" TIMESTAMP(3),
    "queueIsDone" BOOLEAN DEFAULT false,
    "queryType" TEXT,
    "debitOnThisQuery" DECIMAL(65,30),
    "responsibleVeterinarian" TEXT,
    "petName" TEXT,
    "petWeight" TEXT,
    "observations" TEXT,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "QueuesForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kennel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "totalBeds" INTEGER,
    "description" TEXT,
    "price" DECIMAL(65,30),

    CONSTRAINT "Kennel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bed" (
    "id" SERIAL NOT NULL,
    "kennelId" INTEGER NOT NULL,
    "petId" INTEGER,
    "isBusy" BOOLEAN DEFAULT false,
    "mustFasting" BOOLEAN DEFAULT false,
    "entryOur" TIMESTAMP(3),
    "exitOur" TIMESTAMP(3),
    "dailyRate" INTEGER,
    "hospitalizedDays" INTEGER,
    "totalDebt" DECIMAL(65,30),

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BedsForPet" (
    "id" SERIAL NOT NULL,
    "entryOur" TIMESTAMP(3),
    "exitOur" TIMESTAMP(3),
    "mustFasting" BOOLEAN DEFAULT false,
    "totalDebt" DECIMAL(65,30),
    "isCompleted" BOOLEAN DEFAULT false,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "BedsForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalizationDiary" (
    "id" SERIAL NOT NULL,
    "observations" TEXT NOT NULL,
    "observationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bedsForPetId" INTEGER,

    CONSTRAINT "HospitalizationDiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "disponible" BOOLEAN,

    CONSTRAINT "Vaccines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccinesForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "requestedDate" TIMESTAMP(3) NOT NULL,
    "applicationDate" TIMESTAMP(3),
    "isDone" BOOLEAN DEFAULT false,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "VaccinesForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surgeries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Surgeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgeriesForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedDate" TIMESTAMP(3),
    "status" "SurgerieStatus" DEFAULT 'STARTED',
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "SurgeriesForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurgeriesReports" (
    "id" SERIAL NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportedText" TEXT NOT NULL,
    "reportedBy" TEXT NOT NULL,
    "surgeriesForPetId" INTEGER NOT NULL,

    CONSTRAINT "SurgeriesReports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricesAccumulator" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "accumulator" DECIMAL(65,30),

    CONSTRAINT "PricesAccumulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospVetBox" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "movimentedValues" DECIMAL(65,30),
    "entryValues" DECIMAL(65,30),
    "exitValues" DECIMAL(65,30),
    "boxIsOpen" BOOLEAN DEFAULT false,

    CONSTRAINT "HospVetBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospBoxHistory" (
    "id" SERIAL NOT NULL,
    "entryValues" DECIMAL(65,30),
    "exitValues" DECIMAL(65,30),
    "totalValues" DECIMAL(65,30),
    "openBox" TIMESTAMP(3),
    "closeBox" TIMESTAMP(3),
    "openBy" TEXT,
    "closedBy" TEXT,
    "boxIsOpen" BOOLEAN DEFAULT false,
    "hospVetBoxId" INTEGER,

    CONSTRAINT "HospBoxHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAccount" (
    "id" SERIAL NOT NULL,
    "accountNumber" INTEGER,
    "debits" DECIMAL(65,30),
    "credits" DECIMAL(65,30),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "CustomerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallmentsDebts" (
    "id" SERIAL NOT NULL,
    "debitName" TEXT,
    "totalDebit" DECIMAL(65,30),
    "paymentType" TEXT,
    "paymentDate" TIMESTAMP(3),
    "installmentAmount" INTEGER,
    "amountInstallments" DECIMAL(65,30),
    "customerId" INTEGER NOT NULL,
    "boxHistoryId" INTEGER NOT NULL,

    CONSTRAINT "InstallmentsDebts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "defaultMethodology" TEXT,
    "impressName" TEXT,
    "available" BOOLEAN DEFAULT false,
    "doneExame" BOOLEAN DEFAULT false,
    "subName" TEXT,
    "description" TEXT,
    "examsType" TEXT[],
    "ageRange" TEXT[],
    "applicableGender" TEXT[],
    "isMultiPart" BOOLEAN DEFAULT false,
    "isReportByText" BOOLEAN DEFAULT false,
    "isOnePart" BOOLEAN DEFAULT false,
    "multipartId" INTEGER,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamsForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "defaultMethodology" TEXT,
    "impressName" TEXT,
    "requesteData" TIMESTAMP(3),
    "requestedFor" TEXT,
    "requestedCrm" TEXT,
    "responsibleForExam" TEXT,
    "responsibleForCrm" TEXT,
    "doneExame" BOOLEAN DEFAULT false,
    "isMultiPart" BOOLEAN DEFAULT false,
    "isReportByText" BOOLEAN DEFAULT false,
    "isOnePart" BOOLEAN DEFAULT false,
    "medicine_id" INTEGER NOT NULL,
    "examsType" TEXT[] DEFAULT ARRAY['lab']::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamsForPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamCharacteristics" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "especie" JSONB,

    CONSTRAINT "ExamCharacteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportForExams" (
    "id" SERIAL NOT NULL,
    "report" JSONB,
    "textReport" TEXT,
    "internalReport" TEXT[],
    "isOnePart" BOOLEAN DEFAULT false,
    "isMultiPart" BOOLEAN DEFAULT false,
    "isReportByText" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examsId" INTEGER NOT NULL,

    CONSTRAINT "ReportForExams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Races" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "especiesId" INTEGER,

    CONSTRAINT "Races_pkey" PRIMARY KEY ("id")
);

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
    "isPaid" BOOLEAN,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicineRecordId" INTEGER,

    CONSTRAINT "MedicinesForPets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OldExams" (
    "codexam" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "onePart" BOOLEAN,
    "twoPart" BOOLEAN,
    "byReport" BOOLEAN,
    "ageGroups" INTEGER DEFAULT 3,
    "disponible" BOOLEAN,
    "minAge" INTEGER DEFAULT 0,
    "maxAge" INTEGER DEFAULT 9999,
    "applicableMales" BOOLEAN,
    "appicableFemales" BOOLEAN,
    "defaultMetodology" TEXT,
    "uniqueCod" TEXT,
    "sector" INTEGER,
    "ImageLab" BOOLEAN,
    "defaultLab" BOOLEAN,
    "healthPlan" BOOLEAN,
    "impressName" TEXT,

    CONSTRAINT "OldExams_pkey" PRIMARY KEY ("codexam")
);

-- CreateTable
CREATE TABLE "PartExams" (
    "id" SERIAL NOT NULL,
    "codpart" INTEGER,
    "oldExamsCodexam" INTEGER,
    "partName" TEXT NOT NULL,
    "isFirst" BOOLEAN NOT NULL,

    CONSTRAINT "PartExams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartDetails" (
    "id" SERIAL NOT NULL,
    "codDetalhe" INTEGER,
    "partExamsCodpart" INTEGER,
    "caracteristic" TEXT,
    "relativeUnit" TEXT,
    "absoluteUnit" TEXT,
    "agesOne" TEXT,
    "minAgesOne" TEXT,
    "maxAgesOne" TEXT,
    "agesTwo" TEXT,
    "minAgesTwo" TEXT,
    "maxAgesTwo" TEXT,
    "agesThree" TEXT,
    "minAgesThree" TEXT,
    "maxAgesThree" TEXT,
    "parts" INTEGER,

    CONSTRAINT "PartDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExamCharacteristicsToExams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_CodCli_key" ON "Customer"("CodCli");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cpf_key" ON "Customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Pets_codPet_key" ON "Pets"("codPet");

-- CreateIndex
CREATE UNIQUE INDEX "MedicineRecord_petId_key" ON "MedicineRecord"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "Procedures_name_key" ON "Procedures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Queues_pet_id_key" ON "Queues"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bed_petId_key" ON "Bed"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "SurgeriesReports_surgeriesForPetId_key" ON "SurgeriesReports"("surgeriesForPetId");

-- CreateIndex
CREATE UNIQUE INDEX "PricesAccumulator_petId_key" ON "PricesAccumulator"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_customerId_key" ON "CustomerAccount"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "PartExams_codpart_key" ON "PartExams"("codpart");

-- CreateIndex
CREATE UNIQUE INDEX "PartDetails_codDetalhe_key" ON "PartDetails"("codDetalhe");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamCharacteristicsToExams_AB_unique" ON "_ExamCharacteristicsToExams"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamCharacteristicsToExams_B_index" ON "_ExamCharacteristicsToExams"("B");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRecord" ADD CONSTRAINT "MedicineRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sectors" ADD CONSTRAINT "Sectors_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProceduresForPet" ADD CONSTRAINT "ProceduresForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queues" ADD CONSTRAINT "Queues_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueuesForPet" ADD CONSTRAINT "QueuesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_kennelId_fkey" FOREIGN KEY ("kennelId") REFERENCES "Kennel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedsForPet" ADD CONSTRAINT "BedsForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalizationDiary" ADD CONSTRAINT "HospitalizationDiary_bedsForPetId_fkey" FOREIGN KEY ("bedsForPetId") REFERENCES "BedsForPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccinesForPet" ADD CONSTRAINT "VaccinesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgeriesForPet" ADD CONSTRAINT "SurgeriesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgeriesReports" ADD CONSTRAINT "SurgeriesReports_surgeriesForPetId_fkey" FOREIGN KEY ("surgeriesForPetId") REFERENCES "SurgeriesForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricesAccumulator" ADD CONSTRAINT "PricesAccumulator_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospBoxHistory" ADD CONSTRAINT "HospBoxHistory_hospVetBoxId_fkey" FOREIGN KEY ("hospVetBoxId") REFERENCES "HospVetBox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAccount" ADD CONSTRAINT "CustomerAccount_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_boxHistoryId_fkey" FOREIGN KEY ("boxHistoryId") REFERENCES "HospBoxHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_multipartId_fkey" FOREIGN KEY ("multipartId") REFERENCES "Exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamsForPet" ADD CONSTRAINT "ExamsForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportForExams" ADD CONSTRAINT "ReportForExams_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "ExamsForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Races" ADD CONSTRAINT "Races_especiesId_fkey" FOREIGN KEY ("especiesId") REFERENCES "Especies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_medicinesGroupsId_fkey" FOREIGN KEY ("medicinesGroupsId") REFERENCES "MedicinesGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicinesForPets" ADD CONSTRAINT "MedicinesForPets_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartExams" ADD CONSTRAINT "PartExams_oldExamsCodexam_fkey" FOREIGN KEY ("oldExamsCodexam") REFERENCES "OldExams"("codexam") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartDetails" ADD CONSTRAINT "PartDetails_partExamsCodpart_fkey" FOREIGN KEY ("partExamsCodpart") REFERENCES "PartExams"("codpart") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" ADD CONSTRAINT "_ExamCharacteristicsToExams_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamCharacteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" ADD CONSTRAINT "_ExamCharacteristicsToExams_B_fkey" FOREIGN KEY ("B") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
