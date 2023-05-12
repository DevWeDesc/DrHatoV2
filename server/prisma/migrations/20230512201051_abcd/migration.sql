/*
  Warnings:

  - Added the required column `sector_id` to the `Procedures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sectors" DROP CONSTRAINT "Sectors_proced_id_fkey";

-- AlterTable
ALTER TABLE "Procedures" ADD COLUMN     "sector_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sectors" ADD COLUMN     "sectorsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
