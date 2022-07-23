<template>
  <ul class="hours">
    <li
      v-for="(hour, index) in hours"
      :key="index"
      @click="
        deactivateAllHours();
        activateHour(index);
      "
      :class="{ active: isActiveHour[index] }"
    >
      {{ temperature(hour) }}
      <Hours :hours="hours" :hourIndex="index"></Hours>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Hours from "./Hours.vue";

export default {
  name: "HourlyWeather",
  components: {
    Hours,
  },
  data() {
    return {
      hours: [],
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
      this.isActiveHour[index] = !this.isActiveHour[index];
      this.setHourIndex(this.hours[index]);
    },
    deactivateAllHours() {
      this.isActiveHour = this.isActiveHour.map(() => false);
    },
    getCurrentHour() {
      let date = new Date();
      let hour = date.getHours();
      return hour;
    },
    getNextHours(amount) {
      let currentHour = this.getCurrentHour();
      for (let i = 0; i < amount; i++) {
        let hour = currentHour + i;
        hour > 23 ? (hour = hour - 24) : hour;
        this.hours.push(hour);
        i === 0 ? this.isActiveHour.push(true) : this.isActiveHour.push(false);
      }
    },
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.settings.isCelsius,
      hourIndex: (state) => state.hourIndex,
      dayIndex: (state) => state.dayIndex,
    }),
  },
  created() {
    this.getNextHours(8);
    this.setHourIndex(this.hours[0]);
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
  li {
    justify-self: center;
    padding: 0.2rem 0.4rem;
    border-radius: 7px;
    &:hover {
      color: #339af0;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
}
.active {
  color: #339af0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
