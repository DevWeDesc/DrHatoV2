/*
  Warnings:

  - You are about to alter the column `phone` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cpf` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET DATA TYPE INTEGER,
ALTER COLUMN "cpf" SET DATA TYPE INTEGER;
