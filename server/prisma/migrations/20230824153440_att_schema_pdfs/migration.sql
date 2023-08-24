-- AlterTable
ALTER TABLE "ReportForExams" ADD COLUMN     "externalReport" TEXT[],
ADD COLUMN     "imageReport" TEXT[],
ADD COLUMN     "internalReport" TEXT[],
ALTER COLUMN "report" DROP NOT NULL;
