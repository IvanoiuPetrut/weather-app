<template>
  <SelectLocation></SelectLocation>
  <div v-if="this.city.length > 0">
    <CurrentWeather class="current-weather"></CurrentWeather>
  </div>
  <div v-else>
    <!-- <SelectLocation></SelectLocation> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { geoLocation } from "./helpers/geoLocation";
import CurrentWeather from "./components/CurrentWeather.vue";
import SelectLocation from "./components/SelectLocation.vue";

export default {
  name: "App",
  components: {
    CurrentWeather,
    SelectLocation,
  },
  mixins: [geoLocation],
  methods: {
    getCurrentDate() {
      return new Date().toISOString().slice(0, 10);
    },
  },
  computed: {
    ...mapState({
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

<style lang="scss"></style>
