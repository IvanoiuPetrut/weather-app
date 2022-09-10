<template>
  <div class="weather" v-if="this.$store.state.currentWeather">
    <CurrentTemperature class="weather__current"></CurrentTemperature>
    <div class="weather__main-panel">
      <PrimaryNavigation class="nav"></PrimaryNavigation>
      <main class="weather__widgets">
        <div class="weather__hourly">
          <p class="weather__title">Hourly Weather</p>
          <HourlyWeather class="hourly__wrapper"></HourlyWeather>
        </div>
        <div class="weather__qualities">
          <p class="weather__title margin-bottom--bg">Weather Highlights</p>
          <div class="grid">
            <div class="weather__forecast">
              <DayTemperature
                v-for="(day, index) in $store.state.forecast"
                :key="index"
                :currentDayId="index"
                :dayIndex="this.dayIndex"
                class="weather__day"
              ></DayTemperature>
            </div>
            <WeatherQualities class="weather__highlights"></WeatherQualities>
            <MoonPhase class="weather__moon-phase"></MoonPhase>
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

.weather__main-panel {
  width: 100%;
  overflow-x: scroll;
}
.nav {
  position: sticky;
  top: 0;
  z-index: 1;
}
.weather {
  display: grid;
  grid-template-columns: 1fr 3fr;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }

  &__current {
    position: sticky;
    top: 0;
    z-index: 1;
    border-right: 1px solid colors.$transparent-color-neutral;

    @media (max-width: 1050px) {
      position: static;
      border-right: none;
    }
  }

  &__widgets {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    overflow-y: auto;
    padding: 3.2rem 4.8rem;
    background-color: colors.$secondary-color;
    @media (max-width: 1450px) {
      padding: 3.2rem 2.4rem;
    }

    @media (max-width: 600px) {
      padding: 2.4rem 1.2rem;
    }
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
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.6rem;
      @media (max-width: 1750px) {
        grid-template-columns: 1fr;
      }
      @media (max-width: 1450px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 1100px) {
        grid-template-columns: 1fr !important;
      }
    }
  }
  &__forecast {
    display: flex;
    gap: 1.6rem;

    @media (max-width: 1750px) {
      justify-content: center;
    }
    @media (max-width: 1450px) {
      flex-direction: column;
      gap: 3.2rem;
    }
    @media (max-width: 1100px) {
      place-self: center;
    }
  }

  &__day {
    align-self: flex-start;
  }

  &__highlights {
    justify-self: center;
    grid-row: span 2;
    @media (max-width: 1750px) {
      grid-row: span 1;
    }
  }

  &__moon-phase {
    align-self: flex-start;
    margin-top: 0;
    @media (max-width: 1450px) {
      grid-column: span 2;
      margin-top: 1.6rem;
    }
    @media (max-width: 1100px) {
      grid-column: 1;
    }
  }
}

.margin-bottom--bg {
  margin-bottom: 3.2rem;
}
</style>
