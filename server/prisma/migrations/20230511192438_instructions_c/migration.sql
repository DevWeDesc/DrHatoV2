-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);
