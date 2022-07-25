<template>
  <div class="card">
    <div class="settings">
      <div>
        <span>Temperature</span>
        <ToggleButton
          class="btn"
          :onClick="toggleTemperatureType"
          :isOptionOneActive="isCelsius"
          firstOption="°C"
          secondOption="°F"
        ></ToggleButton>
      </div>
      <div>
        <span>Speed</span>
        <ToggleButton
          class="btn"
          :onClick="toggleSpeedType"
          :isOptionOneActive="isKmH"
          firstOption="Km/h"
          secondOption="Mp/h"
        ></ToggleButton>
      </div>
      <div>
        <span>Supraface</span>
        <ToggleButton
          class="btn"
          :onClick="toggleSuprafaceType"
          :isOptionOneActive="isMm"
          firstOption="mm"
          secondOption="inch"
        ></ToggleButton>
      </div>
      <div>
        <span>Pressure</span>
        <ToggleButton
          class="btn"
          :onClick="togglePressureType"
          :isOptionOneActive="isMb"
          firstOption="millibar"
          secondOption="inch"
        ></ToggleButton>
      </div>
      <div>
        <span>Distance</span>
        <ToggleButton
          class="btn"
          :onClick="toggleDistanceType"
          :isOptionOneActive="isKm"
          firstOption="Km"
          secondOption="Miles"
        ></ToggleButton>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "./ToggleButton.vue";
import { mapState } from "vuex";

export default {
  name: "SettingsWeather",
  components: {
    ToggleButton,
  },
  methods: {
    toggleTemperatureType() {
      this.$store.dispatch("settings/toggleTemperatureType");
    },
    toggleSpeedType() {
      this.$store.dispatch("settings/toggleSpeedType");
    },
    toggleSuprafaceType() {
      this.$store.dispatch("settings/toggleSuprafaceType");
    },
    togglePressureType() {
      this.$store.dispatch("settings/togglePressureType");
    },
    toggleDistanceType() {
      this.$store.dispatch("settings/toggleDistanceType");
    },
  },
  computed: {
    ...mapState({
      isCelsius: (state) => state.settings.isCelsius,
      isKmH: (state) => state.settings.isKmH,
      isMm: (state) => state.settings.isMm,
      isMb: (state) => state.settings.isMb,
      isKm: (state) => state.settings.isKm,
      isMiles: (state) => state.settings.isMiles,
    }),
  },
};
</script>

<style lang="scss" scoped>
.card {
  color: #fff;
  padding: 0.6rem;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 15.6rem;
  padding: 0.6rem;
  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.btn {
  display: inline-block;
}
</style>
