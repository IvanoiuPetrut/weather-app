<template>
  <img :src="weatherImage" :alt="weatherCondition" />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WeatherImg",
  props: {
    hourIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      forecast: (state) => state.forecast,
      dayIndex: (state) => state.dayIndex,
    }),
    weatherImage() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.icon;
    },
    weatherCondition() {
      return this.forecast[this.dayIndex].hour[this.hourIndex].condition.text;
    },
  },
};
</script>
