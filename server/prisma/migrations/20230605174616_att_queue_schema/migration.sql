/*
  Warnings:

  - You are about to drop the column `returnQueue` on the `Queues` table. All the data in the column will be lost.
  - You are about to drop the column `serviceQueue` on the `Queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Queues" DROP COLUMN "returnQueue",
DROP COLUMN "serviceQueue",
ADD COLUMN     "vetPreference" TEXT;
