/*
  Warnings:

  - You are about to drop the column `status` on the `Pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "status",
ADD COLUMN     "haveChip" BOOLEAN,
ADD COLUMN     "isCastred" BOOLEAN,
ALTER COLUMN "weigth" DROP NOT NULL,
ALTER COLUMN "corPet" DROP NOT NULL,
ALTER COLUMN "sizePet" DROP NOT NULL,
ALTER COLUMN "observations" DROP NOT NULL;
