/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Vets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_plantId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "crmv" INTEGER,
ADD COLUMN     "userType" TEXT[] DEFAULT ARRAY['admin', 'user', 'vet']::TEXT[];

-- DropTable
DROP TABLE "Vets";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
