/*
  Warnings:

  - You are about to drop the column `queryEntry` on the `Queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queues" DROP COLUMN "queryEntry",
ADD COLUMN     "queueEntry" TEXT;
