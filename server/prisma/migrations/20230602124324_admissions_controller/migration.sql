-- CreateTable
CREATE TABLE "Kennel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "totalBeds" INTEGER NOT NULL,

    CONSTRAINT "Kennel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bed" (
    "id" SERIAL NOT NULL,
    "kennelId" INTEGER NOT NULL,
    "petId" INTEGER,
    "isBusy" BOOLEAN DEFAULT false,
    "mustFasting" BOOLEAN DEFAULT false,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bed_petId_key" ON "Bed"("petId");

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_kennelId_fkey" FOREIGN KEY ("kennelId") REFERENCES "Kennel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
