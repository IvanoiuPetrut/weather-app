<template>
  <nav>
    <SearchBar></SearchBar>
    <Meniu></Meniu>
  </nav>
  <PrimaryButton :onClick="addCity">Add city</PrimaryButton>
  <CurrentWeather class="current-weather"></CurrentWeather>
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
import CurrentWeather from "./components/CurrentWeather.vue";
import Meniu from "./components/Meniu.vue";
import SearchBar from "./components/SearchBar.vue";
import PrimaryButton from "./components/PrimaryButton.vue";

export default {
  name: "App",
  components: {
    DayTemperature,
    CurrentWeather,
    Meniu,
    SearchBar,
    PrimaryButton,
  },
  methods: {
    getCurrentDate() {
      return new Date().toISOString().slice(0, 10);
    },
    addCity() {
      this.$store.commit("addCity");
    },
  },
  beforeCreate() {
    this.$store.dispatch("settings/initialiseSettings");
    this.$store.commit("initialiseStore");
  },
  created() {
    this.$store.commit("setCurrentDate");
    this.$store.dispatch("fetchWeather");
    this.$store.subscribe((mutation, state) => {
      let settings = {
        isCelsius: state.settings.isCelsius,
        isKmH: state.settings.isKmH,
        isMm: state.settings.isMm,
        isMb: state.settings.isMb,
        isKm: state.settings.isKm,
      };
      let location = {
        city: state.city,
      };
      let cities = {
        cities: state.cities,
      };

      localStorage.setItem("location", JSON.stringify(location));
      localStorage.setItem("settings", JSON.stringify(settings));
      localStorage.setItem("cities", JSON.stringify(cities));
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

.current-weather {
  margin-top: 4.8rem;
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
