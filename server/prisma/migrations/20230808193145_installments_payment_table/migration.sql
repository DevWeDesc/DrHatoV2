-- CreateTable
CREATE TABLE "InstallmentsDebts" (
    "id" SERIAL NOT NULL,
    "debitName" TEXT,
    "totalDebit" DECIMAL(65,30),
    "installmentAmount" INTEGER,
    "amountInstallments" DECIMAL(65,30),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "InstallmentsDebts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InstallmentsDebts" ADD CONSTRAINT "InstallmentsDebts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
