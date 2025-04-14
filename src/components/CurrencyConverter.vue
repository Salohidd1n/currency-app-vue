<template>
  <v-row>
    <v-col cols="6">
      <v-select :items="currencies" v-model="currencyA" label="Валюта" dense />
      <v-text-field
        label="Сумма"
        v-model="amountA"
        @input="convertFromA"
        type="number"
        dense
      />
      <v-alert type="error" v-if="errorA" dense>{{ errorA }}</v-alert>
    </v-col>
    <v-col cols="6">
      <v-select :items="currencies" v-model="currencyB" label="Валюта" dense />
      <v-text-field
        label="Сумма"
        v-model="amountB"
        @input="convertFromB"
        type="number"
        dense
      />
      <v-alert type="error" v-if="errorB" dense>{{ errorB }}</v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { getConversionRate } from '../services/currencyService'

export default defineComponent({
  name: 'CurrencyConverter',
  setup() {
    const currencies = ['USD', 'EUR', 'RUB']
    const currencyA = ref('RUB')
    const currencyB = ref('USD')
    const amountA = ref<string | number>(0)
    const amountB = ref<string | number>(0)
    const errorA = ref('')
    const errorB = ref('')
    let activeField: 'A' | 'B' | null = null

    const convertFromA = async () => {
      if (isNaN(Number(amountA.value))) {
        errorA.value = 'Введите числовое значение'
        return
      } else {
        errorA.value = ''
      }
      activeField = 'A'
      try {
        if (currencyA.value === currencyB.value) {
          amountB.value = Number(amountA.value).toFixed(2)
        } else {
          const rate = await getConversionRate(currencyA.value, currencyB.value)
          const converted = Number(amountA.value) * rate
          amountB.value = converted.toFixed(2)
        }
      } catch (e) {
        errorA.value = 'Ошибка конвертации'
      } finally {
        activeField = null
      }
    }

    const convertFromB = async () => {
      if (isNaN(Number(amountB.value))) {
        errorB.value = 'Введите числовое значение'
        return
      } else {
        errorB.value = ''
      }
      activeField = 'B'
      try {
        if (currencyA.value === currencyB.value) {
          amountA.value = Number(amountB.value).toFixed(2)
        } else {
          const rate = await getConversionRate(currencyB.value, currencyA.value)
          const converted = Number(amountB.value) * rate
          amountA.value = converted.toFixed(2)
        }
      } catch (e) {
        errorB.value = 'Ошибка конвертации'
      } finally {
        activeField = null
      }
    }

    watch([currencyA, currencyB], () => {
      if (activeField === null) {
        convertFromA()
      }
    })

    return {
      currencies,
      currencyA,
      currencyB,
      amountA,
      amountB,
      convertFromA,
      convertFromB,
      errorA,
      errorB
    }
  }
})
</script>
