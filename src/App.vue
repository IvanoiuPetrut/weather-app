<template>
  <ToggleButton
    :onClick="toggleTemperatureType"
    firstOption="C°"
    secondOption="F°"
  ></ToggleButton>
  <button @click="$store.dispatch('fetchForecast')">Refresh</button>
  <div class="days-temperature container">
    <DayTemperature
      v-for="(day, index) in $store.state.forecast"
      :key="index"
      :currentDayId="index"
    ></DayTemperature>
  </div>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";
import ToggleButton from "./components/ToggleButton.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
    ToggleButton,
  },
  methods: {
    toggleTemperatureType() {
      this.$store.commit("toggleTemperatureType");
    },
  },
  created() {
    this.$store.dispatch("fetchForecast");
  },
};
</script>

<style lang="scss">
body {
  background-image: url("https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.days-temperature {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}
</style>
