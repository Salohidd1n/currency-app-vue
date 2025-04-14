<template>
  <v-list>
    <v-list-item v-for="(rate, currency) in rates" :key="currency">
      <v-list-item-content>
        <v-list-item-title>
          1 {{ currency }} = {{ rate.toFixed(2) }} {{ baseCurrency }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CurrencyRateList',
  props: {
    rates: {
      type: Object as PropType<{ [key: string]: number }>,
      required: true
    },
    baseCurrency: {
      type: String,
      required: true
    }
  }
})
</script>
