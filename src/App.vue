<template>
  <DayTemperature></DayTemperature>
  <button @click="$store.dispatch('fetchForecast')">Refresh</button>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
  },
};
</script>

<style lang="scss"></style>
