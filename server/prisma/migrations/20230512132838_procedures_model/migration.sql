/*
  Warnings:

  - You are about to drop the column `setId` on the `Exams` table. All the data in the column will be lost.
  - Added the required column `proced_id` to the `Sectors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exams" DROP CONSTRAINT "Exams_setId_fkey";

-- AlterTable
ALTER TABLE "Exams" DROP COLUMN "setId";

-- AlterTable
ALTER TABLE "Sectors" ADD COLUMN     "examId" INTEGER,
ADD COLUMN     "proced_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Procedures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "applicationInterval" TEXT,
    "applicableGender" TEXT[],
    "ageRange" TEXT[],
    "available" BOOLEAN NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "Procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proced_id" INTEGER NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sectors" ADD CONSTRAINT "Sectors_proced_id_fkey" FOREIGN KEY ("proced_id") REFERENCES "Procedures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sectors" ADD CONSTRAINT "Sectors_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_proced_id_fkey" FOREIGN KEY ("proced_id") REFERENCES "Procedures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
