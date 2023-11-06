/*
  Warnings:

  - You are about to drop the column `completeDate` on the `SurgeriesForPet` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `SurgeriesForPet` table. All the data in the column will be lost.
  - Added the required column `reportedBy` to the `SurgeriesReports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurgeriesForPet" DROP COLUMN "completeDate",
DROP COLUMN "scheduledDate",
ADD COLUMN     "completedDate" TIMESTAMP(3),
ADD COLUMN     "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SurgeriesReports" ADD COLUMN     "reportedBy" TEXT NOT NULL;
