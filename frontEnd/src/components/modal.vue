<script setup lang="ts">

  import { useNotify } from '@/composables/useNotify';
  import { useValidateFields } from '@/composables/useValidateFields';
  import { useLancamentosStore } from '@/stores/useLancamentos';
  import type { TLancamento } from '@/types/type.lancamento';
  import { ref, watch } from 'vue'

  const modelValue =  defineModel<boolean>()

  const { nameRules, dateRules, valorRules, tipoRules } = useValidateFields()
  const { notify } = useNotify()
  const lancamentosStore = useLancamentosStore()


  const dataBR = ref("")

  const prompt = ref(false)

  const formRef = ref()

  //DTO a ser enviada para o backEnd
  const lancamentoForm = ref<TLancamento>({
    descricao: "",
    valor: "",
    data: "",
    tipo_lancamento: "Recebimento"
  })


  /**
   * Separado a string com Split (retornando algo como: ['2025', '05', '12'])
   * Inverto a ordem do array com reverse (retornando algo como: ['12', '05', '2025'])
   * Junto o array com join (retornando algo como 12/05/2025)
   * @param data
   * @returns Data no padrão BR
   * 
  */
  function paraDataBR(data: string) {
    if (!data) return ""

    return data.split('-').reverse().join('/')
  }

  //Mostra sempre a data atual com base na escolha do usuario
  watch(() => lancamentoForm.value.data, (newDate) => {
    dataBR.value = paraDataBR(newDate)
  })


  //Função que valida e envia os dados para o backEnd
  async function handleSubmit() {

    const formValid = await formRef.value.validate()

    try {

      if (formValid) {

        if (!lancamentoForm.value.tipo_lancamento) {
          notify("Defina o tipo de lançamento", "warning", "warning")
          return false
        }

        const dateISO = new Date(lancamentoForm.value.data).toISOString()

        lancamentoForm.value.data = dateISO

        lancamentosStore.postLancamentos(lancamentoForm.value)

        modelValue.value = false

        notify("Registro efetuado", "positive", "check_circle")

        lancamentoForm.value.data = ""
        lancamentoForm.value.descricao = ""
        lancamentoForm.value.tipo_lancamento = ""
        lancamentoForm.value.valor = ""

      }

    } catch (error) {

      notify("Erro ao salvar os dados. Tente novamente mais tarde", "negative", "error")

      console.log("Erro ao salvar lancamento", error)
    }
}

</script>

<template>

  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Registar lançamento" color="primary" @click="modelValue = true" />

    <q-dialog v-model="modelValue" persistent>
      <q-card style="min-width: 550px">

        <q-card-section>
          <div class="text-h6 title">Registar Lançamento</div>
        </q-card-section>

        <q-form
        @submit="handleSubmit"
        ref="formRef"
        >
          <q-card-section class="q-pt-none">
            <q-input readonly label="Data" mask="##-##-####" v-model="dataBR" autofocus dense  :rules="dateRules">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date mask="YYYY-MM-DD" v-model="lancamentoForm.data">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input label="Descrição" autofocus :rules="nameRules" dense v-model="lancamentoForm.descricao" @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input type="number" label="Valor" autofocus :rules="valorRules" dense v-model="lancamentoForm.valor" @keyup.enter="prompt = false" />
          </q-card-section>

          <q-checkbox 
          val="Pagamento*" 
          :label="lancamentoForm.tipo_lancamento"  
          v-model="lancamentoForm.tipo_lancamento"
          true-value="Recebimento"
          false-value="Pagamento" 
          />

          <p class="title-obs">(*) Desmarque caso seja lancamento de pagamento</p>

          <!-- <div>{{ lancamentoForm.type }}</div> -->
        </q-form>

        <q-separator />
      
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" type="submit" @click="handleSubmit"/>
        </q-card-actions>

      </q-card>
    </q-dialog>

  </div>

</template>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.title-obs {
  font-family: "Poppins", sans-serif;
  margin-left: 9px;
  margin-top: 10px;
}

.title {
  font-family: "Poppins", sans-serif;
}

</style>
