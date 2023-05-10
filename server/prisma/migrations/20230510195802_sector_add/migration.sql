-- CreateTable
CREATE TABLE "Sectors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" INTEGER NOT NULL,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sectors" ADD CONSTRAINT "Sectors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
