-- AlterTable
ALTER TABLE "Surgeries" ADD COLUMN     "priceFour" DECIMAL(65,30),
ADD COLUMN     "priceThree" DECIMAL(65,30),
ADD COLUMN     "priceTwo" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Vaccines" ADD COLUMN     "priceFour" DECIMAL(65,30),
ADD COLUMN     "priceThree" DECIMAL(65,30),
ADD COLUMN     "priceTwo" DECIMAL(65,30);
