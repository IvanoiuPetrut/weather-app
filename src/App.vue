<template>
  <button @click="$store.dispatch('fetchForecast')">Refresh</button>
  <div class="days-temperature container">
    <DayTemperature
      v-for="(day, index) in $store.state.nextDays"
      :key="index"
      :currentDayId="index"
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
  },
};
</script>

<style lang="scss">
$font-stack: "Open Sans", sans-serif;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 1.2rem;
  font-family: $font-stack;
  color: #333;
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.days-temperature {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}
</style>
