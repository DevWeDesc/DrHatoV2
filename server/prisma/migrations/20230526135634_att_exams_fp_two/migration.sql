-- AlterTable
ALTER TABLE "ExamsForPet" ADD COLUMN     "examsType" TEXT[] DEFAULT ARRAY['lab']::TEXT[];
