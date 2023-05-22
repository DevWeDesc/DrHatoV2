/*
  Warnings:

  - You are about to drop the column `vetPreference` on the `Queues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "vetPreference" TEXT;

-- AlterTable
ALTER TABLE "Queues" DROP COLUMN "vetPreference";
