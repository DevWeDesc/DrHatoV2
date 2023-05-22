/*
  Warnings:

  - You are about to drop the column `queue_id` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `Queues` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_queue_id_fkey";

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "queue_id";

-- AlterTable
ALTER TABLE "Queues" ADD COLUMN     "pet_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Queues" ADD CONSTRAINT "Queues_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
