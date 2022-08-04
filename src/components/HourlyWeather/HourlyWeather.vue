<template>
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
</template>

<script>
import { mapActions, mapState } from "vuex";
import Hours from "./Hours.vue";
import WeatherImg from "./WeatherImg.vue";

export default {
  name: "HourlyWeather",
  components: {
    Hours,
    WeatherImg,
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
    console.log("HEEEEELLLOW");
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/colors.scss";
.hourly-weather {
  width: 65vw;
  display: flex;
  overflow-x: scroll;
  gap: 1.2rem;
  align-self: center;
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
  // color: colors.$accent-color;
  border: 1px solid red;
  .hourly-weather {
    &__temperature {
      color: colors.$accent-color;
    }
  }
}
</style>
