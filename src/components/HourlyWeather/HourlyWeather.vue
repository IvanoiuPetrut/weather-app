<template>
  <ul class="hours">
    <li
      v-for="(hour, index) in hours"
      :key="index"
      @click="
        deactivateAllHours();
        activateHour(index);
      "
      :class="{ active: activeHour[index] }"
    >
      <p class="hours__temperature">{{ temperature(hour) }}</p>
      <WeatherImg :hourIndex="hours[index]"></WeatherImg>
      <Hours :hours="hours" :hourIndex="index"></Hours>
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
      // console.log(this.hourIndex);
    },
    deactivateAllHours() {
      this.$store.commit("deactivateAllHours");
    },
    getCurrentHour() {
      let date = new Date();
      let hour = date.getHours();
      return hour;
    },
    getNextHours(amount) {
      for (let i = 0; i < amount; i++) {
        let hour = this.hourIndex + i;
        console.log(hour);
        hour > 23 ? (hour = hour - 24) : hour;
        this.hours.push(hour);
        i === 0 ? this.isActiveHour.push(true) : this.isActiveHour.push(false);
      }
    },
    findActiveHour(hours, hourIndex) {
      for (let i = 0; i < hours.length; i++) {
        i === hourIndex
          ? this.isActiveHour.push(true)
          : this.isActiveHour.push(false);
      }
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
};
</script>

<style lang="scss" scoped>
@use "../../assets/style/colors.scss";
.hours {
  font-size: 1.4rem;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.2rem;
  &__temperature {
    font-size: 1.6rem;
    font-weight: bold;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: colors.$primary-color;
    padding: 0.6rem 1.2rem;
    border-radius: 7px;
    &:hover {
      color: colors.$accent-color;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
}
.active {
  color: colors.$accent-color;
}
</style>
