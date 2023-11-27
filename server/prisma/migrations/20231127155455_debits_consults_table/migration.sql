-- CreateTable
CREATE TABLE "PetConsultsDebits" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DECIMAL(65,30),
    "itemId" INTEGER,
    "isExam" BOOLEAN,
    "isSurgerie" BOOLEAN,
    "isVaccine" BOOLEAN,
    "isProcedure" BOOLEAN,
    "isAdmission" BOOLEAN,
    "RequestedByVetId" INTEGER,
    "RequestedByVetName" TEXT,
    "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicineRecordId" INTEGER,

    CONSTRAINT "PetConsultsDebits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetConsultsDebits" ADD CONSTRAINT "PetConsultsDebits_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
