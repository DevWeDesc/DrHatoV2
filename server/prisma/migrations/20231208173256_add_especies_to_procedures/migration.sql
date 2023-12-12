-- AlterTable
ALTER TABLE "Especies" ADD COLUMN     "proceduresId" INTEGER;

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "codGroup" INTEGER;

-- AddForeignKey
ALTER TABLE "Especies" ADD CONSTRAINT "Especies_proceduresId_fkey" FOREIGN KEY ("proceduresId") REFERENCES "Procedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
