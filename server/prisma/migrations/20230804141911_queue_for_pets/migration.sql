/*
  Warnings:

  - The `queueEntry` column on the `Queues` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Queues" ADD COLUMN     "queueExit" TIMESTAMP(3),
DROP COLUMN "queueEntry",
ADD COLUMN     "queueEntry" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "QueuesForPet" (
    "id" SERIAL NOT NULL,
    "queueEntry" TIMESTAMP(3),
    "queueExit" TIMESTAMP(3),
    "queryType" TEXT,
    "debitOnThisQuery" DECIMAL(65,30),
    "responsibleVeterinarian" TEXT,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "QueuesForPet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QueuesForPet" ADD CONSTRAINT "QueuesForPet_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "MedicineRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
