<template>
  <div class="card">
    <h3 class="day"></h3>
    <img src="http://placekitten.com/100/100" alt="cat" />
    <div class="temperature">
      <p class="temperature__high">H: {{ highTemp }}</p>
      <p class="temperature__low">L:</p>
    </div>
    <p class="weather">mostly sunny</p>
  </div>
</template>

<script>
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
      // return this.nextDays[0].day.maxtemp_c;
      // return this.$store.nextDays[0].day.maxtemp_c;
      return "2";
    },
    lowTemp() {
      // return this.nextDays[0].day.mintemp_c;
      return "0";
    },
  },
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  width: 8.4rem;
  padding: 1rem;
  background-color: aqua;
  border-radius: 11px;
}

.temperature {
  display: flex;
  gap: 1.6rem;
}
</style>
