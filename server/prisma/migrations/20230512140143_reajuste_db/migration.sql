/*
  Warnings:

  - You are about to drop the column `proced_id` on the `Groups` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `Procedures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_proced_id_fkey";

-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "proced_id";

-- AlterTable
ALTER TABLE "Procedures" ADD COLUMN     "group_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Procedures" ADD CONSTRAINT "Procedures_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
