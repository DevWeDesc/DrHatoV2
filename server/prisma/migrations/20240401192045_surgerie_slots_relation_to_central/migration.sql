-- AlterTable
ALTER TABLE "SurgerieSlots" ADD COLUMN     "surgeriesCentralId" INTEGER;

-- AddForeignKey
ALTER TABLE "SurgerieSlots" ADD CONSTRAINT "SurgerieSlots_surgeriesCentralId_fkey" FOREIGN KEY ("surgeriesCentralId") REFERENCES "SurgeriesCentral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
