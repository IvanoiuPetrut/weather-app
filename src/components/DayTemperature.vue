<template>
  <div class="card">
    <h3 class="day">{{ dayName }}</h3>
    <img class="weather-image" :src="weatherImage" :alt="weatherCondition" />
    <div class="temperature">
      <p class="temperature__high">
        H: {{ highTemp }}°{{ this.temperatureType }}
      </p>
      <p class="temperature__low">
        L: {{ lowTemp }}°{{ this.temperatureType }}
      </p>
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
      temperatureType: (state) => state.temperatureType,
    }),
    dayName() {
      return this.getDayName(this.nextDays[this.currentDayId].date, "en-US");
    },
    highTemp() {
      return this.temperatureType === "C"
        ? this.nextDays[this.currentDayId].day.maxtemp_c
        : this.nextDays[this.currentDayId].day.maxtemp_f;
    },
    lowTemp() {
      return this.temperatureType === "C"
        ? this.nextDays[this.currentDayId].day.mintemp_c
        : this.nextDays[this.currentDayId].day.mintemp_f;
    },
    weatherCondition() {
      return this.nextDays[this.currentDayId].day.condition.text;
    },
    weatherImage() {
      return this.nextDays[this.currentDayId].day.condition.icon;
    },
  },
  mounted() {
    console.log(this.temperatureType);
  },
};
</script>

<style lang="scss" scoped>
@mixin card($theme: DarkGray) {
  background-color: $theme;
  padding: 1rem;
  border-radius: 0.5rem;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  @include flex-column();
  @include card($theme: DarkGray);
}

.weather-image {
  margin-bottom: 0.6rem;
}

.temperature {
  display: flex;
  gap: 1.6rem;

  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.weather {
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}
</style>
