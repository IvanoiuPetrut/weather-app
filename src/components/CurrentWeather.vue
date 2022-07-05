<template>
  <div class="weather">
    <WeatherQualities></WeatherQualities>
    <CurrentTemperature></CurrentTemperature>
    <MoonPhase></MoonPhase>
  </div>
</template>

<script>
import WeatherQualities from "./WeatherQualities.vue";
import CurrentTemperature from "./CurrentTemperature.vue";
import MoonPhase from "./MoonPhase.vue";

export default {
  name: "CurrentWeather",
  components: {
    WeatherQualities,
    CurrentTemperature,
    MoonPhase,
  },
};
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;
}
</style>
