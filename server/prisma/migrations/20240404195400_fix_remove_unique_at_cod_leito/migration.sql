-- DropIndex
DROP INDEX "OldAdmissionsHistory_CodLeito_key";

-- AlterTable
ALTER TABLE "OldAdmissionsHistory" ALTER COLUMN "CodLeito" DROP NOT NULL;
