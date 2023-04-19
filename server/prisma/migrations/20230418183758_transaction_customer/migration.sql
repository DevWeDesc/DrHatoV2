/*
  Warnings:

  - Added the required column `balance` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "balance" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transaction_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
