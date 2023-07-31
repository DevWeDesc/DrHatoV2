/*
  Warnings:

  - You are about to alter the column `dailyRate` on the `Bed` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bed" ALTER COLUMN "dailyRate" SET DATA TYPE INTEGER,
ALTER COLUMN "totalDebt" SET DATA TYPE DECIMAL(65,30);
