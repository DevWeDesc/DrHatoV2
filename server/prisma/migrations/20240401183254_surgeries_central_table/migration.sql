-- CreateTable
CREATE TABLE "SurgeriesCentral" (
    "id" SERIAL NOT NULL,
    "centralName" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "openHours" TEXT NOT NULL,
    "closedHours" TEXT NOT NULL,
    "maxSlots" INTEGER NOT NULL,
    "usedSlots" INTEGER NOT NULL,
    "movimentedValues" DOUBLE PRECISION,
    "surgeriesCompleteds" INTEGER,

    CONSTRAINT "SurgeriesCentral_pkey" PRIMARY KEY ("id")
);
