-- CreateTable
CREATE TABLE "Especies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Especies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Races" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "especiesId" INTEGER,

    CONSTRAINT "Races_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Races" ADD CONSTRAINT "Races_especiesId_fkey" FOREIGN KEY ("especiesId") REFERENCES "Especies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
