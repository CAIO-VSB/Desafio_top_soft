import { prisma } from '../lib/prisma'

export async function getPagamentos() {

    const pagamentos = await prisma.lancamento.findMany({
        where: {
            tipo_lancamento: "Pagamento"
        }
    })

    return pagamentos
}