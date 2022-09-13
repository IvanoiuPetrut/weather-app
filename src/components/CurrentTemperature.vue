<template>
  <div class="temperature">
    <SearchBar class="temperature__search-bar"></SearchBar>
    <div class="weather">
      <!-- <img
        class="temperature__image"
        :src="weatherImage"
        :alt="weatherCondition"
      /> -->
      <p class="temperature__current-temp">{{ temperature }}</p>
      <div class="temperature__wrapper">
        <p class="temperature__high">High: {{ highTemp }}</p>
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
    <div class="time">
      <div class="date__wrapper">
        <IconWeather name="calendar" class="icon"></IconWeather>
        <p class="temperature__date">{{ currentDate }}</p>
      </div>
      <div class="date__wrapper">
        <IconWeather name="clock" class="icon"></IconWeather>
        <p class="temperature__date">{{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PrimaryButton from "./PrimaryButton.vue";
import SearchBar from "./SearchBar.vue";
import IconWeather from "./IconWeather.vue";
export default {
  name: "CurrentTemperature",
  components: {
    PrimaryButton,
    SearchBar,
    IconWeather,
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
      localtime: (state) => state.localtime,
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
      return this.localtime.split(" ")[0];
    },
    currentTime() {
      return this.localtime.split(" ")[1];
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
  padding: 1.6rem;
  height: 100vh;
  background-color: colors.$primary-color;

  @media (max-width: 1050px) {
    height: auto;
  }

  &__search-bar {
    padding: 0 2.4rem;
    display: none;
  }

  &__image {
    width: 70%;
    height: auto;
    align-self: center;

    @media (max-width: 1050px) {
      width: clamp(10rem, 50%, 20rem);
      margin-top: 1.8rem;
    }
  }

  &__current-temp {
    font-size: 2.8rem;
    color: colors.$text-color;
    @media (max-width: 650px) {
      font-size: 2.8rem;
    }
  }

  &__feels-like {
    font-size: 1.1rem;
    color: colors.$text-color-secondary;
  }

  &__condition {
    color: colors.$text-color;
    font-size: 1.4rem;
    @media (max-width: 400px) {
      font-size: 1rem;
    }
  }

  .weather {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 0.8rem;

    @media (max-width: 1050px) {
      margin-top: 1.8rem;
    }

    &__section {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 1.2rem;
    background-color: colors.$secondary-color;
    border: 1px solid colors.$transparent-color-neutral;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
    padding: 0.4rem 0.8rem;
    border-radius: 7px;
  }
}
.country {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: colors.$secondary-color;
  border: 1px solid colors.$transparent-color-neutral;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.8rem;
  border-radius: 7px;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
}

.region__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .heading--secondary {
    color: colors.$text-color;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: 1px;
    @media (max-width: 500px) {
      font-size: 1.4rem;
    }
  }
}

.time {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.date__wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  .temperature__date {
    font-size: 1.2rem;
    letter-spacing: 0.5px;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
}

.hr--secondary {
  border-color: colors.$text-color-secondary;
}

.heading--secondary {
  font-size: 1.6rem;
  font-weight: 500;
}

.icon {
  width: 1.8rem;
  height: 1.8rem;
}
</style>
