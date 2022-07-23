<template>
  <div
    class="card"
    @click="activateDay"
    :class="{ active: currentDayId === dayIndex }"
  >
    <h3 class="heading--tertiary margin-bottom--sm">{{ dayName }}</h3>
    <div class="weather margin-bottom--sm">
      <img class="weather__image" :src="weatherImage" :alt="weatherCondition" />
      <div class="weather__temperature">
        <p class="temperature__high">{{ highTemp }}</p>
        <p class="temperature__low">{{ lowTemp }}</p>
      </div>
    </div>
    <p class="weather">{{ weatherCondition }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DayTemperature",
  props: {
    currentDayId: {
      type: Number,
      required: true,
    },
    dayIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["setDayIndex"]),
    activateDay() {
      this.setDayIndex(this.currentDayId);
    },
    getDayName(dateStr, locale) {
      var date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: "long" });
    },
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.settings.isCelsius,
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
@use "../assets/style/colors.scss";

@mixin flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  @include flex-column();
  color: #f1f3f5;
  width: 12rem;
  padding: 0.8rem 0.4rem;
  border-radius: 7px;
  background-color: colors.$primary-color;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}

.active {
  .heading--tertiary {
    color: colors.$accent-color;
  }
  transform: scale(1);
}

.heading--tertiary {
  font-size: 1.4rem;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}

.weather {
  display: flex;
  gap: 0.8rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
}
</style>
