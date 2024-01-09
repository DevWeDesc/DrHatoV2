-- CreateTable
CREATE TABLE "OldConsults" (
    "id" SERIAL NOT NULL,
    "codConsulta" INTEGER,
    "date" TIMESTAMP(3),
    "vetId" INTEGER,
    "vetName" TEXT,
    "petWeight" DOUBLE PRECISION,
    "petName" TEXT,
    "customerName" TEXT,
    "consulType" TEXT,
    "CodAnimal" INTEGER NOT NULL,
    "medicineRecordId" INTEGER,

    CONSTRAINT "OldConsults_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OldConsults" ADD CONSTRAINT "OldConsults_medicineRecordId_fkey" FOREIGN KEY ("medicineRecordId") REFERENCES "MedicineRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
