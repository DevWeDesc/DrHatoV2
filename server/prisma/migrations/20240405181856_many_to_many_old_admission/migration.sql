/*
  Warnings:

  - You are about to drop the column `oldAdmissionsHistoryId` on the `OldAdmissionProcedures` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OldAdmissionProcedures" DROP CONSTRAINT "OldAdmissionProcedures_oldAdmissionsHistoryId_fkey";

-- AlterTable
ALTER TABLE "OldAdmissionProcedures" DROP COLUMN "oldAdmissionsHistoryId";

-- CreateTable
CREATE TABLE "_OldAdmissionProceduresToOldAdmissionsHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OldAdmissionProceduresToOldAdmissionsHistory_AB_unique" ON "_OldAdmissionProceduresToOldAdmissionsHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_OldAdmissionProceduresToOldAdmissionsHistory_B_index" ON "_OldAdmissionProceduresToOldAdmissionsHistory"("B");

-- AddForeignKey
ALTER TABLE "_OldAdmissionProceduresToOldAdmissionsHistory" ADD CONSTRAINT "_OldAdmissionProceduresToOldAdmissionsHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "OldAdmissionProcedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OldAdmissionProceduresToOldAdmissionsHistory" ADD CONSTRAINT "_OldAdmissionProceduresToOldAdmissionsHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "OldAdmissionsHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
