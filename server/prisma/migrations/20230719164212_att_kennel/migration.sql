-- AlterTable
ALTER TABLE "Kennel" ADD COLUMN     "description" TEXT,
ADD COLUMN     "price" DECIMAL(65,30),
ALTER COLUMN "totalBeds" DROP NOT NULL;
