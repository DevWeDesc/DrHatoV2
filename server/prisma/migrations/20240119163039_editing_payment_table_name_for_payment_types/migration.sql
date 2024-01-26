/*
  Warnings:

  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Payments";

-- CreateTable
CREATE TABLE "PaymentsType" (
    "id" SERIAL NOT NULL,
    "typePayment" TEXT NOT NULL,

    CONSTRAINT "PaymentsType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentsType_typePayment_key" ON "PaymentsType"("typePayment");
