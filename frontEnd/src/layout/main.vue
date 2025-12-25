<script setup lang="ts">

  import { onMounted, ref, computed } from 'vue'

  import Modal from '@/components/modal.vue'
  import { useLancamentosStore } from '@/stores/useLancamentos'
  
  const modal = ref(false)
  const modalGet = ref(false)

  const lancamentosStore = useLancamentosStore()

  onMounted( async () => {
    await lancamentosStore.getLancamentos()
    console.log("Os dados estao chegando assim", lancamentosStore.lancamentos)
  })

  //Array de teste

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
    data: new Date(item.data).toLocaleDateString(),
    descricao: item.descricao || '',
    valor: Number(item.valor).toFixed(2),
    tipo: item.tipo_lancamento
  }))
)

</script>


<template>

  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Lista de Lançamentos"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="lancamentosStore.Loading"
    />
  </div>

 
  <div>
    <Modal :model-value="modal" />
  </div>

 <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modalGet" persistent>
      <q-card style="min-width: 550px">

        <q-card-section>
          <div class="text-h6 title">Registar Lançamento</div>
        </q-card-section>

        <div>{{ lancamentosStore.lancamentos }}</div>

        <q-form
        >
      
        </q-form>

        <q-separator />
      
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" type="submit" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </div>

</template>
