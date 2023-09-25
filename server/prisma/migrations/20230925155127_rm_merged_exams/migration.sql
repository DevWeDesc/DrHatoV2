/*
  Warnings:

  - You are about to drop the column `mergedExamsId` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the `MergedExams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_mergedExamsId_fkey";

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "mergedExamsId";

-- DropTable
DROP TABLE "MergedExams";
