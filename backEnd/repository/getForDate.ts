import { prisma } from '../lib/prisma'

export async function getForDate(dataInicial: string, dataFinal: string) {

    console.log("O que ta cheango aqui" + dataInicial, dataFinal)

    const lancamentosNoPeriodo = await prisma.lancamento.findMany({
        where: {
            data: {
                gte: new Date(dataInicial),
                lte: new Date(dataFinal),
            }
        }
    })

    return lancamentosNoPeriodo
}