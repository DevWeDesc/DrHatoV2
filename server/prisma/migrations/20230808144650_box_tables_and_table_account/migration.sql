-- AlterTable
ALTER TABLE "ProceduresForPet" ADD COLUMN     "isDone" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "SurgeriesForPet" ADD COLUMN     "isDone" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "VaccinesForPet" ADD COLUMN     "isDone" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "HospVetBox" (
    "id" SERIAL NOT NULL,
    "entryValues" DECIMAL(65,30),
    "exitValues" DECIMAL(65,30),
    "totalValues" DECIMAL(65,30),
    "openBox" TIMESTAMP(3),
    "closeBox" TIMESTAMP(3),
    "responsbileBox" TEXT,
    "boxIsOpen" BOOLEAN DEFAULT false,

    CONSTRAINT "HospVetBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospBoxHistory" (
    "id" SERIAL NOT NULL,
    "entryValues" DECIMAL(65,30),
    "exitValues" DECIMAL(65,30),
    "totalValues" DECIMAL(65,30),
    "openBox" TIMESTAMP(3),
    "closeBox" TIMESTAMP(3),
    "responsbileBox" TEXT,
    "hospVetBoxId" INTEGER,

    CONSTRAINT "HospBoxHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAccount" (
    "id" SERIAL NOT NULL,
    "accountNumber" INTEGER,
    "debits" DECIMAL(65,30),
    "credits" DECIMAL(65,30),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "CustomerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAccount_customerId_key" ON "CustomerAccount"("customerId");

-- AddForeignKey
ALTER TABLE "HospBoxHistory" ADD CONSTRAINT "HospBoxHistory_hospVetBoxId_fkey" FOREIGN KEY ("hospVetBoxId") REFERENCES "HospVetBox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAccount" ADD CONSTRAINT "CustomerAccount_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
