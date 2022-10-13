<template>
  <div class="hourly-weather__wrapper">
    <button
      @click="scrollToBeginning()"
      class="btn"
      type="button"
      aria-label="Scroll weather hours to right"
    >
      <IconWeather name="arrow-left" class="icon"></IconWeather>
    </button>
    <ul class="hourly-weather">
      <li
        v-for="(hour, index) in hours"
        :key="index"
        @click="
          deactivateAllHours();
          activateHour(index);
          scrollToHour(index);
        "
        :class="[activeHour[index] ? 'active' : '', `hour--${index}`]"
      >
        <p class="hourly-weather__temperature">{{ temperature(hour) }}</p>
        <WeatherImg
          :hourIndex="hours[index]"
          class="hourly-weather__img"
        ></WeatherImg>
        <Hours
          :hours="hours"
          :hourIndex="index"
          class="hourly-weather__hour"
        ></Hours>
      </li>
    </ul>
    <button
      @click="scrollToEnd()"
      class="btn"
      type="button"
      aria-label="Scroll weather hours to left"
    >
      <IconWeather name="arrow-right" class="icon"></IconWeather>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Hours from "./Hours.vue";
import WeatherImg from "./WeatherImg.vue";
import IconWeather from "../IconWeather.vue";

export default {
  name: "HourlyWeather",
  components: {
    Hours,
    WeatherImg,
    IconWeather,
  },
  data() {
    return {
      isActiveHour: [],
      currentDayId: 0,
    };
  },
  methods: {
    ...mapActions(["setHourIndex"]),
    temperature(hour) {
      return this.isCelsius
        ? `${this.forecast[this.dayIndex].hour[hour].temp_c}°C`
        : `${this.forecast[this.dayIndex].hour[hour].temp_f}°F`;
    },
    activateHour(index) {
      this.setHourIndex(this.hours[index]);
      this.$store.commit("setActiveHour", index);
    },
    deactivateAllHours() {
      this.$store.commit("deactivateAllHours");
    },
    scrollToHour(index) {
      const hour = document.querySelector(`.hour--${index}`);
      hour.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    },
    scrollToBeginning() {
      const hour = document.querySelector(".hour--0");
      hour.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    },
    scrollToEnd() {
      const hour = document.querySelector(".hour--23");
      hour.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    },
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.settings.isCelsius,
      hourIndex: (state) => state.hourIndex,
      dayIndex: (state) => state.dayIndex,
      hours: (state) => state.hours,
      activeHour: (state) => state.activeHour,
    }),
    weatherImage() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.icon;
    },
    weatherCondition() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.text;
    },
  },
  created() {
    this.$store.commit("setActiveHour", this.hourIndex);
  },
  mounted() {
    this.scrollToHour(this.hourIndex);
  },
  updated() {
    this.scrollToHour(this.hourIndex);
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/colors.scss";

::-webkit-scrollbar {
  height: 0.6rem;
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track {
  background-color: colors.$primary-color;
  border-radius: 100px;
  box-shadow: inset 1px 1px 10px 5px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background-color: colors.$secondary-color;
  border: 1px solid colors.$transparent-color-neutral;
  border-radius: 100px;
}

::-webkit-scrollbar-thumb:hover {
  border-color: colors.$accent-color;
}
.hourly-weather__wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  max-width: 100%;
}
.hourly-weather {
  display: flex;
  padding: 0 0 1rem 0;
  gap: 1.2rem;
  align-self: center;
  overflow-x: scroll;
  font-size: 1.4rem;
  &__temperature {
    font-size: 1.1rem;
    font-weight: bold;
  }
  &__hour {
    font-size: 1rem;
  }
  &__img {
    width: 2.4rem;
    height: 2.4rem;
  }
  li {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: center;
    background-color: colors.$primary-color;
    padding: 0.6rem 0.8rem;
    border-radius: 13px;
    border: 1px solid colors.$transparent-color-neutral;
    &:hover {
      color: colors.$accent-color;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
}
.active {
  .hourly-weather {
    &__temperature {
      color: colors.$accent-color;
    }
    &__hour {
      color: colors.$accent-color;
    }
  }
}

.active.active {
  border-color: colors.$accent-color;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px solid colors.$transparent-color-neutral;
  color: colors.$text-color;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: colors.$accent-color;
    background-color: colors.$transparent-primary-color;
    border-color: colors.$accent-color;
  }
}
</style>
