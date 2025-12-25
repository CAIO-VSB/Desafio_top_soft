//Importando a ferramenta
import express from "express"

import { addLancamento } from "./repository/add.lancamentos"
import { getLancamentos } from "./repository/get.lancamentos";
import cors from 'cors';

//Instancia do expresss
const app: express.Application = express()

//Porta onde o servidor irá rodar
const port: number = 4000

//Autoriza o express aceitar conexões de outras portas
app.use(cors())

//Informando para o express que ele irá utlilizar e ler json
app.use(express.json());


//Rota de teste
app.get("/", (req, res) => {
    res.send("TypeScript com express")
})

//Rota para buscar os dados
app.get("/get-lancamentos", async (req, res) => {
    try {

        const result = await getLancamentos()

            return res.status(200).json({
                status: 200,
                message: "Requisição enviada com sucesso",
                data: result
            })


    } catch (error) {
        console.log("erro ao buscar os dados")
    }
})


//Rota para adicionar no banco 
app.post("/add-lancamentos", async (req, res) => {
    try {
        await addLancamento(req.body)
        res.send({status: 200, message: "Requisicao enviada com sucesso", data: req.body})
    } catch (error) {
        console.error("Erro ao tentar salvar" + error)
        res.send(500).json({
            status: 500,
            message: error,
            error
        })
    }
    
})

//Rota de saúde
app.listen(port, () => {
    console.log(`TypeScripo com epress rodando na porta ${port}`)
})