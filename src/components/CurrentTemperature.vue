<template>
  <div class="card">
    <h2 class="heading--secondary">{{ city }}, {{ country }}</h2>
    <div class="temperature__wrapper">
      <img
        class="temperature__image"
        :src="weatherImage"
        :alt="weatherCondition"
      />
      <div class="temperature">
        <div>
          <p class="temperature__now">{{ temperature }}</p>
          <span class="temperature_feels-like"
            >Feels like:
            <p>{{ feelsLikeTemp }}</p></span
          >
        </div>
        <div>
          <p class="temperature__high margin-bottom--sm">H: {{ highTemp }}</p>
          <p class="temperature__low">L: {{ lowTemp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CurrentTemperature",
  computed: {
    ...mapState({
      currentWeather: (state) => state.currentWeather,
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.isCelsius,
    }),
    city() {
      return this.currentWeather.location.name;
    },
    country() {
      return this.currentWeather.location.country;
    },
    weatherImage() {
      return this.currentWeather.current.condition.icon;
    },
    weatherCondition() {
      return this.currentWeather.current.condition.text;
    },
    temperature() {
      return this.isCelsius
        ? `${this.currentWeather.current.temp_c}°C`
        : `${this.currentWeather.current.temp_f}°F`;
    },
    feelsLikeTemp() {
      return this.isCelsius
        ? `${this.currentWeather.current.feelslike_c}°C`
        : `${this.currentWeather.current.feelslike_f}°F`;
    },
    highTemp() {
      return this.isCelsius
        ? `${this.forecast[0].day.maxtemp_c}°C`
        : `${this.forecast[0].day.maxtemp_f}°F`;
    },
    lowTemp() {
      return this.isCelsius
        ? `${this.forecast[0].day.mintemp_c}°C`
        : `${this.forecast[0].day.mintemp_f}°F`;
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

@mixin flex-row {
  display: flex;
  flex-direction: row;
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
  // width: 12rem;
  @include flex-column();
  @include card(none);
}
.temperature__wrapper {
  @include flex-row();
}
.temperature__image {
  width: 10rem;
  height: auto;
}

.temperature {
  @include flex-row();
  gap: 2.8rem;
}

.temperature__now {
  display: block;
  font-size: 3.2rem;
  font-weight: bold;
  text-align: center;
}

.temperature_feels-like {
  display: block;
  font-size: 1.2rem;
  text-align: center;
}
</style>
