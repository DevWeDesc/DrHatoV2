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
    "scheduledDate" TIMESTAMP(3),
    "completeDate" TIMESTAMP(3),
    "status" TEXT,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "SurgeriesForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurgeriesForPet" ADD CONSTRAINT "SurgeriesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
