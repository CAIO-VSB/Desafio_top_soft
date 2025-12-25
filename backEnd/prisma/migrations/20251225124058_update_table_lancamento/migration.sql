/*
  Warnings:

  - You are about to alter the column `valor` on the `lancamento` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "lancamento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "valor" SET DATA TYPE DECIMAL(10,2);
