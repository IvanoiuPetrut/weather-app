<template>
  <div class="card">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-grain"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="4.5" cy="9.5" r="1" />
        <circle cx="9.5" cy="4.5" r="1" />
        <circle cx="9.5" cy="14.5" r="1" />
        <circle cx="4.5" cy="19.5" r="1" />
        <circle cx="14.5" cy="9.5" r="1" />
        <circle cx="19.5" cy="4.5" r="1" />
        <circle cx="14.5" cy="19.5" r="1" />
        <circle cx="19.5" cy="14.5" r="1" />
      </svg>
      <p class="">Air Quality</p>
      <p>{{ airQuality }}</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-droplet"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
      </svg>
      <p class="">Precipitation</p>
      <p>{{ precipitation }}</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-wind"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
        <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
        <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
      </svg>
      <p class="">Wind</p>
      <p>{{ wind }}</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-chevrons-down"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="7 7 12 12 17 7" />
        <polyline points="7 13 12 18 17 13" />
      </svg>
      <p class="">Pressure</p>
      <p>{{ pressure }}</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-eye"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="2" />
        <path
          d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"
        />
      </svg>
      <p class="">Visibility</p>
      <p>{{ visibility }}</p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-temperature"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
        <line x1="10" y1="9" x2="14" y2="9" />
      </svg>
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
.icon {
  width: 3.6rem;
  height: 3.6rem;
  stroke: currentColor;
}
</style>
