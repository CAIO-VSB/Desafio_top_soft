/*
  Warnings:

  - You are about to drop the `Lancamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Lancamento";

-- CreateTable
CREATE TABLE "lancamento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "lancamento_pkey" PRIMARY KEY ("id")
);
