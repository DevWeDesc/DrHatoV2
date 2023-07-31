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
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "ProceduresForPet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProceduresForPet_name_key" ON "ProceduresForPet"("name");

-- AddForeignKey
ALTER TABLE "ProceduresForPet" ADD CONSTRAINT "ProceduresForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
