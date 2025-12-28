import { prisma } from '../lib/prisma'

export async function getForDate(dataInicial: string, dataFinal: string) {

    const start = new Date(`${dataInicial}T00:00:00.000Z`)
    const end = new Date(`${dataFinal}T23:59:59.999Z`)

    console.log(start, end)
    
    console.log("O que ta cheango aqui" + dataInicial, dataFinal)

    const lancamentosNoPeriodo = await prisma.lancamento.findMany({
        where: {
            data: {
                gte: start,
                lte: end,
            }
        }
    })

    return lancamentosNoPeriodo
}