-- DropForeignKey
ALTER TABLE "Procedures" DROP CONSTRAINT "Procedures_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Procedures" DROP CONSTRAINT "Procedures_sector_id_fkey";

-- AlterTable
ALTER TABLE "Procedures" ALTER COLUMN "group_id" DROP NOT NULL,
ALTER COLUMN "sector_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
