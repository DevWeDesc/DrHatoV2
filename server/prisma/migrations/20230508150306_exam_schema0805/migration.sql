-- CreateTable
CREATE TABLE "Exams" (
    "id" SERIAL NOT NULL,
    "examsType" TEXT,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "applicableGender" TEXT,
    "subName" TEXT,
    "description" TEXT,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);
