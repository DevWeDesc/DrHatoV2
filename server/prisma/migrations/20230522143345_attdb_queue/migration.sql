/*
  Warnings:

  - You are about to drop the column `ReturnQueue` on the `Queues` table. All the data in the column will be lost.
  - You are about to drop the column `ServiceQueue` on the `Queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queues" DROP COLUMN "ReturnQueue",
DROP COLUMN "ServiceQueue",
ADD COLUMN     "queryType" TEXT,
ADD COLUMN     "queueEntry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "returnQueue" BOOLEAN DEFAULT false,
ADD COLUMN     "serviceQueue" BOOLEAN DEFAULT false,
ADD COLUMN     "vetPreference" TEXT;
