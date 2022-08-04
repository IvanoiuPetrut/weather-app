<template>
  <div class="weather" v-if="this.$store.state.currentWeather">
    <CurrentTemperature class="weather__current"></CurrentTemperature>
    <div>
      <PrimaryNavigation class="nav"></PrimaryNavigation>
      <main class="weather__widgets">
        <div class="weather__hourly">
          <p class="weather__title">Hourly Weather</p>
          <HourlyWeather class="hourly__wrapper"></HourlyWeather>
        </div>
        <div class="weather__qualities">
          <p class="weather__title margin-bottom--bg">Weather Highlights</p>
          <div class="grid">
            <div class="flex--column">
              <div class="weather__forecast">
                <DayTemperature
                  v-for="(day, index) in $store.state.forecast"
                  :key="index"
                  :currentDayId="index"
                  :dayIndex="this.dayIndex"
                  class="weather__day"
                ></DayTemperature>
              </div>
              <MoonPhase class="weather__moon-phase"></MoonPhase>
            </div>
            <WeatherQualities class="weather__highlights"></WeatherQualities>
          </div>
        </div>
      </main>
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
import PrimaryNavigation from "./PrimaryNavigation.vue";

export default {
  name: "CurrentWeather",
  components: {
    WeatherQualities,
    CurrentTemperature,
    MoonPhase,
    HourlyWeather,
    DayTemperature,
    PrimaryNavigation,
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

.nav {
  position: sticky;
  top: 0;
  z-index: 1;
}
.weather {
  display: grid;
  grid-template-columns: 1fr 3fr;
  &__current {
    position: sticky;
    top: 0;
    z-index: 1;
    border-right: 1px solid colors.$transparent-color-neutral;
  }
  &__widgets {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
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
    letter-spacing: 0.8px;
    margin-bottom: 1.6rem;
    position: relative;
  }

  &__qualities {
    .flex--column {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.6rem;
    }
  }
  &__forecast {
    display: flex;
    gap: 1.6rem;
  }
  &__day {
    align-self: flex-start;
  }
  &__highlights {
    align-self: end;
    justify-self: center;
  }
  &__moon-phase {
    align-self: flex-start;
  }
}

.margin-bottom--bg {
  margin-bottom: 3.2rem;
}
</style>
