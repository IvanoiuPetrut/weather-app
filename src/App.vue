<template>
  <button @click="$store.dispatch('fetchForecast')">Refresh</button>
  <DayTemperature></DayTemperature>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
  },
  mounted() {
    this.$store.dispatch("fetchForecast");
  },
};
</script>

<style lang="scss"></style>
