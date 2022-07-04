<template>
  <ToggleButton
    :onClick="toggleTemperatureType"
    :isOptionActive="this.$store.state.isCelsius"
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
  <MoonPhase></MoonPhase>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";
import MoonPhase from "./components/MoonPhase.vue";
import ToggleButton from "./components/ToggleButton.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
    ToggleButton,
    MoonPhase,
  },
  methods: {
    toggleTemperatureType() {
      this.$store.commit("toggleTemperatureType");
    },
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  created() {
    this.$store.dispatch("fetchForecast");
    this.$store.subscribe((mutation, state) => {
      let store = {
        isCelsius: state.isCelsius,
        isKmH: state.isKmH,
        isMm: state.isMmm,
        isMb: state.isMb,
      };

      localStorage.setItem("store", JSON.stringify(store));
    });
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
