<!-- src/components/Header.vue -->
<template>
  <v-app-bar app>
    <v-toolbar-title>Конвертер валют</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Главная</v-btn>
    <v-btn text to="/convert">Конвертация</v-btn>
    <v-select
      :items="currencies"
      label="Валюта"
      v-model="selectedCurrency"
      @update:modelValue="changeBaseCurrency"
      dense
      hide-details
      style="max-width: 120px"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useCurrencyStore } from '../store'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useCurrencyStore()

    const selectedCurrency = ref(store.baseCurrency)
    const currencies = ['USD', 'EUR', 'RUB']

    const changeBaseCurrency = (value: string) => {
      store.setBaseCurrency(value)
    }

    watch(
      () => store.baseCurrency,
      (newVal) => {
        selectedCurrency.value = newVal
      }
    )

    return { selectedCurrency, currencies, changeBaseCurrency }
  }
})
</script>
