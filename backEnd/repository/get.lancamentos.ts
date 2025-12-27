
import { prisma } from '../lib/prisma'

export async function getLancamentos() {

    const lancamentos = await prisma.lancamento.findMany()

    return lancamentos
}