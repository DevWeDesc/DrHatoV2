-- CreateTable
CREATE TABLE "OldAdmissionsHistory" (
    "id" SERIAL NOT NULL,
    "CodAnimal" INTEGER,
    "CodLeito" INTEGER,
    "CodInternacao" INTEGER,
    "entryDay" TIMESTAMP(3),
    "exitDay" TIMESTAMP(3),
    "exitHour" TEXT,
    "entryHour" TEXT,
    "petsId" INTEGER,

    CONSTRAINT "OldAdmissionsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OldAdmissionProcedures" (
    "id" SERIAL NOT NULL,
    "CodAnimal" INTEGER,
    "CodInternacao" INTEGER,
    "procedureName" TEXT,
    "procedureValue" DOUBLE PRECISION,
    "oldAdmissionsHistoryId" INTEGER,

    CONSTRAINT "OldAdmissionProcedures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionsHistory_CodAnimal_key" ON "OldAdmissionsHistory"("CodAnimal");

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionsHistory_CodLeito_key" ON "OldAdmissionsHistory"("CodLeito");

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionsHistory_CodInternacao_key" ON "OldAdmissionsHistory"("CodInternacao");

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionProcedures_CodAnimal_key" ON "OldAdmissionProcedures"("CodAnimal");

-- CreateIndex
CREATE UNIQUE INDEX "OldAdmissionProcedures_CodInternacao_key" ON "OldAdmissionProcedures"("CodInternacao");

-- AddForeignKey
ALTER TABLE "OldAdmissionsHistory" ADD CONSTRAINT "OldAdmissionsHistory_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldAdmissionProcedures" ADD CONSTRAINT "OldAdmissionProcedures_oldAdmissionsHistoryId_fkey" FOREIGN KEY ("oldAdmissionsHistoryId") REFERENCES "OldAdmissionsHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
