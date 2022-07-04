<template>
  <div class="card">
    <h2 class="location">{{ city }}, {{ country }}</h2>
    <div class="temperature__wrapper">
      <img
        class="temperature__image"
        :src="weatherImage"
        :alt="weatherCondition"
      />
      <div class="temperature">
        <div>
          <p class="temperature__now">{{ temperature }}</p>
          <p class="temperature_feels-like">{{ feelsLikeTemp }}</p>
        </div>
        <div>
          <p class="temperature__high">H: {{ highTemp }}</p>
          <p class="temperature__low">L: {{ lowTemp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CurrentTemperature",
  computed: {
    ...mapState({
      currentWeather: (state) => state.currentWeather,
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.isCelsius,
    }),
    city() {
      return this.currentWeather.location.name;
    },
    country() {
      return this.currentWeather.location.country;
    },
    weatherImage() {
      return this.currentWeather.current.condition.icon;
    },
    weatherCondition() {
      return this.currentWeather.current.condition.text;
    },
    temperature() {
      return this.isCelsius
        ? `${this.currentWeather.current.temp_c}°C`
        : `${this.currentWeather.current.temp_f}°F`;
    },
    feelsLikeTemp() {
      return this.isCelsius
        ? `${this.currentWeather.current.feelslike_c}°C`
        : `${this.currentWeather.current.feelslike_f}°F`;
    },
    highTemp() {
      return this.isCelsius
        ? `${this.forecast[0].day.maxtemp_c}°C`
        : `${this.forecast[0].day.maxtemp_f}°F`;
    },
    lowTemp() {
      return this.isCelsius
        ? `${this.forecast[0].day.mintemp_c}°C`
        : `${this.forecast[0].day.mintemp_f}°F`;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
</style>
