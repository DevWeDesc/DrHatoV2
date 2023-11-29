/*
  Warnings:

  - You are about to drop the column `ageRange` on the `Procedures` table. All the data in the column will be lost.
  - You are about to drop the column `applicableGender` on the `Procedures` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codProcedimento]` on the table `Procedures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codProcedimento` to the `Procedures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Procedures" DROP COLUMN "ageRange",
DROP COLUMN "applicableGender",
ADD COLUMN     "applicableFemale" BOOLEAN,
ADD COLUMN     "applicableMale" BOOLEAN,
ADD COLUMN     "categoryOld" TEXT,
ADD COLUMN     "categoryProcedure" INTEGER,
ADD COLUMN     "codProcedimento" INTEGER NOT NULL,
ADD COLUMN     "maxAge" INTEGER,
ADD COLUMN     "minAge" INTEGER,
ADD COLUMN     "priceFour" DECIMAL(65,30),
ADD COLUMN     "priceThree" DECIMAL(65,30),
ADD COLUMN     "priceTwo" DECIMAL(65,30),
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "Procedures_codProcedimento_key" ON "Procedures"("codProcedimento");
