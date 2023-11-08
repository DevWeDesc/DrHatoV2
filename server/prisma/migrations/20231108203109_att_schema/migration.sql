/*
  Warnings:

  - A unique constraint covering the columns `[CodCli]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_CodCli_key" ON "Customer"("CodCli");
