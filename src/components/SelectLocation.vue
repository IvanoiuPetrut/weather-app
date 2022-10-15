<template>
  <div class="select-location">
    <div class="header">
      <h2 class="header__title">Get the weather</h2>
      <IconWeather name="logo" class="header__logo"></IconWeather>
    </div>
    <SearchBar></SearchBar>
    <div class="get-your-location">
      <button class="get-your-location__btn">
        <IconWeather name="current-location" class="icon"></IconWeather>
        Use my location
      </button>
    </div>
  </div>
</template>

<script>
import IconWeather from "./IconWeather.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "SelectLocation",
  components: {
    IconWeather,
    SearchBar,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/colors.scss";

.select-location {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 3.2rem;
  max-width: 600px;
  background-color: colors.$primary-color;
  border-radius: 13px;
  border: 1px solid colors.$transparent-color-neutral;
  .header {
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-bottom: 2.4rem;

    &__title {
      font-size: 2rem;
    }

    &__logo {
      width: 3.2rem;
      height: 3.2rem;
    }
  }

  .get-your-location__btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 13px;
    color: colors.$text-color;
    background-color: colors.$secondary-color;
    border: 1px solid colors.$transparent-color-neutral;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: colors.$transparent-primary-color;
      border-color: colors.$accent-color;
    }

    .icon {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
</style>
