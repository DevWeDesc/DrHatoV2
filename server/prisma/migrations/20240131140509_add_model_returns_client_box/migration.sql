-- CreateTable
CREATE TABLE "ReturnsClientBox" (
    "id" INTEGER NOT NULL,
    "idHospVetBox" INTEGER,
    "idCustomer" INTEGER,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "ReturnsClientBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReturnsClientBox_id_key" ON "ReturnsClientBox"("id");

-- AddForeignKey
ALTER TABLE "ReturnsClientBox" ADD CONSTRAINT "ReturnsClientBox_idHospVetBox_fkey" FOREIGN KEY ("idHospVetBox") REFERENCES "HospVetBox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnsClientBox" ADD CONSTRAINT "ReturnsClientBox_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "CustomerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
