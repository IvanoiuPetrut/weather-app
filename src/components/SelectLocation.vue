<template>
  <div class="select-location">
    <div>
      <h2>Weather</h2>
      <IconWeather name="logo"></IconWeather>
    </div>
    <div class="form">
      <label for="serach-ciy" class="form__label">Chose a city</label>
      <div class="form__section">
        <input type="text" id="serach-ciy" class="form__input" />
        <button class="form__btn">Get Weather</button>
      </div>
    </div>
    <div class="get-your-location">
      <h3 class="get-your-location__title">Let us get your location</h3>
      <button class="get-your-location__btn">Location</button>
    </div>
  </div>
</template>

<script>
import IconWeather from "./IconWeather.vue";

export default {
  name: "SelectLocation",
  components: {
    IconWeather,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.select-location {
  background-color: colors.$primary-color;
}
</style>
