/*
  Warnings:

  - You are about to drop the column `specialty` on the `Vets` table. All the data in the column will be lost.
  - Added the required column `speciality` to the `Vets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vets" DROP COLUMN "specialty",
ADD COLUMN     "speciality" TEXT NOT NULL;
