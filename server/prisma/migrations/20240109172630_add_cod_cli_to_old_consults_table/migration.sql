/*
  Warnings:

  - Added the required column `CodCli` to the `OldConsults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OldConsults" ADD COLUMN     "CodCli" INTEGER NOT NULL;
