/*
  Warnings:

  - You are about to drop the column `examsId` on the `ExamCharacteristics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamCharacteristics" DROP CONSTRAINT "ExamCharacteristics_examsId_fkey";

-- AlterTable
ALTER TABLE "ExamCharacteristics" DROP COLUMN "examsId";

-- CreateTable
CREATE TABLE "_ExamCharacteristicsToExams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamCharacteristicsToExams_AB_unique" ON "_ExamCharacteristicsToExams"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamCharacteristicsToExams_B_index" ON "_ExamCharacteristicsToExams"("B");

-- AddForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" ADD CONSTRAINT "_ExamCharacteristicsToExams_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamCharacteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamCharacteristicsToExams" ADD CONSTRAINT "_ExamCharacteristicsToExams_B_fkey" FOREIGN KEY ("B") REFERENCES "Exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
