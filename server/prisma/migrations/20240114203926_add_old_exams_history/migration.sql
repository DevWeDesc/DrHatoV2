-- CreateTable
CREATE TABLE "OldExamsHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "vetId" INTEGER,
    "codConsult" INTEGER,
    "codExam" INTEGER,
    "codAnimal" INTEGER,
    "codCli" INTEGER,
    "madeAt" TIMESTAMP(3),
    "vetName" TEXT,
    "obsOne" TEXT NOT NULL,
    "obsTwo" TEXT NOT NULL,
    "metodology" TEXT,
    "image" BOOLEAN,
    "laboratory" BOOLEAN,
    "petsId" INTEGER,

    CONSTRAINT "OldExamsHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OldExamsHistory" ADD CONSTRAINT "OldExamsHistory_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "Pets"("CodAnimal") ON DELETE SET NULL ON UPDATE CASCADE;
