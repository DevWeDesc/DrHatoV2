-- AlterTable
ALTER TABLE "Exams" ADD COLUMN     "applicableToFemale" BOOLEAN,
ADD COLUMN     "applicableToMale" BOOLEAN;

-- AlterTable
ALTER TABLE "Surgeries" ADD COLUMN     "applicableToFemale" BOOLEAN,
ADD COLUMN     "applicableToMale" BOOLEAN;
