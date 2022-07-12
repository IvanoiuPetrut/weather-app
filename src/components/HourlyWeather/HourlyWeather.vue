<template>
  <ul class="hours">
    <li v-for="(hour, index) in hours" :key="index">{{ temperature(hour) }}</li>
  </ul>
  <Hours :hours="hours"></Hours>
</template>

<script>
import Hours from "./Hours.vue";
import { mapState } from "vuex";

export default {
  name: "HourlyWeather",
  components: {
    Hours,
  },
  data() {
    return {
      hours: [],
      currentDayId: 0,
    };
  },
  methods: {
    temperature(hour) {
      return this.isCelsius
        ? `${this.forecast[this.currentDayId].hour[hour].temp_c}°C`
        : `${this.forecast[this.currentDayId].hour[hour].temp_f}°F`;
    },
    getCurrentHour() {
      let date = new Date();
      let hour = date.getHours();
      return hour;
    },
    getNextHours(amount) {
      let currentHour = this.getCurrentHour();
      for (var i = 0; i < amount; i++) {
        let hour = currentHour + i;
        if (hour > 23) {
          hour = hour - 24;
        }
        this.hours.push(hour);
      }
    },
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.settings.isCelsius,
    }),
  },
  created() {
    this.getNextHours(8);
  },
};
</script>

<style lang="scss" scoped>
.hours {
  color: #fff;
  display: grid;
  grid-template-columns: repeat(8, 3.2rem);
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
</style>
