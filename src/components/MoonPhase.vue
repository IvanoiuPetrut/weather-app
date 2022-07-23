<template>
  <div class="card">
    <p class="img">{{ moonPhaseIcon }}</p>
    <p class="moon-phase margin-bottom--md">{{ moonPhase }}</p>
    <div class="astro">
      <div class="astro__sun margin-bottom--sm">
        <p class="astro__sunrise">Sunrise: {{ sunRise }}</p>
        <p class="astro__sunset">Sunset: {{ sunSet }}</p>
      </div>
      <div class="astro__moon">
        <p class="astro__moonrise">Moonrise: {{ moonRise }}</p>
        <p class="astro__moonset">Moonset: {{ moonSet }}</p>
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
  padding: 1.6rem 2rem;
  border-radius: 11px;
}
.img {
  font-size: 3.2rem;
}

.astro {
  font-size: 0.8rem;
}
</style>
