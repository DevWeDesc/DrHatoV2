-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "birthDay" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "tell" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
