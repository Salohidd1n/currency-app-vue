<template>
  <v-container>
    <h1>Конвертация валют</h1>
    <CurrencyConverter />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CurrencyConverter from '../components/CurrencyConverter.vue'

export default defineComponent({
  name: 'ConvertView',
  components: { CurrencyConverter }
})
</script>
