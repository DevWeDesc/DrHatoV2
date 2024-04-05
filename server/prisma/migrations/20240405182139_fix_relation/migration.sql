/*
  Warnings:

  - You are about to drop the `_OldAdmissionProceduresToOldAdmissionsHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[CodInternacao]` on the table `OldAdmissionsHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_OldAdmissionProceduresToOldAdmissionsHistory" DROP CONSTRAINT "_OldAdmissionProceduresToOldAdmissionsHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_OldAdmissionProceduresToOldAdmissionsHistory" DROP CONSTRAINT "_OldAdmissionProceduresToOldAdmissionsHistory_B_fkey";

-- AlterTable
ALTER TABLE "OldAdmissionsHistory" ADD COLUMN     "oldAdmissionProceduresId" INTEGER;

-- DropTable
DROP TABLE "_OldAdmissionProceduresToOldAdmissionsHistory";

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionsHistory_CodInternacao_key" ON "OldAdmissionsHistory"("CodInternacao");

-- AddForeignKey
ALTER TABLE "OldAdmissionsHistory" ADD CONSTRAINT "OldAdmissionsHistory_oldAdmissionProceduresId_fkey" FOREIGN KEY ("oldAdmissionProceduresId") REFERENCES "OldAdmissionProcedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
