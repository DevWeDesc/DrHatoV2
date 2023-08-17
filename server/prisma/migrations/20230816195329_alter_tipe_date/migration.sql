/*
  Warnings:

  - The `requesteData` column on the `ExamsForPet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ExamsForPet" DROP COLUMN "requesteData",
ADD COLUMN     "requesteData" TIMESTAMP(3);
