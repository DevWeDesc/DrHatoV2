/*
  Warnings:

  - You are about to drop the column `responsbileBox` on the `HospBoxHistory` table. All the data in the column will be lost.
  - Added the required column `boxHistoryId` to the `InstallmentsDebts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HospBoxHistory" DROP COLUMN "responsbileBox",
ADD COLUMN     "closedBy" TEXT,
ADD COLUMN     "openBy" TEXT;

-- AlterTable
ALTER TABLE "InstallmentsDebts" ADD COLUMN     "boxHistoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_boxHistoryId_fkey" FOREIGN KEY ("boxHistoryId") REFERENCES "HospBoxHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
