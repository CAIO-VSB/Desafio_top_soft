/*
  Warnings:

  - You are about to drop the column `tipo` on the `lancamento` table. All the data in the column will be lost.
  - Added the required column `tipo_lancamento` to the `lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lancamento" DROP COLUMN "tipo",
ADD COLUMN     "tipo_lancamento" TEXT NOT NULL;
