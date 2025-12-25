import { ref  } from 'vue'
import { defineStore } from 'pinia'
import type { TLancamento } from '@/types/type.lancamento'
import axios from 'axios'

export const useLancamentosStore = defineStore('lancamentos', () => {

  const lancamentos = ref<TLancamento []>([])
  const Loading = ref(false)

  const postLancamentos = async (data: TLancamento) => {
    try {

      const response = await axios.post<TLancamento>("http://localhost:4000/add-lancamentos", data)

      lancamentos.value.push(response.data)

      await getLancamentos()

    } catch (error) {
      console.log("Erro não programado", error)
    }
  }

  const getLancamentos = async () => {

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


  return { getLancamentos, postLancamentos, lancamentos, Loading }
})
