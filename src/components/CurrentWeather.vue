<template>
  <div class="weather" v-if="this.$store.state.currentWeather">
    <div class="weather__row">
      <WeatherQualities></WeatherQualities>
      <CurrentTemperature></CurrentTemperature>
      <MoonPhase></MoonPhase>
    </div>
    <HourlyWeather></HourlyWeather>
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
.weather {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
  }
}
</style>
