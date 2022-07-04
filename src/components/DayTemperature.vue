<template>
  <div class="card">
    <h3 class="day heading--tertiary margin-bottom--sm">{{ dayName }}</h3>
    <img
      class="weather-image margin-bottom--md"
      :src="weatherImage"
      :alt="weatherCondition"
    />
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
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.isCelsius,
    }),
    dayName() {
      return this.getDayName(this.forecast[this.currentDayId].date, "en-US");
    },
    highTemp() {
      return this.isCelsius
        ? `${this.forecast[this.currentDayId].day.maxtemp_c}°C`
        : `${this.forecast[this.currentDayId].day.maxtemp_f}°F`;
    },
    lowTemp() {
      return this.isCelsius
        ? `${this.forecast[this.currentDayId].day.mintemp_c}°C`
        : `${this.forecast[this.currentDayId].day.mintemp_f}°F`;
    },
    weatherCondition() {
      return this.forecast[this.currentDayId].day.condition.text;
    },
    weatherImage() {
      return this.forecast[this.currentDayId].day.condition.icon;
    },
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

.card {
  color: #f1f3f5;
  @include flex-column();
  @include card();
  @include glass-morph();
}

.heading--tertiary {
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}

> .temperature {
  display: flex;
  gap: 1.6rem;

  letter-spacing: 0.5px;
}

.weather {
  color: #e9ecef;
  font-size: 1rem;
  letter-spacing: 0.5px;
}
</style>
