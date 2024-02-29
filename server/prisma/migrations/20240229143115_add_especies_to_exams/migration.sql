-- AlterTable
ALTER TABLE "Especies" ADD COLUMN     "oldExamsCodexam" INTEGER;

-- CreateTable
CREATE TABLE "_EspeciesToOldExams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EspeciesToOldExams_AB_unique" ON "_EspeciesToOldExams"("A", "B");

-- CreateIndex
CREATE INDEX "_EspeciesToOldExams_B_index" ON "_EspeciesToOldExams"("B");

-- AddForeignKey
ALTER TABLE "_EspeciesToOldExams" ADD CONSTRAINT "_EspeciesToOldExams_A_fkey" FOREIGN KEY ("A") REFERENCES "Especies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EspeciesToOldExams" ADD CONSTRAINT "_EspeciesToOldExams_B_fkey" FOREIGN KEY ("B") REFERENCES "OldExams"("codexam") ON DELETE CASCADE ON UPDATE CASCADE;
