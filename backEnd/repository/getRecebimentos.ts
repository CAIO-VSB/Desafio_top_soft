import { prisma } from '../lib/prisma'

export async function getRecebimentos() {

    const recebimentos = await prisma.lancamento.findMany({
        where: {
            tipo_lancamento: "Recebimento"
        }
    })

    return recebimentos
}