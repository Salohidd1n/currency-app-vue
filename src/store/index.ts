import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'RUB'
  }),
  actions: {
    setBaseCurrency(currency: string) {
      this.baseCurrency = currency
    }
  }
})
