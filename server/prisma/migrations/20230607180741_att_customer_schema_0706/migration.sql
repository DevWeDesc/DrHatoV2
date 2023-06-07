-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "neighbour" TEXT,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "cep" DROP NOT NULL;
