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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-sunrise"
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
              <path
                d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0"
              />
              <line x1="3" y1="21" x2="21" y2="21" />
              <path d="M12 9v-6l3 3m-6 0l3 -3" />
            </svg>
            <p class="astro__sunrise">Sunrise: {{ sunRise }}</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-sunset"
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
              <path
                d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0"
              />
              <line x1="3" y1="21" x2="21" y2="21" />
              <path d="M12 3v6l3 -3m-6 0l3 3" />
            </svg>
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
export default {
  name: "MoonPhase",
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
    &::before {
      content: "";
      width: 100%;
      height: 2px;
      background-color: colors.$transparent-color-neutral;
      position: absolute;
      bottom: -2px;
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
  }
}
</style>
