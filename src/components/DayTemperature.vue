<template>
  <div class="card">
    <h3 class="day"></h3>
    <img class="weather-image" :src="weatherImage" :alt="weatherCondition" />
    <div class="temperature">
      <p class="temperature__high">H: {{ highTemp }}</p>
      <p class="temperature__low">L: {{ lowTemp }}</p>
    </div>
    <p class="weather">{{ weatherCondition }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DayTemperature",
  methods: {
    test() {
      console.log(this.nextDays);
      console.log(this.weatherImage);
    },
  },
  computed: {
    ...mapState({
      nextDays: (state) => state.nextDays,
    }),
    highTemp() {
      return this.nextDays[0].day.maxtemp_c;
    },
    lowTemp() {
      return this.nextDays[0].day.mintemp_c;
    },
    weatherCondition() {
      return this.nextDays[0].day.condition.text;
    },
    weatherImage() {
      return this.nextDays[0].day.condition.icon;
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
  gap: 0.4rem;
}
</style>
