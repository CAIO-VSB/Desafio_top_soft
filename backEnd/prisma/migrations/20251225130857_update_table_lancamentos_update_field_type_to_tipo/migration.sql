/*
  Warnings:

  - You are about to drop the column `type` on the `lancamento` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lancamento" DROP COLUMN "type",
ADD COLUMN     "tipo" TEXT NOT NULL;
