<template>
  <div class="weather" v-if="this.$store.state.currentWeather">
    <CurrentTemperature></CurrentTemperature>
    <div class="weather__widgets">
      <HourlyWeather></HourlyWeather>
      <WeatherQualities></WeatherQualities>
      <MoonPhase></MoonPhase>
    </div>
  </div>
</template>

<script>
import WeatherQualities from "./WeatherQualities.vue";
import CurrentTemperature from "./CurrentTemperature.vue";
import MoonPhase from "./MoonPhase.vue";
import HourlyWeather from "./HourlyWeather/HourlyWeather.vue";

export default {
  name: "CurrentWeather",
  components: {
    WeatherQualities,
    CurrentTemperature,
    MoonPhase,
    HourlyWeather,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";
.weather {
  display: grid;
  grid-template-columns: 1fr 3fr;
  &__widgets {
    background-color: colors.$secondary-color;
    padding: 3.2rem 4.8rem;
  }
}
</style>
