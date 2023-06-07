/*
  Warnings:

  - You are about to drop the column `birthDay` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `vetPreference` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "birthDay",
DROP COLUMN "vetPreference";
