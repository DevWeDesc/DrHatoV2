-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "typePayment" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_typePayment_key" ON "Payments"("typePayment");
