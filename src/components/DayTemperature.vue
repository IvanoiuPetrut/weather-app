<template>
  <div class="card">
    <h3 class="day"></h3>
    <img src="http://placekitten.com/100/100" alt="cat" />
    <div class="temperature">
      <p class="temperature__high">H:</p>
      <p class="temperature__low">L:</p>
    </div>
    <p class="weather">mostly sunny</p>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: "DayTemperature",
  data() {
    return {
      nextDays: this.$store.state.nextDays,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  computed: {
    highTemp() {
      return this.nextDays[0].day.maxtemp_c;
    },
    lowTemp() {
      return this.nextDays[0].day.mintemp_c;
    },
  },
  mounted() {
    this.$store.dispatch("fetchForecast");
  },
};
</script>
