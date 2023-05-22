/*
  Warnings:

  - Added the required column `queue_id` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "queue_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Queues" (
    "id" SERIAL NOT NULL,
    "ServiceQueue" BOOLEAN DEFAULT false,
    "ReturnQueue" BOOLEAN DEFAULT false,

    CONSTRAINT "Queues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_queue_id_fkey" FOREIGN KEY ("queue_id") REFERENCES "Queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
