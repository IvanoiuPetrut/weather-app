<template>
  <div class="card">
    <p>Settings</p>
    <div class="settings">
      <div>
        <span>Temperature</span>
        <ToggleButton
          class="btn"
          :onClick="toggleTemperatureType"
          :isOptionOneActive="this.$store.state.isCelsius"
          firstOption="°C"
          secondOption="°F"
        ></ToggleButton>
      </div>
      <div>
        <span>Speed</span>
        <ToggleButton
          class="btn"
          :onClick="toggleSpeedType"
          :isOptionOneActive="this.$store.state.isKmH"
          firstOption="Km/h"
          secondOption="Mp/h"
        ></ToggleButton>
      </div>
      <div>
        <span>Supraface</span>
        <ToggleButton
          class="btn"
          :onClick="toggleSuprafaceType"
          :isOptionOneActive="this.$store.state.isMm"
          firstOption="mm"
          secondOption="inch"
        ></ToggleButton>
      </div>
      <div>
        <span>Pressure</span>
        <ToggleButton
          class="btn"
          :onClick="togglePressureType"
          :isOptionOneActive="this.$store.state.isMb"
          firstOption="millibar"
          secondOption="inch"
        ></ToggleButton>
      </div>
      <div>
        <span>Distance</span>
        <ToggleButton
          class="btn"
          :onClick="toggleDistanceType"
          :isOptionOneActive="this.$store.state.isKm"
          firstOption="Km"
          secondOption="Miles"
        ></ToggleButton>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "./ToggleButton.vue";

export default {
  name: "SettingsWeather",
  components: {
    ToggleButton,
  },
  methods: {
    toggleTemperatureType() {
      this.$store.commit("toggleTemperatureType");
    },
    toggleSpeedType() {
      this.$store.commit("toggleSpeedType");
    },
    toggleSuprafaceType() {
      this.$store.commit("toggleSuprafaceType");
    },
    togglePressureType() {
      this.$store.commit("togglePressureType");
    },
    toggleDistanceType() {
      this.$store.commit("toggleDistanceType");
    },
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
