-- DropForeignKey
ALTER TABLE "Especies" DROP CONSTRAINT "Especies_proceduresId_fkey";

-- CreateTable
CREATE TABLE "_EspeciesToProcedures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EspeciesToProcedures_AB_unique" ON "_EspeciesToProcedures"("A", "B");

-- CreateIndex
CREATE INDEX "_EspeciesToProcedures_B_index" ON "_EspeciesToProcedures"("B");

-- AddForeignKey
ALTER TABLE "_EspeciesToProcedures" ADD CONSTRAINT "_EspeciesToProcedures_A_fkey" FOREIGN KEY ("A") REFERENCES "Especies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EspeciesToProcedures" ADD CONSTRAINT "_EspeciesToProcedures_B_fkey" FOREIGN KEY ("B") REFERENCES "Procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
