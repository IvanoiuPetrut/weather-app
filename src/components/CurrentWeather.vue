<template>
  <div class="weather" v-if="this.$store.state.currentWeather">
    <CurrentTemperature></CurrentTemperature>
    <div class="weather__widgets">
      <div class="weather__hourly">
        <p class="weather__title">Hourly Weather</p>
        <HourlyWeather></HourlyWeather>
      </div>
      <div class="weather__qualities">
        <p class="weather__title">Weather Highlights</p>
        <div class="grid">
          <div class="flex">
            <div class="weather__forecast">
              <DayTemperature
                v-for="(day, index) in $store.state.forecast"
                :key="index"
                :currentDayId="index"
                :dayIndex="this.dayIndex"
              ></DayTemperature>
            </div>
            <WeatherQualities class="weather__highlights"></WeatherQualities>
          </div>
          <MoonPhase class="weather__moon-phase"></MoonPhase>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WeatherQualities from "./WeatherQualities.vue";
import CurrentTemperature from "./CurrentTemperature.vue";
import MoonPhase from "./MoonPhase.vue";
import HourlyWeather from "./HourlyWeather/HourlyWeather.vue";
import DayTemperature from "./DayTemperature.vue";

export default {
  name: "CurrentWeather",
  components: {
    WeatherQualities,
    CurrentTemperature,
    MoonPhase,
    HourlyWeather,
    DayTemperature,
  },
  computed: {
    ...mapState({
      dayIndex: (state) => state.dayIndex,
    }),
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";
.weather {
  display: grid;
  grid-template-columns: 1fr 3fr;
  &__widgets {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    height: 100vh;
    overflow-y: auto;
    padding: 3.2rem 4.8rem;
    background-color: colors.$secondary-color;
  }
  &__title {
    display: inline-block;
    font-size: 1.6rem;
    padding: 0.2rem 0.8rem;
    border-radius: 7px;
    font-weight: bold;
    background-color: colors.$primary-color;
    margin-bottom: 1.6rem;
  }
  &__qualities {
    .flex {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }
    .grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3.2rem;
    }
  }
  &__forecast {
    display: flex;
    gap: 1.6rem;
    place-self: center;
  }
  &__highlights {
    place-self: center;
  }
  &__moon-phase {
    justify-self: center;
    align-self: start;
  }
}
</style>
