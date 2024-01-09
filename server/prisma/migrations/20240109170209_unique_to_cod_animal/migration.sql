/*
  Warnings:

  - A unique constraint covering the columns `[CodAnimal]` on the table `Pets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pets_CodAnimal_key" ON "Pets"("CodAnimal");
