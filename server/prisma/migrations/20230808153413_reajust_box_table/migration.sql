/*
  Warnings:

  - You are about to drop the column `closeBox` on the `HospVetBox` table. All the data in the column will be lost.
  - You are about to drop the column `openBox` on the `HospVetBox` table. All the data in the column will be lost.
  - You are about to drop the column `responsbileBox` on the `HospVetBox` table. All the data in the column will be lost.
  - You are about to drop the column `totalValues` on the `HospVetBox` table. All the data in the column will be lost.
  - Added the required column `name` to the `HospVetBox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HospVetBox" DROP COLUMN "closeBox",
DROP COLUMN "openBox",
DROP COLUMN "responsbileBox",
DROP COLUMN "totalValues",
ADD COLUMN     "movimentedValues" DECIMAL(65,30),
ADD COLUMN     "name" TEXT NOT NULL;
