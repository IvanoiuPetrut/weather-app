<template>
  <div class="card">
    <h3 class="day">{{ dayName }}</h3>
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
  props: {
    currentDayId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getDayName(dateStr, locale) {
      var date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: "long" });
    },
  },
  computed: {
    ...mapState({
      nextDays: (state) => state.nextDays,
    }),
    dayName() {
      return this.getDayName(this.nextDays[this.currentDayId].date, "en-US");
    },
    highTemp() {
      return this.nextDays[this.currentDayId].day.maxtemp_c;
    },
    lowTemp() {
      return this.nextDays[this.currentDayId].day.mintemp_c;
    },
    weatherCondition() {
      return this.nextDays[this.currentDayId].day.condition.text;
    },
    weatherImage() {
      return this.nextDays[this.currentDayId].day.condition.icon;
    },
  },
};
</script>

<style scoped>
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
