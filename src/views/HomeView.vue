<template>
  <v-container>
    <h1>Курсы валют ({{ baseCurrency }})</h1>
    <CurrencyRateList
      :rates="rates"
      :baseCurrency="baseCurrency"
      v-if="rates && Object.keys(rates).length"
    />
    <v-progress-circular v-else indeterminate color="primary" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useCurrencyStore } from '../store'
import CurrencyRateList from '../components/CurrencyRateList.vue'
import { getCurrencyRates } from '../services/currencyService'

export default defineComponent({
  name: 'HomeView',
  components: { CurrencyRateList },
  setup() {
    const store = useCurrencyStore()

    const baseCurrency = computed(() => store.baseCurrency)
    const rates = ref<{ [key: string]: number }>({})

    const fetchRates = async () => {
      try {
        const data = await getCurrencyRates(store.baseCurrency)
        rates.value = data
      } catch (error) {
        console.error('Ошибка получения курсов валют:', error)
      }
    }

    onMounted(() => {
      fetchRates()
    })

    watch(baseCurrency, () => {
      fetchRates()
    })

    return { rates, baseCurrency }
  }
})
</script>
