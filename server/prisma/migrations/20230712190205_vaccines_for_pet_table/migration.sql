-- CreateTable
CREATE TABLE "VaccinesForPet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "VaccinesForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VaccinesForPet" ADD CONSTRAINT "VaccinesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
