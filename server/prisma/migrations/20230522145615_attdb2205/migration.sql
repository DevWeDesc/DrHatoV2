-- AlterTable
ALTER TABLE "Queues" ALTER COLUMN "queueEntry" DROP NOT NULL,
ALTER COLUMN "queueEntry" DROP DEFAULT;
