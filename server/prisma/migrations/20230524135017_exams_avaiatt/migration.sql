-- AlterTable
ALTER TABLE "Exams" ALTER COLUMN "available" DROP NOT NULL,
ALTER COLUMN "available" SET DEFAULT false;
