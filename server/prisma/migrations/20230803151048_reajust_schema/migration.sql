-- CreateTable
CREATE TABLE "PricesAccumulator" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "accumulator" DECIMAL(65,30),

    CONSTRAINT "PricesAccumulator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricesAccumulator_petId_key" ON "PricesAccumulator"("petId");

-- AddForeignKey
ALTER TABLE "PricesAccumulator" ADD CONSTRAINT "PricesAccumulator_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
