<template>
  <nav>
    <SearchBar></SearchBar>
    <Meniu></Meniu>
  </nav>
  <div v-if="this.city.length > 0">
    <PrimaryButton :onClick="addCity">Add city</PrimaryButton>
    <CurrentWeather class="current-weather"></CurrentWeather>
    <div class="forecast container">
      <h2 class="heading--tertiary">3-day forecast</h2>
      <div class="days-temperature">
        <DayTemperature
          v-for="(day, index) in $store.state.forecast"
          :key="index"
          :currentDayId="index"
          :dayIndex="this.dayIndex"
        ></DayTemperature>
      </div>
    </div>
  </div>
  <div v-else>
    <h2 class="heading--tertiary">Please enter a city</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { geoLocation } from "./helpers/geoLocation";
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
  mixins: [geoLocation],
  methods: {
    getCurrentDate() {
      return new Date().toISOString().slice(0, 10);
    },
    addCity() {
      this.$store.commit("addCity");
    },
  },
  computed: {
    ...mapState({
      dayIndex: (state) => state.dayIndex,
      city: (state) => state.city,
    }),
  },
  beforeCreate() {
    this.$store.dispatch("settings/initialiseSettings");
    this.$store.commit("initialiseStore");
  },
  created() {
    this.$store.commit("setCurrentDate");
    if (this.$store.state.city.length > 0) {
      this.$store.dispatch("fetchWeather");
    }
    this.$store.subscribe((mutation, state) => {
      let settings = {
        isCelsius: state.settings.isCelsius,
        isKmH: state.settings.isKmH,
        isMm: state.settings.isMm,
        isMb: state.settings.isMb,
        isKm: state.settings.isKm,
      };

      let favoriteCities = {
        favoriteCities: state.favoriteCities,
      };

      localStorage.setItem("settings", JSON.stringify(settings));
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    });
  },
};
</script>

<style lang="scss">
@mixin glass-morph {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(34, 34, 35, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

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
  @include glass-morph();
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
