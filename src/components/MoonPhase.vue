<template>
  <div class="card">
    <p class="img">{{ moonPhaseIcon }}</p>
    <p class="date margin-bottom--sm">{{ currentDate }}</p>
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
  methods: {
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
      forecast: (state) => state.forecast,
      dayIndex: (state) => state.dayIndex,
    }),
    currentDate() {
      return this.formatDate(this.forecast[this.dayIndex].date);
    },
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
  color: #f1f3f5;
  width: 12rem;
  @include flex-column();
  @include card();
  @include glass-morph();
}

.date {
  font-size: 1.2rem;
  font-weight: bold;
}

.img {
  font-size: 3.2rem;
}

.astro {
  font-size: 0.8rem;
  align-self: flex-start;
}
</style>
