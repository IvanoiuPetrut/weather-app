<template>
  <div class="card">
    <div>
      <p class="margin-bottom--sm">Air Quality</p>
      <p>{{ airQuality }}</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Precipitation</p>
      <p>{{ precipitation }}</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Wind</p>
      <p>{{ wind }}</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Pressure</p>
      <p>{{ pressure }}</p>
    </div>
    <div>
      <p class="margin-bottom--sm">Visibility</p>
      <p>{{ visibility }}</p>
    </div>
    <div>
      <p class="margin-bottom--sm">UV Index</p>
      <p>{{ uvIndex }}</p>
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
        ? `${this.currentWeather.current.precip_mm} mm`
        : `${this.currentWeather.current.precip_in} in`;
    },
    wind() {
      return this.isKmH
        ? `${this.currentWeather.current.wind_kph} km/h`
        : `${this.currentWeather.current.wind_mph} mph`;
    },
    pressure() {
      return this.isMb
        ? `${this.currentWeather.current.pressure_mb} mb`
        : `${this.currentWeather.current.pressure_in} in`;
    },
    visibility() {
      return this.isKm
        ? `${this.currentWeather.current.vis_km} km`
        : `${this.currentWeather.current.vis_miles} miles`;
    },
    uvIndex() {
      return this.currentWeather.current.uv;
    },
    howGoodIsUvIndex() {
      return this.uvIndexTable.find(
        (item) => item.index >= this.currentWeather.current.uv
      ).description;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.6rem;
  row-gap: 1rem;
  color: #f1f3f5;
  div {
    @include flex-column();
    @include card();
    @include glass-morph();
  }
}
</style>
