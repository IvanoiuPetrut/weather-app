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

@mixin glass-morph {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(34, 34, 35, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

h3 {
  font-size: 1.4rem;
  font-weight: bold;
  // shadow
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.card {
  color: #f1f3f5;
  @include flex-column();
  @include card();
  @include glass-morph();
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
