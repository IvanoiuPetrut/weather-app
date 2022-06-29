<template>
  <button @click="$store.dispatch('fetchForecast')">Refresh</button>
  <div class="days-temperature">
    <DayTemperature
      v-for="(day, index) in $store.state.nextDays"
      :key="index"
    ></DayTemperature>
  </div>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
  },
  created() {
    this.$store.dispatch("fetchForecast");
    console.log(this.nextDays);
  },
};
</script>

<style lang="scss">
.days-temperature {
  display: flex;
  gap: 0.4rem;
}
</style>
