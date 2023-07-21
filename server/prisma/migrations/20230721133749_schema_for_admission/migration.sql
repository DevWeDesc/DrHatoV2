-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "dailyRate" DECIMAL(65,30),
ADD COLUMN     "entryOur" TIMESTAMP(3),
ADD COLUMN     "exitOur" TIMESTAMP(3),
ADD COLUMN     "hospitalizedDays" INTEGER,
ADD COLUMN     "totalDebt" INTEGER;
