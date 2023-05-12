/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Procedures` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Procedures_name_key" ON "Procedures"("name");
