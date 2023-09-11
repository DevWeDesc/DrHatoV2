-- CreateTable
CREATE TABLE "ExamCharacteristics" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "especie" JSONB,
    "examsId" INTEGER,

    CONSTRAINT "ExamCharacteristics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamCharacteristics" ADD CONSTRAINT "ExamCharacteristics_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "Exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
