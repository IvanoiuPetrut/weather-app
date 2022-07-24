<template>
  <div class="card">
    <div>
      <p class="">Air Quality</p>
      <p>{{ airQuality }}</p>
    </div>
    <div>
      <p class="">Precipitation</p>
      <p>{{ precipitation }}</p>
    </div>
    <div>
      <p class="">Wind</p>
      <p>{{ wind }}</p>
    </div>
    <div>
      <p class="">Pressure</p>
      <p>{{ pressure }}</p>
    </div>
    <div>
      <p class="">Visibility</p>
      <p>{{ visibility }}</p>
    </div>
    <div>
      <p class="">UV Index</p>
      <p>{{ howGoodIsUvIndex }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WeatherQualities",
  data() {
    return {
      uvIndexTable: [
        {
          index: 2,
          description: "Low",
        },
        {
          index: 5,
          description: "Moderate",
        },
        {
          index: 7,
          description: "High",
        },
        {
          index: 10,
          description: "Very High",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      currentWeather: (state) => state.currentWeather,
      forecast: (state) => state.forecast,
      hourIndex: (state) => state.hourIndex,
      dayIndex: (state) => state.dayIndex,
      isKmH: (state) => state.settings.isKmH,
      isMm: (state) => state.settings.isMm,
      isMb: (state) => state.settings.isMb,
      isKm: (state) => state.settings.isKm,
    }),
    airQuality() {
      return `${Math.trunc(this.currentWeather.current.air_quality.co)} co`;
    },
    precipitation() {
      return this.isMm
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].precip_mm} mm`
        : `${this.forecast[this.dayIndex].hour[this.hourIndex].precip_in} in`;
    },
    wind() {
      return this.isKmH
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].wind_kph} km/h`
        : `${this.forecast[this.dayIndex].hour[this.hourIndex].wind_mph} mph`;
    },
    pressure() {
      return this.isMb
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].pressure_mb} mb`
        : `${this.forecast[this.dayIndex].hour[this.hourIndex].pressure_in} in`;
    },
    visibility() {
      return this.isKm
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].vis_km} km`
        : `${
            this.forecast[this.dayIndex].hour[this.hourIndex].vis_miles
          } miles`;
    },
    uvIndex() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].uv;
    },
    howGoodIsUvIndex() {
      return this.uvIndexTable.find(
        (item) =>
          item.index >= this.forecast[this.dayIndex].hour[this.hourIndex].uv
      ).description;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.2rem 1.6rem;
  border-radius: 7px;
  div {
    text-align: center;
    background-color: colors.$primary-color;
    padding: 0.5rem;
    border-radius: 7px;
  }
}
</style>
