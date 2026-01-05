import { ref  } from 'vue'
import { defineStore } from 'pinia'
import type { TLancamento, TTotalLancamentos, TTotalRecebimento } from '@/types/type.lancamento'
import axios from 'axios'

export const useLancamentosStore = defineStore('lancamentos', () => {

  const lancamentos = ref<TLancamento []>([])
  const Loading = ref(false)

  const postLancamentos = async (data: TLancamento) => {
    try {

      const response = await axios.post<TLancamento>("http://localhost:4000/add-lancamentos", data)

      lancamentos.value.push(response.data)

      await getAllLancamentos()

    } catch (error) {
      
      console.log("Erro não programado", error)
    }
  }

  const getAllLancamentos = async () => {

    try {

      Loading.value = true

      const response = await axios.get("http://localhost:4000/get-lancamentos")

      lancamentos.value = response.data.data

      console.log("Dados vindo do backend", lancamentos.value)

    } catch (error) {

      console.log("Erro não programado", error)
    } finally {
      Loading.value = false
    }
  }



  const getPorPeriodo = async (dataInicial: string, dataFinal: string) => {

    try {

      Loading.value = true

      const response = await axios.post("http://localhost:4000/get-periodo", {dataInicial, dataFinal})

      lancamentos.value = response.data.data

      console.log('Filtro por data:', dataInicial, dataFinal, response.data.data)


    } catch (error) {

      console.log("Erro não programado", error)

    } finally {

      Loading.value = false
    }
  }

  


  return { getPorPeriodo, getAllLancamentos, postLancamentos, lancamentos, Loading }
})
