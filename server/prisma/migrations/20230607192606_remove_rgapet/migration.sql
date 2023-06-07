/*
  Warnings:

  - You are about to drop the column `rga` on the `Pets` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pets_rga_key";

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "rga";
