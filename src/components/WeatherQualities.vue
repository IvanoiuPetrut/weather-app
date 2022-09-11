<template>
  <div class="card">
    <div>
      <IconWeather
        name="air-quality"
        class="icon icon--only-fill"
      ></IconWeather>
      <p class="description">Air Quality</p>
      <p class="amount">{{ airQuality }}</p>
    </div>
    <div>
      <IconWeather
        name="precipitation"
        class="icon icon--only-fill"
      ></IconWeather>
      <p class="description">Precipitation</p>
      <p class="amount">{{ precipitation }}</p>
    </div>
    <div>
      <IconWeather name="wind" class="icon icon--only-fill"></IconWeather>
      <p class="description">Wind</p>
      <p class="amount">{{ wind }}</p>
    </div>
    <div>
      <IconWeather name="pressure" class="icon icon--only-fill"></IconWeather>
      <p class="description">Pressure</p>
      <p class="amount">{{ pressure }}</p>
    </div>
    <div>
      <IconWeather name="visibility" class="icon icon--only-fill"></IconWeather>
      <p class="description">Visibility</p>
      <p class="amount">{{ visibility }}</p>
    </div>
    <div>
      <IconWeather name="uv-index" class="icon icon--only-fill"></IconWeather>
      <p class="description">UV Index</p>
      <p class="amount">{{ howGoodIsUvIndex }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IconWeather from "./IconWeather.vue";

export default {
  name: "WeatherQualities",
  components: {
    IconWeather,
  },
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  border-radius: 7px;
  margin-bottom: 1.6rem;

  @media (max-width: 1750px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 1450px) {
    grid-template-columns: repeat(2, 1fr);
    place-self: start;
    margin-bottom: 0;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }

  div {
    text-align: center;
    background-color: colors.$primary-color;
    border: 1px solid colors.$transparent-color-neutral;
    padding: 0.6rem 1rem;
    border-radius: 7px;

    @media (max-width: 1200px) {
      display: flex;
      align-items: center;
      justify-content: start;
    }
    .description {
      font-weight: lighter;
      @media (max-width: 1200px) {
        margin-right: 0.6rem;
      }
    }
    .amount {
      font-weight: bold;
    }
  }
}
.icon {
  width: 3.6rem;
  height: 3.6rem;
  stroke: currentColor;
  @media (max-width: 1200px) {
    width: 2rem;
    height: 2rem;
    margin-right: 0.6rem;
  }
}

.icon--only-fill {
  stroke: none;
  fill: currentColor;
}
</style>
