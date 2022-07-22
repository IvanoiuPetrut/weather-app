<template>
  <div class="temperature">
    <SearchBar class="temperature__search-bar"></SearchBar>
    <img
      class="temperature__image"
      :src="weatherImage"
      :alt="weatherCondition"
    />
    <div class="weather">
      <p class="temperature__current-temp">{{ temperature }}</p>
      <div class="temperature__wrapper">
        <p class="temperature__high">High: {{ highTemp }}</p>
        <hr />
        <p class="temperature__low">Low: {{ lowTemp }}</p>
      </div>
    </div>
    <p class="temperature__feels-like margin-bottom--sm">
      Feels like: {{ feelsLikeTemp }}
    </p>
    <p class="temperature__condition margin-bottom--md">
      Weather Condition: {{ weatherCondition }}
    </p>
    <hr class="margin-bottom--md hr--secondary" />
    <div class="margin-bottom--sm">
      <p class="country margin-bottom--sm">{{ country }}</p>
      <div class="region__wrapper margin-bottom--sm">
        <h2 class="heading--secondary">
          <span v-if="name !== region">{{ name }},</span> {{ region }}
        </h2>
        <PrimaryButton :onClick="addCity" :tooltip="tooltip">+</PrimaryButton>
      </div>
    </div>
    <div class="date__wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="temperature__date">{{ currentDate }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PrimaryButton from "./PrimaryButton.vue";
import SearchBar from "./SearchBar.vue";
export default {
  name: "CurrentTemperature",
  components: {
    PrimaryButton,
    SearchBar,
  },
  data() {
    return {
      tooltip: "Add city",
    };
  },
  methods: {
    addCity() {
      this.$store.commit("addCity");
    },
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  computed: {
    ...mapState({
      currentWeather: (state) => state.currentWeather,
      forecast: (state) => state.forecast,
      isCelsius: (state) => state.settings.isCelsius,
      hourIndex: (state) => state.hourIndex,
      dayIndex: (state) => state.dayIndex,
    }),
    name() {
      return this.currentWeather.location.name;
    },
    region() {
      return this.currentWeather.location.region;
    },
    country() {
      return this.currentWeather.location.country;
    },
    currentDate() {
      return this.formatDate(this.forecast[this.dayIndex].date);
    },
    weatherImage() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.icon;
    },
    weatherCondition() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.text;
    },
    temperature() {
      return this.isCelsius
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].temp_c}°C`
        : `${this.forecast[this.dayIndex].hour[this.hourIndex].temp_f}°F`;
    },
    feelsLikeTemp() {
      return this.isCelsius
        ? `${this.forecast[this.dayIndex].hour[this.hourIndex].feelslike_c}°C`
        : `${this.forecast[this.dayIndex].hour[this.hourIndex].feelslike_f}°F`;
    },
    highTemp() {
      return this.isCelsius
        ? `${this.forecast[this.dayIndex].day.maxtemp_c}°C`
        : `${this.forecast[this.dayIndex].day.maxtemp_f}°F`;
    },
    lowTemp() {
      return this.isCelsius
        ? `${this.forecast[this.dayIndex].day.mintemp_c}°C`
        : `${this.forecast[this.dayIndex].day.mintemp_f}°F`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";
.temperature {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100vh;
  background-color: colors.$primary-color;

  &__image {
    width: 80%;
    height: auto;
    align-self: center;
  }
  &__current-temp {
    font-size: 3.2rem;
    color: colors.$text-color;
  }
  &__feels-like {
    color: colors.$secondary-color;
    font-weight: 600;
  }
  &__condition {
    color: colors.$text-color;
  }

  .weather {
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    .temperature__high {
      color: colors.$secondary-color;
    }
    .temperature__low {
      color: colors.$secondary-color;
    }
  }
}
.country {
  display: inline-block;
  font-weight: bold;
  color: colors.$primary-color;
  background-color: colors.$secondary-color;
  padding: 0.1rem 0.6rem;
  border-radius: 7px;
}

.region__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .heading--secondary {
    color: colors.$text-color;
    font-size: 1.6rem;
    font-weight: 600;
  }
}

.date__wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.hr--secondary {
  border-color: colors.$secondary-color;
}

.heading--secondary {
  font-size: 1.6rem;
  font-weight: 500;
}
</style>
