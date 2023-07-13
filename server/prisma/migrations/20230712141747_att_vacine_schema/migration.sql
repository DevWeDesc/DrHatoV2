-- CreateTable
CREATE TABLE "Vaccines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Vaccines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vaccines" ADD CONSTRAINT "Vaccines_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
