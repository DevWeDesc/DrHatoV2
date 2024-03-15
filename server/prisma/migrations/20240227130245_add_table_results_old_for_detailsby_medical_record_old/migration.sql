-- CreateTable
CREATE TABLE "ResultsOld" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "petId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "examName" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "requesterCRM" TEXT NOT NULL,
    "report" JSONB,

    CONSTRAINT "ResultsOld_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResultsOld" ADD CONSTRAINT "ResultsOld_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
