-- CreateTable
CREATE TABLE "PetExam" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetExam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetExam" ADD CONSTRAINT "PetExam_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetExam" ADD CONSTRAINT "PetExam_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
