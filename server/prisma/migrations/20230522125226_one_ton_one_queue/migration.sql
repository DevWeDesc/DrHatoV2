/*
  Warnings:

  - A unique constraint covering the columns `[pet_id]` on the table `Queues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Queues_pet_id_key" ON "Queues"("pet_id");
