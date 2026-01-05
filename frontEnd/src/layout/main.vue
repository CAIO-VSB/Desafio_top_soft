<script setup lang="ts">

  import { onMounted, ref, computed, watch } from 'vue'

  import Modal from '@/components/modal.vue'
  import { useLancamentosStore } from '@/stores/useLancamentos'

  //Import do grafico
  import { DoughnutChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  Chart.register(...registerables);

  const modal = ref(false)
  const periodo = ref({
    dataInical: "",
    dataFinal: ""
  })
  const dataBRInicial = ref("")
  const dataBRFinal = ref("")

  const lancamentosStore = useLancamentosStore()

  watch(() => periodo.value.dataInical, (newValue) => {
    dataBRInicial.value = paraDataBRInicial(newValue)
    console.log("Data inicial BR " + dataBRInicial.value)
  })

  watch(() => periodo.value.dataFinal, (newValue) => {
    dataBRFinal.value = paraDataBRFinal(newValue)
    console.log("Data final BR", dataBRFinal.value)
  })

  onMounted( async () => {
    await lancamentosStore.getAllLancamentos()
  })

  // Colunas da tabela
  const columns = [
    { name: 'data', align: 'center', label: 'Data', field: 'data' },
    { name: 'descricao', align: 'center', label: 'Descriçao', field: 'descricao' },
    { name: 'valor', align: 'center', label: 'Valor', field: 'valor' },
    { name: 'tipo', align: 'center', label: 'Tipo', field: 'tipo' },

  ]

  //Linhas da tabela
  const rows = computed(() =>
    (lancamentosStore.lancamentos || []).map(item => ({
      data: new Date(item.data).toLocaleDateString("pt-BR", {timeZone: "UTC"}),
      descricao: item.descricao || '',
      valor: Number(item.valor).toFixed(2),
      tipo: item.tipo_lancamento
    }))
  )

  const totalRecebimentos = computed(() => {

    return (lancamentosStore.lancamentos || [])
    .filter(item => item.tipo_lancamento === "Recebimento")
    .reduce((acc, item) => Number(acc) + Number(item.valor), 0)

  })

  const totalPagamentos = computed(() => {

    return (lancamentosStore.lancamentos || [])
    .filter(item => item.tipo_lancamento === "Pagamento")
    .reduce((acc, item) => Number(acc) + Number(item.valor), 0)

  })



  const testData = computed(() => ({
    labels: ['Recebimentos', 'Pagamentos'],
    datasets: [
      {
        data: [totalRecebimentos.value, totalPagamentos.value]
      }
    ]
  }))

  function paraDataBRInicial(dataInicial: string) {
    return dataInicial.split('/').reverse().join('/')
  }

  function paraDataBRFinal(dataFinal: string) {
    return dataFinal.split('/').reverse().join('/')
  }


  async function buscarPorPeriodo() {

    const dateISO = new Date(periodo.value.dataInical).toISOString()
    const dateISO1 = new Date(periodo.value.dataFinal).toISOString()

    console.log("Data inicial no formatod ISO", dateISO)
    console.log("Data inicial no formatod ISO", dateISO1)

    const testeResult = await lancamentosStore.getPorPeriodo(dateISO, dateISO1)

  }

  async function resetarPeriodo() {

    periodo.value.dataFinal = ""
    periodo.value.dataInical = ""

    await lancamentosStore.getAllLancamentos()
  }

</script>

<template>
  <div class="container"> 
    <div class="container-date">
      <div class="q-pa-md" style="max-width: 300px">
        <q-input label="data inicial" mask="##/##/####" filled v-model="dataBRInicial">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="periodo.dataInical">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-pa-md" style="max-width: 300px">
        <q-input label="data final" mask="##/##/####" filled v-model="dataBRFinal">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="periodo.dataFinal">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="buttons">
        <q-btn @click="buscarPorPeriodo" color="primary" label="Filtrar" />
      </div>
      
      <div>
        <q-btn @click="resetarPeriodo" color="primary" label="Resetar" />
      </div>
      
    </div>
    
    <div class="q-pa-md">
    <q-table
      flat bordered
      title="Lista de Lançamentos"
      :rows="rows"
      :columns="columns"
      row-key="id"
      no-data-label="Sem dados"
      :loading="lancamentosStore.Loading"
    />
  </div>

  <div>
    <Modal :model-value="modal" />
  </div>

 <div class="q-pa-md q-gutter-sm">
    
    <div>
      <DoughnutChart :chartData="testData" />
    </div>


  </div>

  </div>

</template>

<style scoped>

.container-buttons {
  background-color: blue;
  margin-top: 10px;
}

.container-date {
  display: flex;
  align-items: center;
}

.buttons {
  margin: 5px;
}

</style>


