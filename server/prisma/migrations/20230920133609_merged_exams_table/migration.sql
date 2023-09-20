-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "mergedExamsId" INTEGER;

-- CreateTable
CREATE TABLE "MergedExams" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DECIMAL(65,30),

    CONSTRAINT "MergedExams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_mergedExamsId_fkey" FOREIGN KEY ("mergedExamsId") REFERENCES "MergedExams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
