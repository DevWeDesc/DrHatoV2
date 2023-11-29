/*
  Warnings:

  - You are about to drop the column `ageRange` on the `ProceduresForPet` table. All the data in the column will be lost.
  - You are about to drop the column `applicableGender` on the `ProceduresForPet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProceduresForPet" DROP COLUMN "ageRange",
DROP COLUMN "applicableGender",
ADD COLUMN     "categoryOld" TEXT,
ADD COLUMN     "maxAge" INTEGER,
ADD COLUMN     "minAge" INTEGER,
ADD COLUMN     "priceFour" DECIMAL(65,30),
ADD COLUMN     "priceThree" DECIMAL(65,30),
ADD COLUMN     "priceTwo" DECIMAL(65,30),
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "observations" DROP NOT NULL;
