<template>
  <div class="card">
    <h3 class="heading--tertiary">Moon Phase</h3>
    <div class="grid">
      <div class="grid__col-1">
        <p class="img margin-bottom--sm">{{ moonPhaseIcon }}</p>
        <p class="moon-phase">{{ moonPhase }}</p>
      </div>
      <div class="astro">
        <div class="astro__sun margin-bottom--sm">
          <div>
            <IconWeather
              name="sun-rise"
              class="icon icon--only-fill"
            ></IconWeather>
            <p class="astro__sunrise">Sunrise: {{ sunRise }}</p>
          </div>
          <div>
            <IconWeather
              name="sun-set"
              class="icon icon--only-fill"
            ></IconWeather>
            <p class="astro__sunset">Sunset: {{ sunSet }}</p>
          </div>
        </div>
        <div class="astro__moon">
          <p class="astro__moonrise">Moonrise: {{ moonRise }}</p>
          <p class="astro__moonset">Moonset: {{ moonSet }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IconWeather from "./IconWeather.vue";

export default {
  name: "MoonPhase",
  components: {
    IconWeather,
  },
  data() {
    return {
      moonPhaseTable: [
        {
          phase: "New Moon",
          icon: "🌑",
        },
        {
          phase: "Waxing Crescent",
          icon: "🌒",
        },
        {
          phase: "First Quarter",
          icon: "🌓",
        },
        {
          phase: "Waxing Gibbous",
          icon: "🌔",
        },
        {
          phase: "Full Moon",
          icon: "🌕",
        },
        {
          phase: "Waning Gibbous",
          icon: "🌖",
        },
        {
          phase: "Last Quarter",
          icon: "🌗",
        },
        {
          phase: "Waning Crescent",
          icon: "🌘",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      dayIndex: (state) => state.dayIndex,
    }),
    moonPhase() {
      return this.forecast[this.dayIndex].astro.moon_phase;
    },
    moonPhaseIcon() {
      return this.moonPhaseTable.find((moonPhase) => {
        return moonPhase.phase === this.moonPhase;
      }).icon;
    },
    sunRise() {
      return this.forecast[this.dayIndex].astro.sunrise;
    },
    sunSet() {
      return this.forecast[this.dayIndex].astro.sunset;
    },
    moonRise() {
      return this.forecast[this.dayIndex].astro.moonrise;
    },
    moonSet() {
      return this.forecast[this.dayIndex].astro.moonset;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: colors.$primary-color;
  width: 100%;
  border: 1px solid colors.$transparent-color-neutral;
  padding: 0.8rem 1.6rem;
  margin-top: 2.4rem;
  border-radius: 11px;
  position: relative;

  .img {
    font-size: 4rem;
    text-align: center;
  }
  .moon-phase {
    font-size: 1.2rem;
    position: relative;
    text-align: center;
    &::before {
      content: "";
      width: 100%;
      height: 2px;
      background-color: colors.$transparent-color-neutral;
      position: absolute;
      bottom: -2px;
      @media (max-width: 1200px) {
        width: 0%;
      }
    }
  }
}

.heading--tertiary {
  background-color: colors.$secondary-color;
  border: 1px solid colors.$transparent-color-neutral;
  padding: 0.2rem 1rem;
  border-radius: 100px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3);

  position: absolute;
  top: 0;
  transform: translate(0, -50%);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 3.2rem;
  width: 100%;
  place-items: center;
  @media (max-width: 1250px) {
    grid-gap: 1.6rem;
  }
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
}

.astro {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.2rem;
  font-size: 0.8rem;
  text-align: center;
  .icon {
    width: 3.2rem;
    height: 3.2rem;
  }
  &__moon,
  &__sun {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3.2rem;
    border-bottom: 1px solid colors.$transparent-color-neutral;
    @media (max-width: 950px) {
      grid-gap: 1.6rem;
    }
  }
}
</style>
