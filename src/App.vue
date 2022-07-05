<template>
  <nav>
    <Meniu></Meniu>
    <Settings></Settings>
  </nav>
  <ToggleButton
    :onClick="toggleTemperatureType"
    :isOptionOneActive="this.$store.state.isCelsius"
    firstOption="C°"
    secondOption="F°"
  ></ToggleButton>
  <CurrentWeather></CurrentWeather>
  <div class="forecast container">
    <h2 class="heading--tertiary">3-day forecast</h2>
    <div class="days-temperature">
      <DayTemperature
        v-for="(day, index) in $store.state.forecast"
        :key="index"
        :currentDayId="index"
      ></DayTemperature>
    </div>
  </div>
</template>

<script>
import DayTemperature from "./components/DayTemperature.vue";
import ToggleButton from "./components/ToggleButton.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import Meniu from "./components/Meniu.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
    ToggleButton,
    CurrentWeather,
    Meniu,
    Settings,
  },
  methods: {
    toggleTemperatureType() {
      this.$store.commit("toggleTemperatureType");
    },
    getCurrentDate() {
      return new Date().toISOString().slice(0, 10);
    },
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  created() {
    this.$store.commit("setCurrentDate");
    this.$store.dispatch("fetchForecast");
    console.log(this.$store.state.currentWeather);
    this.$store.subscribe((mutation, state) => {
      let settings = {
        isCelsius: state.isCelsius,
        isKmH: state.isKmH,
        isMm: state.isMm,
        isMb: state.isMb,
        isKm: state.isKm,
      };

      localStorage.setItem("settings", JSON.stringify(settings));
    });
  },
};
</script>

<style lang="scss">
body {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.3)
    ),
    url("https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.forecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.days-temperature {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.current-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;
}
</style>
