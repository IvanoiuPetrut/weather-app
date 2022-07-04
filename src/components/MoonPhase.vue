<template>
  <div class="card">
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
      date: (state) => state.date,
      astronomy: (state) => state.astronomy,
    }),
    currentDate() {
      return this.formatDate(this.date);
    },
    moonPhase() {
      return this.astronomy.moon_phase;
    },
    sunRise() {
      return this.astronomy.sunrise;
    },
    sunSet() {
      return this.astronomy.sunset;
    },
    moonRise() {
      return this.astronomy.moonrise;
    },
    moonSet() {
      return this.astronomy.moonset;
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

.astro {
  font-size: 0.8rem;
  align-self: flex-start;
}
</style>
