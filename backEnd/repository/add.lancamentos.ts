import { TLancamentoApi } from "../types/type.lancamento";
import { prisma } from '../lib/prisma'
import { Prisma } from "../generated/prisma/client";

export async function addLancamento(data: TLancamentoApi) {

    const lancamento = await prisma.lancamento.create({

        data: {
            descricao: data.descricao,
            data: data.data,
            valor: new Prisma.Decimal(data.valor),
            tipo_lancamento: data.tipo_lancamento
        }

    })

    console.log("A data que chegou", data)

    return lancamento
}

