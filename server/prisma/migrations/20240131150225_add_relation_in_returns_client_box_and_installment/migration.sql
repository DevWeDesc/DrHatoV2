/*
  Warnings:

  - A unique constraint covering the columns `[idInstallment]` on the table `ReturnsClientBox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reasonForReturn` to the `ReturnsClientBox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ReturnsClientBox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReturnsClientBox" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idInstallment" INTEGER,
ADD COLUMN     "reasonForReturn" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReturnsClientBox_idInstallment_key" ON "ReturnsClientBox"("idInstallment");

-- AddForeignKey
ALTER TABLE "ReturnsClientBox" ADD CONSTRAINT "ReturnsClientBox_idInstallment_fkey" FOREIGN KEY ("idInstallment") REFERENCES "InstallmentsDebts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
