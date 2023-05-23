/*
  Warnings:

  - You are about to drop the column `queueEntry` on the `Queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queues" DROP COLUMN "queueEntry",
ADD COLUMN     "queryEntry" TEXT;
