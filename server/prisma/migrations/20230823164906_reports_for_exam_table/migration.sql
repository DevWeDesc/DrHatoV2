-- CreateTable
CREATE TABLE "ReportForExams" (
    "id" SERIAL NOT NULL,
    "report" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examsId" INTEGER NOT NULL,

    CONSTRAINT "ReportForExams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportForExams" ADD CONSTRAINT "ReportForExams_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "ExamsForPet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
