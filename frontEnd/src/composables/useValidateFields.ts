import { ref } from 'vue'

export function useValidateFields() {

    const numberRegex: RegExp = /^\d+$/;

    const nameRules = ref([
        (val: string) => !!val || "Campo nome é obrigatório"
    ])

    const dateRules = ref([
        (val: string) => !!val || "Campo data é obrigatório"
    ])

    const valorRules = ref([
        (val: string) => !!val || "Campo valor é obrigatório",
        (val: string) => numberRegex.test(val) || "Caractere inválido! Somente números"
    ])

    const tipoRules = ref([
        (val: string) => !!val || "Define o tipo do lançamento"
    ])


    return {
        nameRules,
        valorRules,
        dateRules,
        tipoRules
    }
}