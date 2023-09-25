-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "isMultiPart" BOOLEAN DEFAULT false,
ADD COLUMN     "multipartId" INTEGER;

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_multipartId_fkey" FOREIGN KEY ("multipartId") REFERENCES "Exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
