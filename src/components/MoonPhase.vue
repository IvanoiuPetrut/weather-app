<template>
  <p class="date">{{ currentDate }}</p>
  <p class="moon-phase">{{ moonPhase }}</p>
  <div class="astro">
    <div class="astro__sun">
      <p class="astro__sunrise">{{ sunRise }}</p>
      <p class="astro__sunset">{{ sunSet }}</p>
    </div>
    <div class="astro__moon">
      <p class="astro__moonrise">{{ moonRise }}</p>
      <p class="astro__moonset">{{ moonSet }}</p>
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
* {
  color: #fff;
}
</style>
