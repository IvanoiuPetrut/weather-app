<template>
  <div class="select-location">
    <div class="header">
      <h2 class="header__title">Get the weather</h2>
      <IconWeather name="logo" class="header__logo"></IconWeather>
    </div>
    <div class="get-your-location">
      <SearchBar class="select-location__class"></SearchBar>
      <button class="get-your-location__btn" @click="getLocation">
        <IconWeather name="current-location" class="icon"></IconWeather>
        <span class="btn__text"> Use my location </span>
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
  methods: {
    success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = latitude + "," + longitude;
      this.$store.commit("setCity", location);
      this.$store.dispatch("fetchWeather");
    },
    error(error) {
      console.log(error);
    },
    getLocation() {
      console.log("get location");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => this.success(position),
          (error) => this.error(error)
        );
      }
    },
    logger() {
      console.log("get location");
    },
    test() {
      this.logger();
    },
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
  margin: 0 auto;
  padding: 2rem 3.2rem;
  max-width: 600px;
  background-color: colors.$primary-color;
  border-radius: 13px;
  border: 1px solid colors.$transparent-color-neutral;

  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 3.2rem;
    margin-bottom: 2.4rem;

    &__title {
      font-size: 2rem;
      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }

    &__logo {
      width: 3.2rem;
      height: 3.2rem;
      @media (max-width: 768px) {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
  .get-your-location {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    @media (max-width: 768px) {
      flex-direction: row;
      gap: 1.6rem;
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

    @media (max-width: 768px) {
      padding: 0.4rem 0.8rem;
      .btn__text {
        display: none;
      }
    }

    &:hover {
      background-color: colors.$transparent-primary-color;
      border-color: colors.$accent-color;
    }

    .icon {
      width: 1.6rem;
      height: 1.6rem;

      @media (max-width: 768px) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
}
</style>
